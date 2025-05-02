import React, { useEffect, useState } from "react";
import DynamicComponent from "./DynamicComponent";

interface ComponentData {
  id: string;
  component: string;
  position?: {
    x: number;
    y: number;
  };
}

export const ComponentContainer: React.FC = () => {
  const [components, setComponents] = useState<ComponentData[]>([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch("/api/backend/ui/components");
        const data = await response.json();
        setComponents(data);
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };

    fetchComponents();
  }, []);

  const handlePositionChange = async (id: string, x: number, y: number) => {
    try {
      await fetch(`/api/backend/ui/components/position/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ x, y }),
      });
    } catch (error) {
      console.error("Error updating component position:", error);
    }
  };

  return (
    <div className="relative w-full h-full">
      {components.map((comp) => (
        <div
          key={comp.id}
          className="absolute"
          style={{
            left: comp.position?.x ?? 0,
            top: comp.position?.y ?? 0,
          }}
        >
          <DynamicComponent
            componentString={comp.component}
            props={{
              onPositionChange: (x: number, y: number) => handlePositionChange(comp.id, x, y),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ComponentContainer;
