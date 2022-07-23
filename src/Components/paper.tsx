import { useRef, useState } from "react";
import { useMouse, useOffset, useWindows } from "../hooks";
import { INoteObj, INotePos, NoteObjType } from "../type";
import { GridGuide } from "./gridGuide";
import { Prototype } from "./prototype";
import NoteObj from "./noteObj";

interface Props {
  drawType: NoteObjType | null;
  setDrawType: (drawable: NoteObjType | null) => void;
}

export function Paper(props: Props) {
  // Array of noteObj data
  const [data, setData] = useState<INoteObj[] | null>(null);
  // Data's index which is selected
  const [selectedData, setSelectedData] = useState<number | null>(null);
  // Position for resizing noteObj
  const [resizeDraw, setResizeDraw] = useState<INotePos | false>(false);

  const DOM = useRef<HTMLDivElement>(null);
  const offset = useOffset(DOM, { height: -80 });
  const noteSize = useWindows(DOM);
  const GRID_SIZE = 10 + (noteSize.x % 10) / (noteSize.x / 10);

  const mouse = useMouse({ target: true });

  return (
    <div
      className="note"
      ref={DOM}
      style={{ cursor: props.drawType !== null ? "crosshair" : "default" }}
    >
      <GridGuide noteSize={noteSize} gridSize={GRID_SIZE} />

      {props.drawType !== null ? (
        <Prototype
          offset={offset}
          gridSize={GRID_SIZE}
          data={data}
          setData={setData}
          setDrawType={props.setDrawType}
          type={props.drawType}
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
