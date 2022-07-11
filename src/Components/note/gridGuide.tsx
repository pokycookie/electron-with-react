import { Coord } from "../../type";

interface Props {
  noteSize: Coord;
  gridSize: number;
}

export function GridGuide(props: Props) {
  const gridCount = [
    Math.ceil(props.noteSize.x / props.gridSize),
    Math.ceil(props.noteSize.y / props.gridSize),
  ];

  const gridX: number[] = [];
  const gridY: number[] = [];
  for (let i = 0; i < gridCount[0]; i++) {
    gridX.push(i);
  }
  for (let i = 0; i < gridCount[1]; i++) {
    gridY.push(i);
  }

  return (
    <div>
      {gridX.map((value) => {
        return (
          <div
            key={value}
            style={{
              position: "absolute",
              height: props.noteSize.y,
              width: "1px",
              left: value * props.gridSize,
              top: 0,
              borderRight: "1px dashed #3F4E4F",
              boxSizing: "border-box",
              pointerEvents: "none",
            }}
          ></div>
        );
      })}
      {gridY.map((value) => {
        return (
          <div
            key={value}
            style={{
              position: "absolute",
              height: "1px",
              width: props.noteSize.x,
              left: 0,
              top: value * props.gridSize,
              borderBottom: "1px dashed #3F4E4F",
              boxSizing: "border-box",
              pointerEvents: "none",
            }}
          ></div>
        );
      })}
    </div>
  );
}
