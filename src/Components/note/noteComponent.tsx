import { useState } from "react";
import { AppMode } from "../../type";

const { ipcRenderer } = window.require("electron");

interface Props {
  setMode: (mode: AppMode) => void;
  setModal: (modal: boolean) => void;
  data: string;
}

export function NoteComponent(props: Props) {
  const [fileName, setFileName] = useState<string>("");
  const [contents, setContents] = useState<string>(props.data);

  function exit() {
    props.setMode("main");
  }

  const callFsWrite = () => {
    ipcRenderer.send("fsWrite", {
      fileName,
      contents,
    });
  };

  return (
    <div className="noteComponent">
      <div className="header">
        <input
          className="_input title"
          value={fileName}
          onChange={({ target }) => {
            setFileName(target.value);
          }}
        />
        <button className="_btn" onClick={callFsWrite}>
          SAVE
        </button>
        <button className="_btn _btn_alert" onClick={exit}>
          EXIT
        </button>
      </div>
      <div className="contentsArea">
        <textarea
          className="_input contents"
          value={contents}
          onChange={({ target }) => {
            setContents(target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
}
