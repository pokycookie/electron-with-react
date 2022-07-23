import { faFlaskVial, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AppMode, NoteObjType } from "../type";
import { Paper } from "../Components/paper";

const { ipcRenderer } = window.require("electron");

interface Props {
  setMode: (mode: AppMode) => void;
  setModal: (modal: boolean) => void;
  data: string;
}

export function NotePage(props: Props) {
  const [fileName, setFileName] = useState<string>("");
  const [contents, setContents] = useState<string>(props.data);
  const [drawType, setDrawType] = useState<NoteObjType | null>(null);

  function exit() {
    props.setMode("main");
  }

  const callFsWrite = () => {
    ipcRenderer.send("fsWrite", {
      fileName,
      contents,
    });
  };

  const typeBtnOnClick = (type: NoteObjType) => {
    setDrawType(drawType !== null ? null : type);
  };

  return (
    <div className="notePage">
      <div className="header">
        <button className="_btn" onClick={callFsWrite}>
          SAVE
        </button>
        <button className="_btn _btn_alert" onClick={exit}>
          EXIT
        </button>
      </div>
      <div className="main">
        <Paper drawType={drawType} setDrawType={setDrawType} />
        <div className="nav">
          <button className="navBtn" onClick={() => typeBtnOnClick("none")}>
            <FontAwesomeIcon icon={faFlaskVial} />
          </button>
          <button className="navBtn" onClick={() => typeBtnOnClick("input")}>
            <FontAwesomeIcon icon={faKeyboard} />
          </button>
          <button className="navBtn" onClick={() => typeBtnOnClick("textarea")}>
            <FontAwesomeIcon icon={faKeyboard} />
          </button>
        </div>
      </div>
    </div>
  );
}
