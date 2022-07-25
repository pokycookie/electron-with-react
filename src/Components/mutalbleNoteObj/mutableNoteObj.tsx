import { useEffect, useState } from "react";
import { useMouseReturn } from "../../hooks";
import { Coord, INoteObj, IMutableNoteObjProp, INotePos } from "../../type";
import MutableInputObj from "./mutableInputObj";
import MutableNoneObj from "./mutableNoneObj";
import MutableTextareaObj from "./mutableTextareaObj";
import { collapseCheck } from "../prototype";

interface Props {
  selectedData: number | null;
  index: number;
  data: INoteObj[];
  setData: (data: INoteObj[]) => void;
  gridSize: number;
  mouse: boolean | useMouseReturn;
  offset: Coord | false;
  setResizeDraw: (pos: INotePos | false) => void;
  resizeDraw: INotePos | false;
  setSelectedData: (data: number | null) => void;
  element: INoteObj;
}

export default function MutableNoteObj(props: Props) {
  // Mouse position when first clicked
  const [movePos, setMovePos] = useState<Coord | null>(null);
  // Mouse position when mouseUp
  const [movePos2, setMovePos2] = useState<Coord | null>(null);

  const cursor = props.selectedData === props.index ? "move" : "pointer";
  const width = props.element.width * props.gridSize;
  const height = props.element.height * props.gridSize;
  const left = props.element.x * props.gridSize;
  const top = props.element.y * props.gridSize;

  // Select data
  const noteObjClick = (index: number) => {
    if (props.data === null) return;
    props.setSelectedData(index);
  };

  // Event handler for noteObj onMouseDown
  const noteObjMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    if (props.offset !== false && props.selectedData === index) {
      const position = {
        x: Math.floor(props.offset.x / props.gridSize),
        y: Math.floor(props.offset.y / props.gridSize),
      };
      setMovePos(position);
    }
  };

  useEffect(() => {
    // When drop the mouse(in moving), apply moved data
    if (
      typeof props.mouse !== "boolean" &&
      props.mouse.isMouseDown === false &&
      props.selectedData === props.index
    ) {
      setMovePos(null);
      setMovePos2(null);
      if (props.data !== null && props.resizeDraw !== false) {
        const origin = [...props.data];
        origin.splice(props.selectedData, 1);
        const tempData: INoteObj = {
          x: props.resizeDraw.x,
          y: props.resizeDraw.y,
          width: props.resizeDraw.width,
          height: props.resizeDraw.height,
          data: props.element.data,
          type: props.element.type,
        };
        if (!collapseCheck(tempData, origin)) {
          origin.splice(props.selectedData, 0, tempData);
          props.setData(origin);
        }
      }
    }

    // Set selectedData to null, when mouse clicks empty area
    if (
      typeof props.mouse !== "boolean" &&
      props.mouse.isMouseDown === true &&
      props.mouse.target?.className === "note"
    ) {
      props.setSelectedData(null);
      setMovePos(null);
      setMovePos2(null);
    }
  }, [props.mouse]);

  // Move noteObj
  useEffect(() => {
    if (
      typeof props.mouse !== "boolean" &&
      props.mouse.isMouseDown === true &&
      props.offset !== false &&
      props.selectedData === props.index
    ) {
      const position = {
        x: Math.floor(props.offset.x / props.gridSize),
        y: Math.floor(props.offset.y / props.gridSize),
      };
      if (movePos2 !== null && !diffPos(movePos2, position)) setMovePos2(position);
      if (movePos2 === null) setMovePos2(position);
    }
  }, [props.mouse, props.offset]);

  // On Moving
  useEffect(() => {
    if (
      movePos !== null &&
      movePos2 !== null &&
      props.selectedData === props.index &&
      props.data !== null
    ) {
      const x = movePos.x - props.data[props.selectedData].x;
      const y = movePos.y - props.data[props.selectedData].y;
      const position: INotePos = {
        x: movePos2.x - x,
        y: movePos2.y - y,
        width: props.data[props.selectedData].width,
        height: props.data[props.selectedData].height,
      };
      props.setResizeDraw(position);
    } else {
      props.setResizeDraw(false);
    }
  }, [movePos2]);

  const mutalbeNoteObjProp: IMutableNoteObjProp = {
    props: {
      className: "_noteObj",
      noteObjClick: noteObjClick,
      noteObjMouseDown: noteObjMouseDown,
      style: { cursor, width, height, left, top },
      index: props.index,
      data: props.data,
      setData: props.setData,
      mouse: props.mouse,
      offset: props.offset,
      gridSize: props.gridSize,
      setResizeDraw: props.setResizeDraw,
      resizeDraw: props.resizeDraw,
      selectedData: props.selectedData,
    },
  };

  switch (props.element.type) {
    case "none":
      return <MutableNoneObj props={mutalbeNoteObjProp.props} />;
    case "input":
      return <MutableInputObj props={mutalbeNoteObjProp.props} />;
    case "textarea":
      return <MutableTextareaObj props={mutalbeNoteObjProp.props} />;
    default:
      return <MutableNoneObj props={mutalbeNoteObjProp.props} />;
  }
}

function diffPos(pos1: Coord, pos2: Coord): boolean {
  if (pos1.x === pos2.x && pos1.y === pos2.y) {
    return true;
  } else {
    return false;
  }
}
