from typing import Dict
from utils.dummy_components import components

class UIMemory:
    def __init__(self):
        self.memory_store: Dict[str, Dict[str, Dict]] = {}
        self.ui_width = 500
        self.ui_height = 500
        for component in components:
            self.add_component(component["id"], component)

    def change_ui_size(self, ui_width, ui_height):
        if ui_width:
            self.ui_width = ui_width
        if ui_height:
            self.ui_height = ui_height

    def add_component(self, component_id, component):
        self.memory_store[component_id] = component

    def get_components(self):
        components = list(self.memory_store.values())
        print(components, type(components))
        if components:
            return components
        return []
    
    def get_component_by_id(self, component_id):
        if component_id in self.memory_store:
            return self.memory_store[component_id]
        return None
    
    def change_position(self, component_id, x, y, w, h):
        self.memory_store[component_id]['x'] = x
        self.memory_store[component_id]['y'] = y
        self.memory_store[component_id]['w'] = w
        self.memory_store[component_id]['h'] = h

    def change_height(self, component_id, height):
        self.memory_store[component_id]['h'] = height

    def change_width(self, component_id, width):
        self.memory_store[component_id]['w'] = width

ui_mem = UIMemory()



