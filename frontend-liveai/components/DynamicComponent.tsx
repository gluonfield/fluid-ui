import { cn } from "@/lib/utils";
import * as Babel from "@babel/standalone";
import React from "react";

interface DynamicComponentProps {
  componentString: string;
  props?: Record<string, unknown>;
  className?: string;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({
  componentString,
  props = {},
  className,
}) => {
  try {
    // Log the incoming data
    console.log("=== DynamicComponent Debug ===");
    console.log("Component String:", componentString);
    console.log("Props:", props);

    // First transform the JSX string to React.createElement calls
    const transformedCode = Babel.transform(
      `
      /** @jsx React.createElement */
      function createComponent(props) {
        return ${componentString};
      }
      `,
      {
        presets: ["react"],
        filename: "dynamic.jsx",
      }
    ).code;

    console.log("Transformed code:", transformedCode);

    if (!transformedCode) {
      throw new Error("Failed to transform JSX");
    }

    // Create and execute the component function
    const createComponent = new Function(
      "React",
      "props",
      `
      ${transformedCode}
      return createComponent(props);
      `
    );

    console.log("About to execute component function");
    const element = createComponent(React, props);
    console.log("Created element:", element);

    return <div className={cn("w-full h-full", className)}>{element}</div>;
  } catch (error) {
    // Log the error in detail
    console.error("=== DynamicComponent Error ===");
    console.error("Error details:", error);
    console.error("Component string that failed:", componentString);
    console.error("Props that failed:", props);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return (
      <div className="flex items-center justify-center p-4 rounded-lg border border-destructive bg-destructive/10 text-destructive">
        Failed to render component: {errorMessage}
      </div>
    );
  }
};

export default DynamicComponent;
