import { useEffect, useRef, useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { CloseIcon } from "./CloseIcon";
import DynamicComponent from "./DynamicComponent";

export interface DynamicComponent {
  id: string;
  comp: string;
  data: string;
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
      minW: 2,
      maxW: 12,
      minH: 2,
    }))
  );

  useEffect(() => {
    // Update layout when components change
    const newLayout = components.map((comp) => ({
      i: comp.id,
      x: comp.x,
      y: comp.y,
      w: comp.w,
      h: comp.h,
      minW: 2,
      maxW: 12,
      minH: 2,
    }));
    setLayout(newLayout);
  }, [components]);

  const handleLayoutChange = (newLayout: Layout[]) => {
    // Only update if there's an actual change
    const hasChanges = newLayout.some((item, index) => {
      const oldItem = layout[index];
      return (
        !oldItem ||
        oldItem.x !== item.x ||
        oldItem.y !== item.y ||
        oldItem.w !== item.w ||
        oldItem.h !== item.h
      );
    });

    if (!hasChanges) return;

    setLayout(newLayout);
    onLayoutChange?.(newLayout);

    // Update server with new positions
    newLayout.forEach((item) => {
      const oldLayout = layout.find((l) => l.i === item.i);
      if (
        oldLayout &&
        (oldLayout.x !== item.x ||
          oldLayout.y !== item.y ||
          oldLayout.w !== item.w ||
          oldLayout.h !== item.h)
      ) {
        fetch(`/api/backend/ui/components/position/${item.i}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            x: Number(item.x),
            y: Number(item.y),
            w: Number(item.w),
            h: Number(item.h),
          }),
        }).catch((error) => {
          console.error("Failed to update component position:", error);
        });
      }
    });
  };

  return (
    <div ref={containerRef} className="h-full bg-transparent rounded-lg p-4">
      {containerWidth > 0 && (
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={containerWidth - 32}
          onLayoutChange={handleLayoutChange}
          draggableHandle=".component-drag-handle"
          margin={[16, 16]}
          compactType={null}
          preventCollision={false}
          isBounded
          useCSSTransforms={true}
          isResizable={true}
          isDraggable={true}
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
              <DynamicComponent
                componentString={component.comp}
                data={JSON.parse(component.data || "{}")}
              />
            </div>
          ))}
        </GridLayout>
      )}
    </div>
  );
}
