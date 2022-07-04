import { useRef } from "react";
import { useOffset, useWindows } from "../../hooks";

export function NotePage() {
  const DOM = useRef<HTMLInputElement>(null);
  const offset = useOffset(DOM);

  const noteSize = useWindows(60, 60);
  const GRID_SIZE = 10 + (noteSize.x % 10) / (noteSize.x / 10);
  const gridCount = [
    Math.round(noteSize.x / GRID_SIZE),
    Math.round(noteSize.y / GRID_SIZE),
  ];

  const loopX: number[] = [];
  const loopY: number[] = [];
  for (let i = 0; i < gridCount[0]; i++) {
    loopX.push(i);
  }
  for (let i = 0; i < gridCount[1]; i++) {
    loopY.push(i);
  }

  return (
    <div className="noteComponent notePage" ref={DOM}>
      {loopX.map((value) => {
        return (
          <div
            style={{
              position: "absolute",
              height: noteSize.y,
              width: "1px",
              left: value * GRID_SIZE,
              top: 0,
              borderRight: "1px dashed red",
              boxSizing: "border-box",
              pointerEvents: "none",
            }}
          ></div>
        );
      })}
      {loopY.map((value) => {
        return (
          <div
            style={{
              position: "absolute",
              height: "1px",
              width: noteSize.x,
              left: 0,
              top: value * GRID_SIZE,
              borderBottom: "1px dashed red",
              boxSizing: "border-box",
              pointerEvents: "none",
            }}
          ></div>
        );
      })}
      {typeof offset !== "boolean" ? (
        <div
          style={{
            backgroundColor: "red",
            width: GRID_SIZE,
            height: GRID_SIZE,
            position: "absolute",
            left: Math.round(offset.x / GRID_SIZE) * GRID_SIZE,
            top: Math.round(offset.y / GRID_SIZE) * GRID_SIZE,
            pointerEvents: "none",
          }}
        ></div>
      ) : null}
    </div>
  );
}
