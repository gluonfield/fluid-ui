import requests

def add_ui_component(component_data: dict):
    url = "http://localhost:8000/ui/components"
    response = requests.post(url, json=component_data)
    print("Adding Component to Dictionary")
    if response.status_code == 200:
        print("Component added successfully.")
    else:
        print(f"Failed to add component: {response.status_code} - {response.text}")
