import { useState } from "react";
import { ICheckbox, INoteObjProp } from "../../type";
import Checkbox from "../checkbox";

export default function CheckboxObj(prop: INoteObjProp) {
  const props = prop.props;
  const width = props.width;
  const height = props.height;
  const left = props.left;
  const top = props.top;

  const data = props.element.data as ICheckbox;
  const [checked, setChecked] = useState<boolean>(data.checked);

  const onChange = (value: boolean) => {
    setChecked(value);
    const tempDataArr = [...props.data];
    const tempData = tempDataArr[props.index].data as ICheckbox;
    tempData.checked = value;
    props.setData(tempDataArr);
  };

  return (
    <div className={props.className} style={{ width, height, left, top }}>
      <Checkbox checked={checked} onChange={onChange} mutable={false} />
    </div>
  );
}
