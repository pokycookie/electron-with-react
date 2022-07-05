import { useEffect, useRef, useState } from "react";
import { useOffset, useWindows } from "../../hooks";
import { coord, noteObj } from "../../type";
import { GridGuide } from "./gridGuide";
import { Prototype } from "./prototype";

export function NotePage() {
  const [data, setData] = useState<noteObj[]>();

  const DOM = useRef<HTMLInputElement>(null);
  const offset = useOffset(DOM);

  const noteSize = useWindows(DOM);
  const GRID_SIZE = 10 + (noteSize.x % 10) / (noteSize.x / 10);

  return (
    <div className="noteComponent notePage" ref={DOM}>
      <GridGuide noteSize={noteSize} gridSize={GRID_SIZE} />
      <Prototype
        offset={offset}
        gridSize={GRID_SIZE}
        data={data}
        setData={setData}
      />
      {typeof offset !== "boolean" ? (
        <div
          style={{
            backgroundColor: "#3F4E4F",
            width: GRID_SIZE,
            height: GRID_SIZE,
            position: "absolute",
            left: Math.floor(offset.x / GRID_SIZE) * GRID_SIZE,
            top: Math.floor(offset.y / GRID_SIZE) * GRID_SIZE,
            pointerEvents: "none",
          }}
        ></div>
      ) : null}
      {typeof data !== "undefined"
        ? data.map((element, index) => {
            return (
              <div
                key={index}
                className="_noteObj"
                style={{
                  backgroundColor: "#3F4E4F",
                  width: element.width * GRID_SIZE,
                  height: element.height * GRID_SIZE,
                  left: element.x * GRID_SIZE,
                  top: element.y * GRID_SIZE,
                }}
              ></div>
            );
          })
        : null}
    </div>
  );
}
