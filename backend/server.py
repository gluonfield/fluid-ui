from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from utils.ui_memory import ui_mem
from core.ui_core import UICore
from typing import Dict
import uvicorn


app = FastAPI()

class UIComponent(BaseModel):
    id: str
    comp: str 
    data: str
    x: float
    y: float
    w: float
    h: float

class PositionUpdate(BaseModel):
    x: float
    y: float
    w: float
    h: float

class UIDimensions(BaseModel):
    width: float
    height: float

@app.get("/ui/components/{component_id}")
async def get_ui(component_id: str):
    ui_core = UICore()
    result = ui_core.get_components(component_id=component_id)
    return result
    
@app.post("/ui/components")
async def get_ui(component: UIComponent = None):
    ui_core = UICore()
    result = ui_core.add_component(component=component)
    if result:
        return {"status": "success"}
    return {"status": "failure"}
    
@app.get("/ui/components")
async def get_all_ui():
    ui_core = UICore()
    components = ui_core.get_components()
    return components


@app.patch("/ui/components/position/{component_id}")
def update_position(component_id: str, pos: PositionUpdate):
    ui_core = UICore()
    result, component = ui_core.update_component_position(component_id, pos.x, pos.y, pos.w, pos.h)
    if result:
        return {"status": True, "message": "Position and dimensions updated", "component": component}
    return {"status": False, "message": "Update Failed"}

@app.post("/ui/dimensions")
def update_ui_dimensions(dim: UIDimensions):
    ui_core = UICore()
    result = ui_core.update_ui_dimensions(dim.width, dim.height)
    if result:
        return {"status": True}
    return {"status": False}

@app.get("/ui/dimensions")
def get_ui_dimensions():
    ui_core = UICore()
    width, height = ui_core.get_ui_dimensions()
    return {"width": width, "height": height}


if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)