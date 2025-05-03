
from utils.ui_memory import ui_mem

class UICore:
    def __init__(self):
        pass

    def get_components(self, component_id=None):
        if component_id is None:
            components = ui_mem.get_components()
        else:
            components = [ui_mem.get_component_by_id(component_id)]
        return components

    def find_space_for_new_component(self, new_component):
        components = self.get_components()
        ui_width =  ui_mem.ui_width
        ui_height = ui_mem.ui_height

        # Sort components by their Y position first, then X (to check from top-left)
        components.sort(key=lambda comp: (comp["y"], comp["x"]))
        
        # Check all available positions in the UI
        for y in range(0, int(ui_height), int(new_component.h)):
            for x in range(0, int(ui_width), int(new_component.w)):
                # Check if the new component fits in the current position (no overlap)
                overlap = False
                for comp in components:
                    if not (x + new_component.w <= comp["x"] or x >= comp["x"] + comp["w"] or y + new_component.h <= comp["y"] or y >= comp["y"] + comp["h"]):
                        overlap = True
                        break  # If there's overlap, skip this space
                
                if not overlap:
                    return x, y
        return -1, -1
    
    def add_component(self, component):
        x, y = self.find_space_for_new_component(component)
        if x != -1 and y != -1:
            component.x = x
            component.y = y
            ui_mem.add_component(component_id=component.id, component=component)
            print(f"Placed new component at ({x}, {y}) with size ({component.w}, {component.h})")
            return True
        return False
    
    def update_component_position(self, component_id: str, pos):
        component = ui_mem.get_component_by_id(component_id)
        if not component:
            return False, component
        ui_mem.change_position(component_id, pos.x, pos.y, pos.w, pos.h)
        return True, component

    def update_ui_dimensions(self, width, height):
        ui_mem.change_ui_size(ui_width=width, ui_height=height)
        return True
    
    def get_ui_dimensions(self):
        return ui_mem.ui_width, ui_mem.ui_height