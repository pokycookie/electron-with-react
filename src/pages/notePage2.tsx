import React, { useEffect, useRef, useState } from "react";
import { useMouse, useOffset, useWindows } from "../hooks";
import { Coord, noteObj, NotePos } from "../type";
import { GridGuide } from "../Components/gridGuide";
import { collapseCheck, Prototype } from "../Components/prototype";
import { ResizeHandle } from "../Components/resizeHandle";
import NoteObj from "../Components/noteObj";

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

  const DOM = useRef<HTMLDivElement>(null);
  const offset = useOffset(DOM, { height: -80 });
  const noteSize = useWindows(DOM);
  const GRID_SIZE = 10 + (noteSize.x % 10) / (noteSize.x / 10);

  const mouse = useMouse({ target: true });

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
          <NoteObj
            key={index}
            selectedData={selectedData}
            index={index}
            data={data}
            setData={setData}
            gridSize={GRID_SIZE}
            mouse={mouse}
            offset={offset}
            setResizeDraw={setResizeDraw}
            resizeDraw={resizeDraw}
            setSelectedData={setSelectedData}
            element={element}
          />
        );
      })}
    </div>
  );
}
