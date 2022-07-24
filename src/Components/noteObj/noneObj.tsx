import { INoteObjProp } from "../../type";

export default function NoneObj(prop: INoteObjProp) {
  const props = prop.props;

  const width = props.width;
  const height = props.height;
  const left = props.left;
  const top = props.top;

  return (
    <div className={props.className} style={{ width, height, left, top }}>
      <div className="noteObj_none"></div>
    </div>
  );
}
