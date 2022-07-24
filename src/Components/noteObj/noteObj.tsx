import { INoteObj, INoteObjProp } from "../../type";
import InputObj from "./inputObj";
import NoneObj from "./noneObj";
import TextAreaObj from "./textareaObj";

interface Props {
  element: INoteObj;
  gridSize: number;
}

export default function NoteObj(props: Props) {
  const width = props.element.width * props.gridSize;
  const height = props.element.height * props.gridSize;
  const left = props.element.x * props.gridSize;
  const top = props.element.y * props.gridSize;

  const noteObjProp: INoteObjProp = {
    props: {
      className: "_noteObj",
      element: props.element,
      height,
      left,
      top,
      width,
    },
  };

  switch (props.element.type) {
    case "none":
      return <NoneObj props={noteObjProp.props} />;
    case "input":
      return <InputObj props={noteObjProp.props} />;
    case "textarea":
      return <TextAreaObj props={noteObjProp.props} />;
    default:
      return <NoneObj props={noteObjProp.props} />;
  }
}
