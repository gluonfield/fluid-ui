import * as React from "react";
import DynamicComponent from "../components/DynamicComponent";

interface Component {
  id: string;
  comp: string;
  data: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface PositionUpdate {
  x: number;
  y: number;
}

export function useComponentManager() {
  const [components, setComponents] = React.useState<Component[]>([]);

  // Fetch initial components
  const fetchComponents = async () => {
    try {
      const response = await fetch("/api/backend/ui/components");
      const data = await response.json();
      setComponents(data);
    } catch (error) {
      console.error("Failed to fetch components:", error);
    }
  };

  // interval to fetch components
  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchComponents();
    }, 1000);
    fetchComponents();
    return () => clearInterval(interval);
  }, []);

  const addComponent = React.useCallback(
    (comp: string, data: string) => {
      const newComponent: Component = {
        id: `component-${components.length}`,
        comp,
        data,
        x: (components.length * 4) % 12,
        y: Math.floor(components.length / 3) * 4,
        w: 4,
        h: 4,
      };

      setComponents((prev) => [...prev, newComponent]);
    },
    [components]
  );

  const removeComponent = React.useCallback(async (id: string) => {
    try {
      await fetch(`/api/backend/ui/components/${id}`, { method: "DELETE" });
      setComponents((prev) => prev.filter((comp) => comp.id !== id));
    } catch (error) {
      console.error("Failed to remove component:", error);
    }
  }, []);

  const updatePosition = React.useCallback(async (id: string, position: PositionUpdate) => {
    try {
      await fetch(`/api/backend/ui/components/position/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(position),
      });

      setComponents((prev) =>
        prev.map((comp) => (comp.id === id ? { ...comp, x: position.x, y: position.y } : comp))
      );
    } catch (error) {
      console.error("Failed to update component position:", error);
    }
  }, []);

  const renderComponent = React.useCallback(
    (component: Component) => {
      return (
        <div
          key={component.id}
          style={{
            position: "absolute",
            left: `${component.x * 8.33}%`, // Convert grid units to percentage (12-column grid)
            top: `${component.y * 50}px`, // Assuming each grid unit is 50px height
            width: `${component.w * 8.33}%`,
            height: `${component.h * 50}px`,
          }}
        >
          <DynamicComponent
            componentString={component.comp}
            data={JSON.parse(component.data)}
            props={{
              onPositionChange: (x: number, y: number) => updatePosition(component.id, { x, y }),
            }}
          />
        </div>
      );
    },
    [updatePosition]
  );

  return {
    components,
    addComponent,
    removeComponent,
    updatePosition,
    renderComponent,
  };
}
