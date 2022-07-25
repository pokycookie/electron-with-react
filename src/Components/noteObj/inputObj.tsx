import { useState } from "react";
import { IInput, INoteObjProp } from "../../type";

export default function InputObj(prop: INoteObjProp) {
  const props = prop.props;
  const width = props.width;
  const height = props.height;
  const left = props.left;
  const top = props.top;

  const data = props.element.data as IInput;
  const [content, setContent] = useState<string>(data.content || "");

  const onChange = (value: string) => {
    setContent(value);
    const tempDataArr = [...props.data];
    const tempData = tempDataArr[props.index].data as IInput;
    tempData.content = value;
    props.setData(tempDataArr);
  };

  return (
    <div className={props.className} style={{ width, height, left, top }}>
      <input
        className="noteObj_input"
        value={content}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  );
}
