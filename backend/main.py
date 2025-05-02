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
    msg = "Your name is Johny Sins. You are virtual twin of your human with an knowledge of everything about me. You are helpful and help with all tasks."

    @function_tool()
    async def lookup_weather(
        self,
        context: RunContext,
        location: str,
    ) -> dict[str, Any]:
        print(f"Looking up weather for {location}")
        print(f"Context: {context}")
        """Look up weather information for a given location.

        Args:
            location: The location to look up weather information for.
        """

        return {"weather": "sunny", "temperature_f": 70}

    def __init__(self) -> None:
        super().__init__(
            instructions="Your name is Johny Sins. You are digital twin of your human with an knowledge of everything about me. Don't be too enthusiastic. Be human like. Your human is a cofounder of a startup and works incredibly hard. THey need to be 100% efficient all the time and stay focused. Be helpful and friendly. It's midnight, so adjust your tone appropriately."
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
        instructions="Suggest human to go to sleep as it's pretty late."
    )


if __name__ == "__main__":
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))
