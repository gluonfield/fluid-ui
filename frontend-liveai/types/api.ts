export interface ApiComponent {
  id: string;
  content: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export type PositionUpdate = {
  x: number;
  y: number;
} & Record<string, unknown>; 