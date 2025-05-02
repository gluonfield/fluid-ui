export interface ApiComponent {
  id: string;
  comp: string;
  data: Record<string, string>;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PositionUpdate {
  x: number;
  y: number;
} 