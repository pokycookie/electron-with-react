import { useState } from "react";

interface Props {
  checked: boolean;
  mutable: boolean;
  onChange?: (value: boolean) => void;
  cursor?: string;
}

export default function Checkbox(props: Props) {
  const [checked, setChecked] = useState(props.checked);
  const cursor = props.cursor || "";

  const onClick = () => {
    if (!props.mutable) {
      const tempChecked = checked ? false : true;
      setChecked(tempChecked);
      if (props.onChange !== undefined) {
        props.onChange(tempChecked);
      }
    }
  };

  return (
    <div
      onClick={onClick}
      className="noteObj_checkbox"
      style={{ cursor, backgroundColor: checked ? "#2B7A0B" : "white" }}
    >
      {/* <FontAwesomeIcon icon={checked ? faSquareCheck : faSquare} /> */}
    </div>
  );
}
