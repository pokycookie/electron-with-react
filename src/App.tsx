import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  function btnClick() {
    const electron = window.require("electron");
    electron.ipcRenderer.send("BTN_CLICK", "message");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Electron!</p>
        <button onClick={btnClick}>Click it!</button>
      </header>
    </div>
  );
}

export default App;
