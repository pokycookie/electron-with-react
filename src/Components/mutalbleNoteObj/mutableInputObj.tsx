import { IInput, IMutableNoteObjProp } from "../../type";
import { ResizeHandle } from "../resizeHandle";

export default function MutableInputObj(prop: IMutableNoteObjProp) {
  const props = prop.props;
  const cursor = props.style.cursor;
  const width = props.style.width;
  const height = props.style.height;
  const left = props.style.left;
  const top = props.style.top;

  const data = props.data[props.index].data as IInput;

  return (
    <div
      className={props.className}
      onClick={() => props.noteObjClick(props.index)}
      onMouseDown={(e) => props.noteObjMouseDown(e, props.index)}
      style={{ width, height, left, top }}
    >
      <input className="noteObj_input" style={{ cursor }} value={data.content || ""} readOnly />
      {props.selectedData === props.index ? (
        <ResizeHandle
          index={props.index}
          data={props.data}
          setData={props.setData}
          mouse={props.mouse}
          offset={props.offset}
          gridSize={props.gridSize}
          setResizeDraw={props.setResizeDraw}
          resizeDraw={props.resizeDraw}
        />
      ) : null}
    </div>
  );
}
