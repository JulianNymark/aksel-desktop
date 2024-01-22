import { app, BrowserWindow, ipcMain, Menu, nativeImage, Tray } from "electron";
import path from "path";
if (require("electron-squirrel-startup")) {
  app.quit();
}

const { Notification } = require("electron");

const akselIconURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQCSURBVHic7dxPqBVlHMbx5+3a9Q+EUBC4aCGFIC4yy5WLyKJsIXcZ7nQRBUGaYbXIjUYh1MoiF7VUy4XYn5WLi4JGbYwKAsOlujDyit0y4+q3xZkLgzln3vP+n3Ge9dz3+b2fM+fMYe45RxoypISYWAsDSyWtk7Ra0kpJS2J1OeaWpCuSLks6b4yZd10oKCIwJWlG0suSnpa0POT6EfOPpFlJRyQdNcbczjIF8CRwju7nZ+CZHIAvATcybz5kFoDdtvu/LwDgdo2eBst81yooU5I+AvbZHOz1mlgBfq4AD0ahQdI2Y8yX4w5yRpwQcEF2V+d5ja6YqbJS0kMtx8xJeswYczVoM7AduNXyunISeBYwwDSwGTjd8jd/AZuDDtu+l7XAoZb9fBi61AZwL/C/sxyYAj4tDbKabQb4t2Gm64ze9wYpsgEce1VjdGZ+Uijk7jEzbQlRsMMXsLZWkZDA/cClhnkO+C5uA/jGhGuWCvlZwyyHfRYNDlhbuzhI4N2GOWZdF7QBfMdzaAMcbOn4G3jOp2eCed5qmOGMy2LRAWtdxUAGQ0wJWOssAjIIYg7AWnd2SG9ES8C3Y22gmiErpBdiCYC1WbJBOiOWBFibKQukEyLwQgvgbWBXyEFtQ4b3ka6IP5YIWJsvKaQr4p9jAHeGGMw3KSFdEU+VDLiYVJCuiI8Dv9cOvgm85jNIrKSAdEKs/vBh4FXgTWCt6wApEhvSGbFrIeLbHxfETv6XzhiDpNclfTzmsOWSvnaBnDSdRJTKguwsolQOZKcRpTIgO48o5YfsBaKUF7I3iFI+yF4hSnkge4copYfsJaKUFrK3iFI6yF4jSvnf/vQqE9z9+faeuIvjGsu7P00p6y4OsA04A/wEvA8k+b6L5VO7/ADv3eVR/irxDC5nZBlPZ+CDMUOuTjzLpJD5EVsAAZ7KMNMkkHkRLQAvA1m+TDQBZD5EC8CbwPPZBpQ1ZB5E7n4RuRNwJstwd6SC/KIoxC4BLgZ4EJgvArGLgIsBTmRH7DKgJNH8ja9vUg3QaUBJAmYbZj+UorwPgGto/qzmntjlfQCcBr4fs4eNMcv7ADgFHB6zh9+AODdregK4BDjWso9XYpXfK4A/MPqpmuDl+3sA2PYUhtGHXx+NUd4HQJsz8CrwRIzyPgDanIFzxLgaD4D+5QOgZ/kA6Fk+AHqWD4Ce5QOgZ/kA6Fk+AHqWD4Ce5QOgZ/kOC8CtwYsDBzjQso8/gA2xys/3AHApzT/bFxewGuBalwElCViVDbAa4HiXARcD/JoFsCp/BPilVnwFeDF6ceAw+p3vi7V9XADWp+g21QDTkjZJWiHpO2PMXIry0AEe0GgfC5LOGmNuZB5pyJAh3cp/MzJ4YnS+OCQAAAAASUVORK5CYII=";
const sendNotification = (title: string, body: string) => {
  new Notification({
    title,
    body,
  }).show();
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  ipcMain.on("send-notification", (event, title, body) => {
    sendNotification(title, body);
  });

  let icon = nativeImage.createFromDataURL(akselIconURL);
  icon = icon.resize({ height: 16, width: 16 });
  const tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: "Normal", type: "radio", checked: true },
    { label: "Turbo", type: "radio" },
  ]);

  tray.setToolTip("This is Aksel-desktop");
  tray.setContextMenu(contextMenu);

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
