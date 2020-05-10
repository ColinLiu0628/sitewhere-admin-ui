import { app } from "electron";
import { initSplashScreen } from "@trodi/electron-splashscreen";
import path from "path";
import { format as formatURL } from "url";
import IsDev from "electron-is-dev";

const { autoUpdater } = require("electron-updater");
const isDevelopment = process.env.NODE_ENV !== "production";

app.on("ready", () => {
  let version = !IsDev ? app.getVersion() : "3.0.0";

  // Main window options.
  let windowOptions = {
    width: 1440,
    minWidth: 1024,
    height: 900,
    minHeight: 768,
    title: `SiteWhere Admininstration (${version} CE)`,
    frame: true,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  };

  // Create splash screen.
  let window = initSplashScreen({
    windowOpts: windowOptions,
    templateUrl: path.join(__static, "/icon.svg"),
    delay: 0,
    minVisible: 2000,
    splashScreenOpts: {
      height: 350,
      width: 350,
      transparent: true,
      webPreferences: {
        webSecurity: false
      }
    }
  });

  if (isDevelopment) {
    let url = `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`;
    window.loadURL(url);
  } else {
    window.loadURL(
      formatURL({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
      })
    );
  }

  require("./menu/mainmenu");

  // check for updates.
  autoUpdater.checkForUpdatesAndNotify();
});

app.on("window-all-closed", () => {
  app.quit();
});
