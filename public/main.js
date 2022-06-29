const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL("http://localhost:3000");
};

app
  .whenReady()
  .then(createWindow)
  .then(() => {
    ipcMain.on("BTN_CLICK", (event, args) => {
      console.log(args);
      new Notification({ title: "NOTIFICATION", body: args }).show();
    });
  });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
