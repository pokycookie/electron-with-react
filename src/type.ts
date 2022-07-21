export type AppMode = "main" | "note" | "notePage";
export type Coord = { x: number; y: number };
export type noteObjType = "none" | "input" | "textarea" | "time";

export interface NotePos {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface noteObj<T = any> extends NotePos {
  data: T | null;
}
