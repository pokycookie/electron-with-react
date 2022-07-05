import { useEffect, useState } from "react";
import { useMouse } from "../../hooks";
import { coord, noteObj } from "../../type";

interface Props {
  offset: boolean | coord;
  gridSize: number;
  data: noteObj[] | undefined;
  setData: (noteObjs: noteObj[] | undefined) => void;
}

export function Prototype(props: Props) {
  const [startPos, setStartPos] = useState<coord>({
    x: 0,
    y: 0,
  });

  const mouse = useMouse();

  useEffect(() => {
    const position =
      typeof props.offset === "boolean"
        ? { x: 0, y: 0 }
        : {
            x: Math.floor(props.offset.x / props.gridSize) * props.gridSize,
            y: Math.floor(props.offset.y / props.gridSize) * props.gridSize,
          };
    if (mouse === true) {
      setStartPos(position);
    } else {
      const origin =
        typeof props.data === "undefined"
          ? new Array<noteObj>()
          : [...props.data];
      const result: noteObj = {
        x: Math.round(Math.min(startPos.x, position.x) / props.gridSize),
        y: Math.round(Math.min(startPos.y, position.y) / props.gridSize),
        width: Math.round(
          (Math.abs(position.x - startPos.x) + props.gridSize) / props.gridSize
        ),
        height: Math.round(
          (Math.abs(position.y - startPos.y) + props.gridSize) / props.gridSize
        ),
      };
      console.log(collapseCheck(result, origin));
      if (!collapseCheck(result, origin)) {
        origin.push(result);
        props.setData(origin);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouse]);

  return (
    <div>
      {typeof props.offset !== "boolean" && mouse === true ? (
        <div
          className="_noteObj"
          style={{
            zIndex: "3",
            backgroundColor: "#A27B5C",
            opacity: 0.5,
            width:
              Math.abs(
                Math.floor(props.offset.x / props.gridSize) * props.gridSize -
                  startPos.x
              ) + props.gridSize,
            height:
              Math.abs(
                Math.floor(props.offset.y / props.gridSize) * props.gridSize -
                  startPos.y
              ) + props.gridSize,
            left: Math.min(
              startPos.x,
              Math.floor(props.offset.x / props.gridSize) * props.gridSize
            ),
            top: Math.min(
              startPos.y,
              Math.floor(props.offset.y / props.gridSize) * props.gridSize
            ),
          }}
        ></div>
      ) : null}
    </div>
  );
}

/**
 * If collapse, it returns true
 */
function collapseCheck(target: noteObj, dataArr: noteObj[]): boolean {
  let result = false;
  const targetEndPos: coord = {
    x: target.x + target.width,
    y: target.y + target.height,
  };
  const targetPosArr: coord[] = [];
  for (let x = target.x; x < targetEndPos.x; x++) {
    for (let y = target.y; y < targetEndPos.y; y++) {
      targetPosArr.push({ x, y });
    }
  }

  dataArr.forEach((element) => {
    const dataEndPos: coord = {
      x: element.x + element.width,
      y: element.y + element.height,
    };
    targetPosArr.forEach((pos) => {
      if (
        pos.x >= element.x &&
        pos.x < dataEndPos.x &&
        pos.y >= element.y &&
        pos.y < dataEndPos.y
      ) {
        result = true;
      }
    });
  });

  return result;
}
