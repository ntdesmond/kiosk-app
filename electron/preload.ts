import { contextBridge, ipcRenderer } from 'electron';
import { IPCVoidResult } from './ipc/IPCResult';

export const apiName = 'electronAPI';

export type API = {
  sendMail: () => Promise<IPCVoidResult>;
};

const api: API = {
  sendMail: () => ipcRenderer.invoke('send-mail', 'Test subject', 'Test body'),
};

contextBridge.exposeInMainWorld(apiName, api);
