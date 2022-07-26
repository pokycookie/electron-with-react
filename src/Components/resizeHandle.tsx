import React, { useEffect, useState } from "react";
import { useMouseReturn } from "../hooks";
import { Coord, INoteObj, INotePos } from "../type";
import { collapseCheck, getOptionByType, optionsCheck } from "./prototype";

interface Props {
  index: number;
  data: INoteObj[];
  setData: (data: INoteObj[]) => void;
  mouse: boolean | useMouseReturn;
  offset: Coord | false;
  gridSize: number;
  setResizeDraw: (pos: INotePos | false) => void;
  resizeDraw: INotePos | false;
}

export function ResizeHandle(props: Props) {
  const [click, setClick] = useState(false);
  const startPos: Coord = {
    x: props.data[props.index]?.x,
    y: props.data[props.index]?.y,
  };
  const options = getOptionByType(props.data[props.index].type);

  // Event handler for resizeHandle onMouseDown
  const mouseDownHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setClick(true);
  };

  // Check when user try to resize
  useEffect(() => {
    // When mouseUp(mouse.isDown === false) after mouseDown(click === true)
    if (typeof props.mouse !== "boolean" && props.mouse.isMouseDown === false && click === true) {
      setClick(false);
      // const origin = [...props.data];
      // origin.splice(props.index, 1);
      // if (props.offset !== false) {
      //   // Set current mouse position
      //   const position = {
      //     x: Math.floor(props.offset.x / props.gridSize),
      //     y: Math.floor(props.offset.y / props.gridSize),
      //   };
      //   // Set temp data with current mouse position and start position
      //   const width = Math.abs(position.x - startPos.x) + 1;
      //   const height = Math.abs(position.y - startPos.y) + 1;
      //   const tempData: INoteObj = {
      //     x: Math.min(startPos.x, position.x),
      //     y: Math.min(startPos.y, position.y),
      //     width,
      //     height,
      //     data: props.data[props.index].data,
      //     type: props.data[props.index].type,
      //   };
      //   // Collapse check before apply data
      //   if (!collapseCheck(tempData, origin) && optionsCheck(options, width, height)) {
      //     origin.splice(props.index, 0, tempData);
      //     props.setData(origin);
      //     // I know push is better then splice. Later... I'll change it...
      //   }
      //   props.setResizeDraw(false);
      // }
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
        const tempData: INotePos = {
          x: Math.min(startPos.x, position.x),
          y: Math.min(startPos.y, position.y),
          width: Math.abs(position.x - startPos.x) + 1,
          height: Math.abs(position.y - startPos.y) + 1,
        };
        // Set resizeDraw when position is different (prevent maximum update ...)
        if (!diffPos(props.resizeDraw, tempData)) props.setResizeDraw(tempData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mouse, props.offset]);

  return <div className="resizeHandle" onMouseDown={(e) => mouseDownHandler(e)}></div>;
}

function diffPos(pos1: INotePos | false, pos2: INotePos | false): boolean {
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
