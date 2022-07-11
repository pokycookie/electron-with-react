export type AppMode = "main" | "note" | "notePage";
export type Coord = { x: number; y: number };
export type noteObjType = "none" | "input" | "textarea" | "time";

export interface noteObj<T = any> {
  x: number;
  y: number;
  width: number;
  height: number;
  data: T | null;
}
