import React, { useEffect, useRef, useState } from "react";
import { useMouse, useOffset, useWindows } from "../hooks";
import { Coord, noteObj, NotePos } from "../type";
import { GridGuide } from "../Components/note/gridGuide";
import { collapseCheck, Prototype } from "../Components/note/prototype";
import { ResizeHandle } from "../Components/resizeHandle";

interface Props {
  draw: boolean;
  setDraw: (drawable: boolean) => void;
}

export function NotePage2(props: Props) {
  // Array of noteObj data
  const [data, setData] = useState<noteObj[] | null>(null);
  // Data's index which is selected
  const [selectedData, setSelectedData] = useState<number | null>(null);
  // Position for resizing noteObj
  const [resizeDraw, setResizeDraw] = useState<NotePos | false>(false);
  // Check noteObj was clicked before
  const [clicked, setClicked] = useState(false);
  // Mouse position when first clicked
  const [movePos, setMovePos] = useState<Coord | null>(null);
  // Mouse position when mouseUp
  const [movePos2, setMovePos2] = useState<Coord | null>(null);

  const DOM = useRef<HTMLDivElement>(null);
  const offset = useOffset(DOM, { height: -80 });
  const noteSize = useWindows(DOM);
  const GRID_SIZE = 10 + (noteSize.x % 10) / (noteSize.x / 10);

  const mouse = useMouse({ target: true });

  // Select data
  const noteObjClick = (index: number) => {
    if (data === null) return;
    setSelectedData(index);
  };

  // Event handler for noteObj onMouseDown
  const noteObjMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setClicked(true);
    if (offset !== false && selectedData === index) {
      const position = {
        x: Math.floor(offset.x / GRID_SIZE),
        y: Math.floor(offset.y / GRID_SIZE),
      };
      setMovePos(position);
    }
  };

  useEffect(() => {
    // When drop the mouse (in moving...)
    if (typeof mouse !== "boolean" && mouse.isMouseDown === false && selectedData !== null) {
      setClicked(false);
      setMovePos(null);
      setMovePos2(null);
      console.log("drop it");
      if (data !== null && resizeDraw !== false) {
        const origin = [...data];
        origin.splice(selectedData, 1);
        const tempData: noteObj = {
          x: resizeDraw.x,
          y: resizeDraw.y,
          width: resizeDraw.width,
          height: resizeDraw.height,
          data: null,
        };
        if (!collapseCheck(tempData, origin)) {
          origin.splice(selectedData, 0, tempData);
          setData(origin);
        }
      }
    }

    // Set selectedData to null, when mouse clicks empty area
    if (
      typeof mouse !== "boolean" &&
      mouse.isMouseDown === true &&
      mouse.target?.className === "note"
    ) {
      setSelectedData(null);
      setMovePos(null);
      setMovePos2(null);
    }
  }, [mouse]);

  // Move noteObj
  useEffect(() => {
    if (
      typeof mouse !== "boolean" &&
      mouse.isMouseDown === true &&
      offset !== false &&
      selectedData !== null
    ) {
      const position = {
        x: Math.floor(offset.x / GRID_SIZE),
        y: Math.floor(offset.y / GRID_SIZE),
      };
      if (movePos2 !== null && !diffPos(movePos2, position)) setMovePos2(position);
      if (movePos2 === null) setMovePos2(position);
    }
  }, [mouse, offset]);

  // On Moving
  useEffect(() => {
    if (movePos !== null && movePos2 !== null && selectedData !== null && data !== null) {
      const x = movePos.x - data[selectedData].x;
      const y = movePos.y - data[selectedData].y;
      const position: NotePos = {
        x: movePos2.x - x,
        y: movePos2.y - y,
        width: data[selectedData].width,
        height: data[selectedData].height,
      };
      setResizeDraw(position);
    } else {
      setResizeDraw(false);
    }
  }, [movePos2]);

  return (
    <div className="note" ref={DOM} style={{ cursor: props.draw ? "crosshair" : "default" }}>
      <GridGuide noteSize={noteSize} gridSize={GRID_SIZE} />

      {props.draw ? (
        <Prototype
          offset={offset}
          gridSize={GRID_SIZE}
          data={data}
          setData={setData}
          setDraw={props.setDraw}
          type="none"
        />
      ) : null}

      {resizeDraw !== false ? (
        <div
          className="_noteObj resizeDraw"
          style={{
            backgroundColor: "red",
            width: resizeDraw.width * GRID_SIZE,
            height: resizeDraw.height * GRID_SIZE,
            left: resizeDraw.x * GRID_SIZE,
            top: resizeDraw.y * GRID_SIZE,
          }}
        ></div>
      ) : null}

      {data?.map((element, index) => {
        return (
          <div
            key={index}
            className="_noteObj"
            onClick={() => noteObjClick(index)}
            onMouseDown={(e) => noteObjMouseDown(e, index)}
            style={{
              cursor: selectedData === index ? "move" : "pointer",
              backgroundColor: "#3F4E4F",
              width: element.width * GRID_SIZE,
              height: element.height * GRID_SIZE,
              left: element.x * GRID_SIZE,
              top: element.y * GRID_SIZE,
            }}
          >
            {index}
            {selectedData === index ? (
              <ResizeHandle
                index={index}
                data={data}
                setData={setData}
                mouse={mouse}
                offset={offset}
                gridSize={GRID_SIZE}
                setResizeDraw={setResizeDraw}
                resizeDraw={resizeDraw}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function diffPos(pos1: Coord, pos2: Coord): boolean {
  if (pos1.x === pos2.x && pos1.y === pos2.y) {
    return true;
  } else {
    return false;
  }
}
