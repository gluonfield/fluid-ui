from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from utils.component_memory import component_mem
from typing import Dict
import uvicorn


app = FastAPI()

class UIComponent(BaseModel):
    id: str
    comp: str 
    data: Dict[str, str]
    x: float
    y: float
    w: float
    h: float

class PositionUpdate(BaseModel):
    x: float
    y: float

@app.get("/ui/components/{component_id}")
async def get_ui(component_id: str):
    component = component_mem.get_component_by_id(component_id)
    if component:
        return component
    else:
        return {"message": "Component not found"}
    
@app.get("/ui/components")
async def get_all_ui():
    components = component_mem.get_components()
    return components


@app.patch("/ui/components/position/{component_id}")
def update_position(component_id: str, pos: PositionUpdate):
    component = component_mem.get_component_by_id(component_id)
    if not component:
        raise HTTPException(status_code=404, detail="Component not found")
    component_mem.change_position(component_id, pos.x, pos.y)
    return {"message": "Position updated", "component": component}


if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)