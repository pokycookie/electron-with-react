import React, { useEffect, useState } from "react";
import { useMouseReturn } from "../hooks";
import { Coord, noteObj, NotePos } from "../type";
import { collapseCheck } from "./note/prototype";

interface Props {
  index: number;
  data: noteObj[];
  setData: (data: noteObj[] | null) => void;
  mouse: boolean | useMouseReturn;
  offset: Coord | false;
  gridSize: number;
  setResizeDraw: (pos: NotePos | false) => void;
  resizeDraw: NotePos | false;
}

export function ResizeHandle(props: Props) {
  const [click, setClick] = useState(false);
  const startPos: Coord = {
    x: props.data[props.index]?.x,
    y: props.data[props.index]?.y,
  };
  // Save end position for restore data
  const endPos = {
    width: props.data[props.index]?.width,
    height: props.data[props.index]?.height,
  };

  // Event handler for resizeHandle onMouseDown
  const mouseDownHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setClick(true);
    // const temp = [...props.data];
    // temp.splice(props.index, 1);
    // props.setData(temp);
  };

  // Check when user try to resize
  useEffect(() => {
    if (typeof props.mouse !== "boolean") {
      // When mouseUp(mouse.isDown === false) after mouseDown(click === true)
      if (props.mouse.isMouseDown === false && click === true) {
        setClick(false);
        const origin = [...props.data];
        origin.splice(props.index, 1);
        if (props.offset !== false) {
          // Set current mouse position
          const position = {
            x: Math.floor(props.offset.x / props.gridSize),
            y: Math.floor(props.offset.y / props.gridSize),
          };
          // Set temp data with current mouse position and start position
          const tempData: noteObj = {
            x: Math.min(startPos.x, position.x),
            y: Math.min(startPos.y, position.y),
            width: Math.abs(position.x - startPos.x) + 1,
            height: Math.abs(position.y - startPos.y) + 1,
            data: null,
          };
          // Collapse check before apply data
          if (!collapseCheck(tempData, origin)) {
            origin.splice(props.index, 0, tempData);
            props.setData(origin);
            // I know push is better then splice. Later... I'll change it...
          }
          props.setResizeDraw(false);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mouse]);

  // Set resizeDraw position
  useEffect(() => {
    if (typeof props.mouse !== "boolean" && props.mouse.isMouseDown === true && click === true) {
      if (props.offset !== false) {
        const position = {
          x: Math.floor(props.offset.x / props.gridSize),
          y: Math.floor(props.offset.y / props.gridSize),
        };
        const tempData: NotePos = {
          x: Math.min(startPos.x, position.x),
          y: Math.min(startPos.y, position.y),
          width: Math.abs(position.x - startPos.x) + 1,
          height: Math.abs(position.y - startPos.y) + 1,
        };
        if (!diffPos(props.resizeDraw, tempData)) props.setResizeDraw(tempData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mouse, props.offset]);

  return <div className="resizeHandle" onMouseDown={(e) => mouseDownHandler(e)}></div>;
}

function diffPos(pos1: NotePos | false, pos2: NotePos | false): boolean {
  if (pos1 === false && pos2 === false) {
    return true;
  } else if (pos1 === false || pos2 === false) {
    return false;
  } else {
    if (
      pos1.x === pos2.x &&
      pos1.y === pos2.y &&
      pos1.width === pos2.width &&
      pos1.height === pos2.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}
