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

interface Options {
  minWidth?: number;
  minHeight?: number;
  ratio?: number; // ratio = (width / height)
}

export function Prototype(props: Props) {
  const [startPos, setStartPos] = useState<Coord | false>(false);
  const mouse = useMouse();
  const options = getOptionByType(props.type);

  // Set current mouse position
  const position =
    props.offset === false
      ? false
      : {
          x: Math.floor(props.offset.x / props.gridSize) * props.gridSize,
          y: Math.floor(props.offset.y / props.gridSize) * props.gridSize,
        };
  // Current data
  const currentNoteObj: INoteObj =
    startPos !== false && position !== false
      ? {
          x: Math.round(Math.min(startPos.x, position.x) / props.gridSize),
          y: Math.round(Math.min(startPos.y, position.y) / props.gridSize),
          width: Math.round((Math.abs(position.x - startPos.x) + props.gridSize) / props.gridSize),
          height: Math.round((Math.abs(position.y - startPos.y) + props.gridSize) / props.gridSize),
          data: null,
          type: props.type,
        }
      : {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          data: null,
          type: props.type,
        };

  useEffect(() => {
    // onMouseDown (Set startPos to the current mouse position)
    if (mouse === true) setStartPos(position);
    // onMouseUp (Ready to apply data; Make result: INoteObj)
    if (mouse === false && position !== false && startPos !== false) {
      const origin = props.data === null ? new Array<INoteObj>() : [...props.data];

      const x = Math.round(Math.min(startPos.x, position.x) / props.gridSize);
      const y = Math.round(Math.min(startPos.y, position.y) / props.gridSize);
      const width = Math.round(
        (Math.abs(position.x - startPos.x) + props.gridSize) / props.gridSize
      );
      const height = Math.round(
        (Math.abs(position.y - startPos.y) + props.gridSize) / props.gridSize
      );
      const data = getDataByType(props.type);
      const type = props.type;

      const result: INoteObj = { x, y, width, height, data, type };
      // Apply data if there's no collapse
      if (!collapseCheck(result, origin) && optionsCheck(options, width, height)) {
        origin.push(result);
        props.setDrawType(null);
        props.setData(origin);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouse]);

  return (
    <div>
      {props.offset !== false && mouse === true && startPos !== false && position !== false ? (
        <div
          className="_prototype"
          style={{
            backgroundColor: collapseCheck(currentNoteObj, props.data) ? "red" : "#395b64",
            width: Math.abs(position.x - startPos.x) + props.gridSize,
            height: Math.abs(position.y - startPos.y) + props.gridSize,
            left: Math.min(startPos.x, position.x),
            top: Math.min(startPos.y, position.y),
          }}
        ></div>
      ) : null}
    </div>
  );
}

/** If collapse, returns true */
export function collapseCheck(target: INoteObj, dataArr: INoteObj[] | null): boolean {
  if (dataArr === null) return false;

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
        result = true; // Need break for speed
      }
    });
  });

  return result;
}

// All options are correct, then returns true
export function optionsCheck(options: Options | null, width: number, height: number): boolean {
  if (options === null) {
    return true;
  } else {
    if (options.minHeight !== undefined && options.minHeight > height) return false;
    if (options.minWidth !== undefined && options.minWidth > width) return false;
    if (options.ratio !== undefined && options.ratio !== width / height) return false;
  }
  return true;
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

export function getOptionByType(type: NoteObjType) {
  switch (type) {
    case "none":
      return null;
    case "input":
      const input: Options = {
        minWidth: 2,
        minHeight: 2,
      };
      return input;
    case "textarea":
      const textarea: Options = {
        minWidth: 3,
        minHeight: 3,
      };
      return textarea;
    case "time":
      const time: Options = {
        minWidth: 5,
        minHeight: 3,
      };
      return time;
    case "checkbox":
      const checkbox: Options = {
        minWidth: 2,
        minHeight: 2,
        ratio: 1,
      };
      return checkbox;
    default:
      return null;
  }
}
