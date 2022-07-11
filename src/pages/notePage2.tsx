import { useEffect, useRef, useState } from "react";
import { useMouse, useOffset, useWindows } from "../hooks";
import { Coord, noteObj } from "../type";
import { GridGuide } from "../Components/note/gridGuide";
import { Prototype } from "../Components/note/prototype";
import { ResizeHandle } from "../Components/resizeHandle";

interface Props {
  draw: boolean;
  setDraw: (drawable: boolean) => void;
}

export function NotePage2(props: Props) {
  const [data, setData] = useState<noteObj[] | null>(null);
  const [resizeHandle, setResizeHandle] = useState<number | null>(null);
  const [resizeDraw, setResiezDraw] = useState<Coord | false>(false);

  const DOM = useRef<HTMLDivElement>(null);
  const offset = useOffset(DOM, { height: -80 });

  const noteSize = useWindows(DOM);
  const GRID_SIZE = 10 + (noteSize.x % 10) / (noteSize.x / 10);

  const mouse = useMouse({ target: true });

  const noteObjClick = (index: number) => {
    if (data === null) return;
    setResizeHandle(index);
  };

  useEffect(() => {
    if (
      typeof mouse !== "boolean" &&
      mouse.isMouseDown === true &&
      mouse.target?.className === "note"
    ) {
      setResizeHandle(null);
    }
  }, [mouse]);

  return (
    <div
      className="note"
      ref={DOM}
      style={{ cursor: props.draw ? "crosshair" : "default" }}
    >
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

      {data?.map((element, index) => {
        return (
          <div
            key={index}
            className="_noteObj"
            onClick={() => noteObjClick(index)}
            style={{
              cursor: resizeHandle === index ? "move" : "pointer",
              backgroundColor: "#3F4E4F",
              width: element.width * GRID_SIZE,
              height: element.height * GRID_SIZE,
              left: element.x * GRID_SIZE,
              top: element.y * GRID_SIZE,
            }}
          >
            {resizeHandle === index ? (
              <ResizeHandle
                index={index}
                data={data}
                setData={setData}
                mouse={mouse}
                offset={offset}
                gridSize={GRID_SIZE}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
