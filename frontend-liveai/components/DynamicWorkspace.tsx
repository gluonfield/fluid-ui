import { ReactNode, useEffect, useRef, useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { CloseIcon } from "./CloseIcon";

export interface DynamicComponent {
  id: string;
  content: ReactNode;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface DynamicWorkspaceProps {
  components: DynamicComponent[];
  onLayoutChange?: (layout: Layout[]) => void;
  onRemoveComponent?: (id: string) => void;
}

export function DynamicWorkspace({
  components,
  onLayoutChange,
  onRemoveComponent,
}: DynamicWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const [layout, setLayout] = useState<Layout[]>(
    components.map((comp) => ({
      i: comp.id,
      x: comp.x,
      y: comp.y,
      w: comp.w,
      h: comp.h,
    }))
  );

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    onLayoutChange?.(newLayout);
  };

  return (
    <div ref={containerRef} className="h-full bg-gray-900 rounded-lg p-4">
      {containerWidth > 0 && (
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={containerWidth - 32} // Subtract padding
          onLayoutChange={handleLayoutChange}
          draggableHandle=".component-drag-handle"
          margin={[16, 16]}
        >
          {components.map((component) => (
            <div key={component.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="component-drag-handle bg-gray-700 p-2 cursor-move flex justify-between items-center">
                <div className="w-6 h-1 bg-gray-500 rounded" />
                {onRemoveComponent && (
                  <button
                    onClick={() => onRemoveComponent(component.id)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
              <div className="p-4">{component.content}</div>
            </div>
          ))}
        </GridLayout>
      )}
    </div>
  );
}
