from typing import TypedDict

class ComponentResponse(TypedDict):
    code: str  
    input_schema: str

tools = [
    {
        "type": "function",
        "function": {
            "name": "create_component",
            "description": (
                "Return code for a react shadcn/ui and Tailwind component that can be directly embedded in the middle of existing application code. It must not contain any imports. It must just be a component and begin with <ComponentName> and end with </ComponentName>. Make sure the input_schema is as simple as possible, only include data fields that are required to render the component."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "code": {
                        "type": "string",
                        "description": (
                            "The complete source of the React component. It should not contain any imports and should be directly embeddable in the code"
                        ),
                    },
                    "input_schema": {
                        "type": "string",
                        "description": (
                            "Stringified props that this react component will use to render the UI."
                        ),
                    },
                },
                "required": ["code", "input"],
            },
        },
    },
]


data_tools = [
    {
        "type": "function",
        "function": {
            "name": "get_twitter_data",
            "description": (
                "Return the latest tweets."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "json": {
                        "type": "string",
                        "description": (
                            "The json data for the tweets."
                        ),
                    },
                },
                "required": ["json"],
            },
        },
    },
]

