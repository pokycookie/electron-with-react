import { useState } from "react";
import { MainComponent } from "./Components/main/mainComponent";
import { Modal } from "./Components/modal/modal";
import { NoteComponent } from "./Components/note/noteComponent";
import { NotePage } from "./Components/note/notePage";
import { AppMode } from "./type";

function App() {
  const [modal, setModal] = useState<boolean>(false);
  const [mode, setMode] = useState<AppMode>("notePage");
  const [data, setData] = useState<string>("");

  return (
    <div className="App">
      {mode === "main" ? (
        <MainComponent
          setMode={setMode}
          setModal={setModal}
          setData={setData}
        />
      ) : null}
      {mode === "notePage" ? <NotePage /> : null}
      {mode === "note" ? (
        <NoteComponent setMode={setMode} setModal={setModal} data={data} />
      ) : null}
      {modal ? <Modal /> : null}
    </div>
  );
}

export default App;
