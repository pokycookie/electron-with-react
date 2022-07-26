import { useEffect, useState } from "react";
import { useMouse } from "../hooks";
import { Coord, ICheckbox, IInput, INoteObj, ITextarea, ITime, NoteObjType } from "../type";

interface Props {
  offset: false | Coord;
  gridSize: number;
  data: INoteObj[] | null;
  setData: (noteObjs: INoteObj[] | null) => void;
  setDrawType: (drawable: NoteObjType | null) => void;
  type: NoteObjType;
}

export function Prototype(props: Props) {
  const [startPos, setStartPos] = useState<Coord | false>(false);

  const mouse = useMouse();

  useEffect(() => {
    // set mouse position
    const position =
      props.offset === false
        ? false
        : {
            x: Math.floor(props.offset.x / props.gridSize) * props.gridSize,
            y: Math.floor(props.offset.y / props.gridSize) * props.gridSize,
          };
    // mouseDown
    if (mouse === true) setStartPos(position);
    // mouseUp
    if (mouse === false && position !== false && startPos !== false) {
      const origin = props.data === null ? new Array<INoteObj>() : [...props.data];
      const result: INoteObj = {
        x: Math.round(Math.min(startPos.x, position.x) / props.gridSize),
        y: Math.round(Math.min(startPos.y, position.y) / props.gridSize),
        width: Math.round((Math.abs(position.x - startPos.x) + props.gridSize) / props.gridSize),
        height: Math.round((Math.abs(position.y - startPos.y) + props.gridSize) / props.gridSize),
        data: getDataByType(props.type),
        type: props.type,
      };
      // push data if there's no collapse
      if (!collapseCheck(result, origin)) {
        origin.push(result);
        props.setDrawType(null);
        props.setData(origin);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouse]);

  return (
    <div>
      {props.offset !== false && mouse === true && startPos !== false ? (
        <div
          className="_prototype"
          style={{
            width:
              Math.abs(Math.floor(props.offset.x / props.gridSize) * props.gridSize - startPos.x) +
              props.gridSize,
            height:
              Math.abs(Math.floor(props.offset.y / props.gridSize) * props.gridSize - startPos.y) +
              props.gridSize,
            left: Math.min(
              startPos.x,
              Math.floor(props.offset.x / props.gridSize) * props.gridSize
            ),
            top: Math.min(startPos.y, Math.floor(props.offset.y / props.gridSize) * props.gridSize),
          }}
        ></div>
      ) : null}
    </div>
  );
}

/** If collapse, returns true */
export function collapseCheck(target: INoteObj, dataArr: INoteObj[]): boolean {
  let result = false;
  const targetEndPos: Coord = {
    x: target.x + target.width,
    y: target.y + target.height,
  };
  const targetPosArr: Coord[] = [];
  for (let x = target.x; x < targetEndPos.x; x++) {
    for (let y = target.y; y < targetEndPos.y; y++) {
      targetPosArr.push({ x, y });
    }
  }

  dataArr.forEach((element) => {
    const dataEndPos: Coord = {
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

function getDataByType(type: NoteObjType) {
  switch (type) {
    case "none":
      return null;
    case "input":
      const input: IInput = {
        content: "",
      };
      return input;
    case "textarea":
      const textarea: ITextarea = {
        content: "",
      };
      return textarea;
    case "time":
      const time: ITime = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      return time;
    case "checkbox":
      const checkbox: ICheckbox = {
        checked: false,
      };
      return checkbox;
    default:
      return null;
  }
}
