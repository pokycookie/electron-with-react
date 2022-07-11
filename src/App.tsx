import { useState } from "react";
import { Modal } from "./Components/modal/modal";
import { MainPage } from "./pages/mainPage";
import { NotePage } from "./pages/notePage";

import { AppMode } from "./type";

function App() {
  const [modal, setModal] = useState<boolean>(false);
  const [mode, setMode] = useState<AppMode>("note");
  const [data, setData] = useState<string>("");

  return (
    <div className="App">
      {mode === "main" ? (
        <MainPage setMode={setMode} setModal={setModal} setData={setData} />
      ) : null}
      {mode === "note" ? (
        <NotePage setMode={setMode} setModal={setModal} data={data} />
      ) : null}
      {modal ? <Modal /> : null}
    </div>
  );
}

export default App;
