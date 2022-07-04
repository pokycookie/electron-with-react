export type AppMode = "main" | "note" | "notePage";
export type coord = { x: number; y: number };

export type noteObj<T> = {
  x: number;
  y: number;
  width: number;
  height: number;
  data?: T;
};
