import { useState } from "react";
import { Modal } from "./Components/modal";
import { MainPage } from "./pages/mainPage";
import { NotePage } from "./pages/notePage";

import { AppMode } from "./type";

function App() {
  const [modal, setModal] = useState<boolean>(false);
  const [page, setPage] = useState<AppMode>("note");
  const [data, setData] = useState<string>("");

  return (
    <div className="App">
      {page === "main" ? (
        <MainPage setPage={setPage} setModal={setModal} setData={setData} />
      ) : null}
      {page === "note" ? <NotePage setPage={setPage} setModal={setModal} data={data} /> : null}
      {modal ? <Modal /> : null}
    </div>
  );
}

export default App;
