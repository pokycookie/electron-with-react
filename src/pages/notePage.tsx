import { faFlaskVial } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AppMode } from "../type";
import { NotePage2 } from "./notePage2";

const { ipcRenderer } = window.require("electron");

interface Props {
  setMode: (mode: AppMode) => void;
  setModal: (modal: boolean) => void;
  data: string;
}

export function NotePage(props: Props) {
  const [fileName, setFileName] = useState<string>("");
  const [contents, setContents] = useState<string>(props.data);
  const [draw, setDraw] = useState<boolean>(false);

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
    <div className="notePage">
      <div className="header">
        {/* <input
          className="_input title"
          value={fileName}
          onChange={({ target }) => {
            setFileName(target.value);
          }}
        /> */}
        <button className="_btn" onClick={callFsWrite}>
          SAVE
        </button>
        <button className="_btn _btn_alert" onClick={exit}>
          EXIT
        </button>
      </div>
      <div className="main">
        {/* <textarea
          className="_input contents"
          value={contents}
          onChange={({ target }) => {
            setContents(target.value);
          }}
        ></textarea> */}
        <NotePage2 draw={draw} setDraw={setDraw} />
        <div className="nav">
          <button className="navBtn" onClick={() => setDraw(draw ? false : true)}>
            <FontAwesomeIcon icon={faFlaskVial} />
          </button>
        </div>
      </div>
    </div>
  );
}
