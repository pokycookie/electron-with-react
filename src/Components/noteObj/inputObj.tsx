import { INoteObjProp } from "../../type";

export default function InputObj(prop: INoteObjProp) {
  const props = prop.props;

  const width = props.width;
  const height = props.height;
  const left = props.left;
  const top = props.top;

  return (
    <div className={props.className} style={{ width, height, left, top }}>
      <input className="noteObj_input" />
    </div>
  );
}
