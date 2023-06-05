import { contextBridge } from 'electron';
import { IpcVoidResult } from './ipc/IpcResult';
import invokeIpc from './ipc/invoke';

export const apiName = 'electronAPI';

export type API = {
  sendMail: () => Promise<IpcVoidResult>;
};

const api: API = {
  sendMail: () => invokeIpc('send-mail', { subject: 'Test subject', body: 'Test body' }),
};

contextBridge.exposeInMainWorld(apiName, api);
