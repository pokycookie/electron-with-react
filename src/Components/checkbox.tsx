import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Props {
  checked: boolean;
  mutable: boolean;
  onChange?: (value: boolean) => void;
  cursor?: string;
  size: number;
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
    <div onClick={onClick} className="noteObj_checkbox" style={{ cursor, fontSize: props.size }}>
      <FontAwesomeIcon icon={checked ? faSquareCheck : faSquare} />
    </div>
  );
}
