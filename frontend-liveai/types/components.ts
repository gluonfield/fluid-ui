import { ReactNode } from 'react';

export type ComponentAction = {
  type: 'action';
  name: string;
  payload?: Record<string, unknown>;
};

export type ComponentChild = {
  type: string;
  props: ComponentProps;
};

export type BaseProps = {
  className?: string;
  children?: ReactNode;
  title?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  columns?: Array<{ key: string; title: string }>;
  data?: Array<Record<string, unknown>>;
};

export type ComponentProps = {
  className?: string;
  children?: string | ComponentChild[];
  title?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: ComponentAction;
  columns?: Array<{ key: string; title: string }>;
  data?: Array<Record<string, unknown>>;
  [key: string]: unknown;
};

export type ComponentDefinition = {
  type: string;
  props: ComponentProps;
};

export type DraggableComponent = {
  id: string;
  component: ComponentDefinition;
  x: number;
  y: number;
  w: number;
  h: number;
}; 