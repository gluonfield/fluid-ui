import { type ComponentType } from 'react';

// Types for component metadata
export interface ComponentMeta {
  displayName: string;
  description?: string;
  category: string;
  defaultProps?: Record<string, unknown>;
  validation?: {
    required?: string[];
    props?: Record<string, {
      type: 'string' | 'number' | 'boolean' | 'object' | 'array';
      required?: boolean;
      description?: string;
    }>;
  };
}

// Registry entry type
export interface RegistryEntry<Props = any> {
  component: ComponentType<Props>;
  meta: ComponentMeta;
}

// The actual registry
const registry = new Map<string, RegistryEntry>();

// Helper functions
export function registerComponent<Props>(
  name: string,
  component: ComponentType<Props>,
  meta: ComponentMeta
): void {
  if (registry.has(name)) {
    console.warn(`Component "${name}" is already registered. It will be overwritten.`);
  }
  registry.set(name, { component, meta } as RegistryEntry);
}

export function getComponent(name: string): RegistryEntry | undefined {
  return registry.get(name);
}

export function getAllComponents(): Array<[string, RegistryEntry]> {
  return Array.from(registry.entries());
}

export function getComponentsByCategory(category: string): Array<[string, RegistryEntry]> {
  return Array.from(registry.entries()).filter(([, entry]) => entry.meta.category === category);
}

// Type guard
export function isRegisteredComponent(name: string): boolean {
  return registry.has(name);
}

export default registry; 