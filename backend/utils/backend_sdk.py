import requests

class BackendSDK:
    def __init__(self):
        self.base_url = "http://localhost:8000"

    def add_ui_component(self, component_data: dict):
        url = f"{self.base_url}/ui/components"
        response = requests.post(url, json=component_data)
        print("Adding Component to Dictionary")
        if response.status_code == 200:
            print("Component added successfully.")
            return True
        else:
            print(f"Failed to add component: {response.status_code} - {response.text}")
            return False
