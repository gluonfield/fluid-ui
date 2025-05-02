from __future__ import annotations

import json
from typing import Any, TypedDict

from dotenv import load_dotenv
from livekit import agents
from livekit.agents import (
    Agent,
    AgentSession,
    RoomInputOptions,
    RunContext,
    function_tool,
)
from livekit.plugins import openai, noise_cancellation
from openai import OpenAI
from agent.tools import tools, ComponentResponse
import logging

logging.basicConfig(
    level=logging.INFO,  # or logging.DEBUG for more verbosity
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

load_dotenv()
client = OpenAI() 



class Assistant(Agent):
    """
    Generates plug-and-play React components on demand.

    The heavy lifting is delegated to GPT-4o through function-calling:
    GPT-4o is *forced* to call the synthetic function `create_component`,
    returning its arguments (code & props) in structured JSON — no manual
    parsing of free-form text required.
    """

    @function_tool()
    async def generate_component(
        self,
        context: RunContext,
        instruction: str,
    ) -> Any:
        """
        Build a self-contained React component in shadcn style.

        Args:
            instruction: Human-readable request describing the UI component.
        Returns:
            dict with keys `code` and `input`.
        """
        logger.info(f"Generating component for: {instruction}")
        logger.debug(f"RunContext: {context}")

        logger.info("Generating component...")
        completion = client.chat.completions.create(
            model="gpt-4o",
            temperature=0.3,
            max_tokens=1_024,
            tool_choice={"type": "function", "function": {"name": "create_component"}},
            tools=tools,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a senior front-end engineer. "
                        "For the user's request, call `create_component` exactly once."
                    ),
                },
                {"role": "user", "content": instruction},
            ],
        )
        logger.info("Component generated")
        msg = completion.choices[0].message
        if not msg.tool_calls:
            raise RuntimeError("Model did not return a tool call!")

        args_json = msg.tool_calls[0].function.arguments
        data: ComponentResponse = json.loads(args_json)
        logger.debug(f"data: {data}")
        return {"status": "success"}

    def __init__(self) -> None:
        super().__init__(
            instructions=(
                "You are a helpful AI assistant that can build React "
                "components via the `generate_component` tool. You speak in consise and light-hearted manner. You're chill and friendly. When you finish a task, you say something like 'Done!'. Spice it up, but keep it short and concise."
            )
        )


async def entrypoint(ctx: agents.JobContext):
    await ctx.connect()

    session = AgentSession(
        llm=openai.realtime.RealtimeModel(
            voice="sage", model="gpt-4o-mini-realtime-preview-2024-12-17"
        )
    )

    await session.start(
        room=ctx.room,
        agent=Assistant(),
        room_input_options=RoomInputOptions(
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    await session.generate_reply(
        instructions=(
            "Hi there! I'm ready to help to build your homespace personalised to you."
            "What would you like to see?."
        )
    )


if __name__ == "__main__":
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))
