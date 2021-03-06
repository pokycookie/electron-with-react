import { useEffect } from "react";
import { AppMode } from "../type";

const { ipcRenderer } = window.require("electron");

interface Props {
  setPage: (mode: AppMode) => void;
  setModal: (modal: boolean) => void;
  setData: (data: string) => void;
}

export function MainPage(props: Props) {
  useEffect(() => {
    ipcRenderer.on("fsRead", (event: any, args: string) => {
      props.setData(args);
      props.setPage("note");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callFsRead = () => {
    ipcRenderer.send("fsRead", null);
  };

  const newFile = () => {
    props.setData("");
    props.setPage("note");
  };

  return (
    <div className="mainComponent">
      <div className="btnArea">
        <button className="_btn" onClick={callFsRead}>
          LOAD FILE
        </button>
        <button className="_btn" onClick={newFile}>
          NEW FILE
        </button>
      </div>
    </div>
  );
}
