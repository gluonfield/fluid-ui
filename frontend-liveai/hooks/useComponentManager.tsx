import * as React from "react";
import { DynamicComponent } from "../components/DynamicWorkspace";
import { PomodoroTimer } from "../components/PomodoroTimer";

const DEFAULT_COMPONENTS: DynamicComponent[] = [
  {
    id: "pomodoro-timer",
    content: <PomodoroTimer />,
    x: 0,
    y: 0,
    w: 6,
    h: 6,
  },
];

export function useComponentManager() {
  const [components, setComponents] = React.useState<DynamicComponent[]>(DEFAULT_COMPONENTS);

  const addComponent = React.useCallback(
    (content: React.ReactNode) => {
      const newComponent: DynamicComponent = {
        id: `component-${Date.now()}`,
        content,
        x: (components.length * 4) % 12, // Stagger the x position
        y: Math.floor(components.length / 3) * 4, // Stagger the y position
        w: 4,
        h: 4,
      };

      setComponents((prev) => [...prev, newComponent]);
    },
    [components]
  );

  const removeComponent = React.useCallback((id: string) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
  }, []);

  return {
    components,
    addComponent,
    removeComponent,
  };
}
