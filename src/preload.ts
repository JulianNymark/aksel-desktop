// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron/renderer");

const electronApi = {
  sendNotification: (title: string, body: string) =>
    ipcRenderer.send("send-notification", title, body),
};

export type ElectronAPI = typeof electronApi;

contextBridge.exposeInMainWorld("electronAPI", electronApi);
