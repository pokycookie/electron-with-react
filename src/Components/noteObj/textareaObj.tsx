import { useState } from "react";
import { INoteObjProp, ITextarea } from "../../type";

export default function TextAreaObj(prop: INoteObjProp) {
  const props = prop.props;
  const width = props.width;
  const height = props.height;
  const left = props.left;
  const top = props.top;

  const data = props.element.data as ITextarea;
  const [content, setContent] = useState<string>(data.content || "");

  const onChange = (value: string) => {
    setContent(value);
    const tempDataArr = [...props.data];
    const tempData = tempDataArr[props.index].data as ITextarea;
    tempData.content = value;
    props.setData(tempDataArr);
  };

  return (
    <div className={props.className} style={{ width, height, left, top }}>
      <textarea
        className="noteObj_input"
        style={{ resize: "none" }}
        onChange={({ target }) => onChange(target.value)}
        value={content}
      ></textarea>
    </div>
  );
}
