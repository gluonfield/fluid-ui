from dotenv import load_dotenv
from typing import Any

from livekit import agents
from livekit.agents import (
    AgentSession,
    Agent,
    RoomInputOptions,
    function_tool,
    RunContext,
)
from livekit.plugins import (
    openai,
    noise_cancellation,
)

load_dotenv()


class Assistant(Agent):
    msg = "You are helpful AI assistant. You are able to generate UI components for a given task by the use of a single tool."

    @function_tool()
    async def generate_component(
        self,
        context: RunContext,
        instruction: str,
    ) -> dict[str, Any]:
        print(f"Generating component for {instruction}")
        print(f"Context: {context}")
        """Generate a UI component for a given task.

        Args:
            instruction: What component should be generated and what it should do.
        """

        return {"status": "success"}

    def __init__(self) -> None:
        super().__init__(
            instructions="You are helpful AI assistant. You are able to generate UI components for a given task."
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
        instructions="You are helpful AI assistant. You are able to generate UI components for a given task. Respond with a playful and positive short message. Don't go into details of what has been done."
    )


if __name__ == "__main__":
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))
