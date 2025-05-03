import { getComponent } from "@/lib/registry";
import { cn } from "@/lib/utils";
import * as Babel from "@babel/standalone";
import React from "react";

interface DynamicComponentProps {
  componentString: string;
  data?: Record<string, unknown>;
  props?: Record<string, unknown>;
  className?: string;
}

// List of HTML elements that should be rendered directly
const HTML_ELEMENTS = new Set([
  "div",
  "span",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "button",
  "input",
  "textarea",
  "select",
  "form",
  "img",
  "a",
  "ul",
  "ol",
  "li",
  "table",
  "tr",
  "td",
  "th",
  "thead",
  "tbody",
  "label",
  "header",
  "footer",
  "main",
  "section",
  "article",
  "nav",
  "aside",
  "pre",
  "code",
  "em",
  "strong",
  "hr",
  "br",
]);

// Extract Tailwind classes from a string
const extractTailwindClasses = (str: string): string[] => {
  const classRegex = /className=["'](.*?)["']/g;
  const classes: string[] = [];
  let match;

  while ((match = classRegex.exec(str)) !== null) {
    classes.push(...match[1].split(" "));
  }

  return Array.from(new Set(classes)); // Convert Set to Array
};

const validateComponentString = (componentString: string): boolean => {
  if (!componentString || typeof componentString !== "string") {
    return false;
  }

  // Basic JSX validation - should start with < and contain a closing tag
  const trimmed = componentString.trim();
  if (!trimmed.startsWith("<") || !trimmed.endsWith(">")) {
    return false;
  }

  try {
    // Try to parse as JSX
    Babel.transform(componentString, {
      presets: ["react"],
      filename: "validate.jsx",
    });
    return true;
  } catch (error) {
    console.error("Component string validation failed:", error);
    return false;
  }
};

const DynamicComponent: React.FC<DynamicComponentProps> = ({
  componentString,
  data = {},
  props = {},
  className,
}) => {
  try {
    // Log the incoming data
    console.log("=== DynamicComponent Debug ===");
    console.log("Component String:", componentString);
    console.log("Data:", data);
    console.log("Props:", props);

    // Parse data if it's a string
    const parsedData = typeof data === "string" ? JSON.parse(data) : data;

    // Extract Tailwind classes from the component string
    const tailwindClasses = extractTailwindClasses(componentString);
    console.log("Extracted Tailwind classes:", tailwindClasses);

    // Validate component string
    if (!validateComponentString(componentString)) {
      throw new Error("Invalid component string format");
    }

    // First transform the JSX string to React.createElement calls
    const transformedCode = Babel.transform(
      `
      /** @jsx React.createElement */
      function createComponent(React, getComponent, htmlElements, props, cn) {
        const data = ${JSON.stringify(parsedData)};
        // Make all data properties available in scope
        const dataProps = Object.entries(data).reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
        // Spread data properties into the current scope
        Object.assign(this, dataProps);
        
        // Create a non-recursive createElement wrapper
        const customCreateElement = (type, props, ...children) => {
          // Handle string type components
          if (typeof type === 'string') {
            // Check if it's a registered component
            const registeredComponent = getComponent(type);
            if (registeredComponent) {
              // Validate and merge props
              const validatedProps = validateProps(props, registeredComponent.meta);
              const finalProps = {
                ...registeredComponent.meta.defaultProps,
                ...validatedProps,
                // Ensure className is properly merged
                className: cn(
                  registeredComponent.meta.defaultProps?.className,
                  validatedProps.className
                ),
              };
              return React.createElement(registeredComponent.component, finalProps, ...children);
            }
            // Check if it's an HTML element
            if (htmlElements.has(type.toLowerCase())) {
              // Ensure className is properly handled for HTML elements
              return React.createElement(type, {
                ...props,
                className: cn(props.className),
              }, ...children);
            }
            // If neither, return a div as fallback
            console.warn(\`Unknown component type: \${type}, falling back to div\`);
            return React.createElement('div', {
              ...props,
              className: cn('dynamic-component-fallback', props.className),
            }, ...children);
          }
          // Handle non-string types (e.g., function components) directly
          return React.createElement(type, props, ...children);
        };

        try {
          // Parse the component string as JSX and return the element
          const jsxElement = ${componentString};
          return jsxElement;
        } catch (error) {
          console.error("Failed to evaluate component:", error);
          return React.createElement('div', {
            className: cn('error-component', 'p-4', 'text-red-500'),
          }, 'Failed to render component');
        }
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
      "getComponent",
      "htmlElements",
      "props",
      "cn",
      `
      ${transformedCode}
      return createComponent(React, getComponent, htmlElements, props, cn);
      `
    );

    console.log("About to execute component function");
    const element = createComponent(React, getComponent, HTML_ELEMENTS, props, cn);
    console.log("Created element:", element);

    if (!React.isValidElement(element)) {
      throw new Error("Component did not return a valid React element");
    }

    return (
      <div
        className={cn(
          "w-full h-full dynamic-component overflow-auto",
          ...tailwindClasses,
          className
        )}
      >
        {element}
      </div>
    );
  } catch (error) {
    // Log the error in detail
    console.error("=== DynamicComponent Error ===");
    console.error("Error details:", error);
    console.error("Component string that failed:", componentString);
    console.error("Props that failed:", props);

    return (
      <div className="flex items-center justify-center p-4 rounded-lg border border-destructive bg-destructive/10 text-destructive">
        Failed to render component: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }
};

export default DynamicComponent;
