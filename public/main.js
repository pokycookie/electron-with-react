const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  dialog,
} = require("electron");
const fs = require("fs");
const path = require("path");

const rootPath = `${app.getPath("documents")}/electronNote`;

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
  .then(async () => {
    ipcMain.on("BTN_CLICK", (event, args) => {
      new Notification({ title: "NOTIFICATION", body: args }).show();
    });
    ipcMain.on("fsWrite", (event, args) => {
      !fs.existsSync(rootPath) && fs.mkdirSync(rootPath);
      const tempPath = path.join(rootPath, `${args.fileName}.txt`);
      console.log(args);
      fs.writeFile(tempPath, args.contents, (err) => {
        if (err) console.error(err);
      });
    });
    ipcMain.on("fsRead", (event, args) => {
      dialog.showOpenDialog({ defaultPath: rootPath }).then((res) => {
        console.log(res.filePaths[0]);
        fs.readFile(res.filePaths[0], (err, data) => {
          if (err) console.error(err);
          event.reply("fsRead", data.toString());
        });
      });
    });
  });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
