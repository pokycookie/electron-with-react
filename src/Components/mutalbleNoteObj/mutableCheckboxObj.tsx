import { ICheckbox, IMutableNoteObjProp } from "../../type";
import Checkbox from "../checkbox";
import { ResizeHandle } from "../resizeHandle";

export default function MutableCheckboxObj(prop: IMutableNoteObjProp) {
  const props = prop.props;
  const cursor = props.style.cursor;
  const width = props.style.width;
  const height = props.style.height;
  const left = props.style.left;
  const top = props.style.top;

  const data = props.data[props.index].data as ICheckbox;

  return (
    <div
      className={props.className}
      onClick={() => props.noteObjClick(props.index)}
      onMouseDown={(e) => props.noteObjMouseDown(e, props.index)}
      style={{ width, height, left, top }}
    >
      <Checkbox cursor={cursor} checked={data.checked || false} mutable={true} />
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
