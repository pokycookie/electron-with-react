import React, { useEffect, useState } from "react";
import { useMouseReturn } from "../hooks";
import { Coord, noteObj } from "../type";

interface Props {
  index: number;
  data: noteObj[];
  setData: (data: noteObj[] | null) => void;
  mouse: boolean | useMouseReturn;
  offset: Coord | false;
  gridSize: number;
}

export function ResizeHandle(props: Props) {
  const [click, setClick] = useState(false);
  const startPos: Coord = {
    x: props.data[props.index]?.x,
    y: props.data[props.index]?.y,
  };

  const mouseDownHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setClick(true);
    const temp = props.data;
    // temp.splice(props.index, 1);
    console.log("GO");
  };

  useEffect(() => {
    if (typeof props.mouse !== "boolean") {
      if (props.mouse.isMouseDown === false && click === true) {
        setClick(false);
        if (props.offset !== false) {
          const origin = [...props.data];
          origin.splice(props.index, 1);
          const position = {
            x: Math.floor(props.offset.x / props.gridSize),
            y: Math.floor(props.offset.y / props.gridSize),
          };
          console.log(position, startPos);
          const tempData: noteObj = {
            x: Math.min(startPos.x, position.x),
            y: Math.min(startPos.y, position.y),
            width: Math.abs(position.x - startPos.x) + 1,
            height: Math.abs(position.y - startPos.y) + 1,
            data: null,
          };
          origin.push(tempData);
          props.setData(origin);
        }
      }
    }
  }, [props.mouse]);

  return (
    <div
      className="resizeHandle"
      onMouseDown={(e) => mouseDownHandler(e)}
    ></div>
  );
}
