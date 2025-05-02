from __future__ import annotations

import json
from typing import Any, TypedDict
from tools.news_tool import get_latest_news
from tools.tiktok_tool import get_tiktok_videos
import agents as oai_agents
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
from myagent.tools import tools, ComponentResponse, data_tools
import logging
import asyncio

logging.basicConfig(
    level=logging.INFO, 
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

# Suppress debug logs from noisy libraries
logging.getLogger("livekit").setLevel(logging.INFO)
logging.getLogger("asyncio").setLevel(logging.WARNING)
logging.getLogger("rustls").setLevel(logging.WARNING)
logging.getLogger("tungstenite").setLevel(logging.WARNING)

load_dotenv()
client = OpenAI() 


@oai_agents.function_tool
def get_twitter_data(instruction: str) -> str:
    data = [
        {
            "id": 1,
            "handle": "John Doe",
            "message": "New York"
        },
        {
            "id": 2,
            "handle": "John Doe",
            "message": "New York"
        },
    ]
    return json.dumps(data)

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
        Build a self-contained html React component in tailwind styles.

        Args:
            instruction: Human-readable request describing the UI component.
        Returns:
            dict with keys `code` and `input`.
        """
        return await execute(instruction, context)

    def __init__(self) -> None:
        super().__init__(
            instructions=(
                "You are a helpful AI assistant that can build React"
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

async def execute(instruction: str, context: RunContext):
    print("INSTRUCTION", instruction)
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
                    "For the user's request, call `create_component` exactly once. You must create a valid React component that can be embedded in the middle of existing application code. It should not contain \n characters, should be executable code. It must not contain any imports. It must just be a component and begin with <div> and end with </div>. Make sure the input_schema is as simple as possible, only include data fields that are required to render the component. You shouldssume all existing shadcn imports and tailwind available. For example twitter component should return a list of data such as handle, message and time. And instagram or tiktok component should return a list of data such as image, caption and username. Make sure to use elegant tailwind classes and make the component look good."
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
    print("COMPLETIONS DATA", data)
    
    agent_instruction = f"Retrieve the data using appropriate tools and return it in the following format: {data['input_schema']}. The input data is used for the following React component {data['code']}. This data is used in a widget component originating from the following instruction: {instruction}. You must not start with ``` or any other text. Return RAW json."
    
    # agent_instruction = f"Retrieve the data using appropriate tools and return it in the following format: {data['input_schema']}. This should be compatible with the following react component {data['code']}. Return the final react component with the data inplicitly in the code. The component should be placed anywhere in the code, any data you return must exist inside the component not to raise the errors. It should not contain imports, exports or anything beside inplace code."
    
    oai_agent = oai_agents.Agent(
        name="Data retriever and formatter agent",
        instructions=agent_instruction,
        tools=[get_tiktok_videos, get_latest_news],
    )

    oai_result = await oai_agents.Runner.run(
        oai_agent,
        input=agent_instruction
    )
    print("OPENAI DATA", oai_result.final_output)  
    logger.debug(f"data: {data}")
    return {"status": "success"}

if __name__ == "__main__":
    asyncio.run(execute("Generate a component to display news about cats", None))
    # agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))
