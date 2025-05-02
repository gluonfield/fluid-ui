from typing import TypedDict

class ComponentResponse(TypedDict):
    code: str  
    input: str

tools = [
    {
        "type": "function",
        "function": {
            "name": "create_component",
            "description": (
                "Return code for a react component that can be directly embedded in the middle of existing application code. It must not contain any imports. It must just be a component and begin with <ComponentName> and end with </ComponentName>."
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
    }
]
