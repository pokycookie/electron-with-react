import { useMouseReturn } from "./hooks";

export type AppMode = "main" | "note" | "notePage";
export type Coord = { x: number; y: number };
export type NoteObjType = "none" | "input" | "textarea" | "time" | "calendar" | "checkbox";

export interface INotePos {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface INoteObj<T = any> extends INotePos {
  data: T;
  type: NoteObjType;
}

export interface INoteObjProp {
  props: {
    className: string;
    width: number;
    height: number;
    left: number;
    top: number;
    element: INoteObj;
    index: number;
    data: INoteObj[];
    setData: (data: INoteObj[]) => void;
  };
}
export interface IMutableNoteObjProp {
  props: {
    className: string;
    noteObjClick: (index: number) => void;
    noteObjMouseDown: (e: React.MouseEvent, index: number) => void;
    style: {
      cursor: string;
      width: number;
      height: number;
      left: number;
      top: number;
    };
    index: number;
    data: INoteObj[];
    setData: (data: INoteObj[]) => void;
    mouse: boolean | useMouseReturn;
    offset: false | Coord;
    gridSize: number;
    resizeDraw: false | INotePos;
    setResizeDraw: (pos: false | INotePos) => void;
    selectedData: number | null;
  };
}

export interface IInput {
  content: string;
}
export interface ITextarea {
  content: string;
}
export interface ITime {
  hours: number;
  minutes: number;
  seconds: number;
}
