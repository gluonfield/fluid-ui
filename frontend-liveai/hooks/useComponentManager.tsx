import * as React from "react";
import { componentRegistry } from "../components/ComponentRegistry";
import { DynamicComponent } from "../components/DynamicWorkspace";
import { ApiComponent, PositionUpdate } from "../types/api";

export function useComponentManager() {
  const [components, setComponents] = React.useState<DynamicComponent[]>([]);

  // Fetch initial components
  React.useEffect(() => {
    const fetchComponents = async () => {
      try {
        const apiComponents = await fetch("/api/backend/ui/components");
        const data = await apiComponents.json();

        // Transform API components to DynamicComponents
        const dynamicComponents = data
          .map((component: ApiComponent) => {
            const Component = componentRegistry[component.comp];
            if (!Component) {
              console.error(`Unknown component type: ${component.comp}`);
              return null;
            }

            return {
              id: component.id,
              // @ts-expect-error - TODO: fix this
              content: <Component {...component.data} />,
              x: component.x,
              y: component.y,
              w: component.w,
              h: component.h,
            };
          })
          .filter(Boolean);

        setComponents(dynamicComponents);
      } catch (error) {
        console.error("Failed to fetch components:", error);
      }
    };

    fetchComponents();
  }, []);

  const addComponent = React.useCallback(
    (content: React.ReactNode) => {
      const newComponent: DynamicComponent = {
        id: `component-${Date.now()}`,
        content,
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
        body: JSON.stringify(position),
      });

      setComponents((prev) =>
        prev.map((comp) => (comp.id === id ? { ...comp, x: position.x, y: position.y } : comp))
      );
    } catch (error) {
      console.error("Failed to update component position:", error);
    }
  }, []);

  return {
    components,
    addComponent,
    removeComponent,
    updatePosition,
  };
}
