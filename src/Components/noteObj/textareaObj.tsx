import { INoteObjProp } from "../../type";

export default function TextAreaObj(prop: INoteObjProp) {
  const props = prop.props;

  const width = props.width;
  const height = props.height;
  const left = props.left;
  const top = props.top;

  return (
    <div className={props.className} style={{ width, height, left, top }}>
      <textarea className="noteObj_input" style={{ resize: "none" }}></textarea>
    </div>
  );
}
