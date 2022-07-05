export type AppMode = "main" | "note" | "notePage";
export type coord = { x: number; y: number };

export interface noteObj<T = any> {
  x: number;
  y: number;
  width: number;
  height: number;
  data?: T;
}
