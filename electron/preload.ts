import { contextBridge } from 'electron';
import { type IpcResult } from './ipc/IpcResult';
import { type IpcCallback, ipcRenderer } from './ipc/ipc';

const htmlEscapeMap = {
  '>': '&gt;',
  '<': '&lt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHTML(value: string) {
  return value.replace(/[&<>'"]/g, (symbol) => htmlEscapeMap[symbol as keyof typeof htmlEscapeMap]);
}

export const apiName = 'electronAPI';

export type API = {
  sendRequest: (telegram: string, subject: string, body: string) => Promise<IpcResult<void>>;
  sendFeedback: (telegram: string, feedback: string) => Promise<IpcResult<void>>;
  filesConfig: {
    API_ROOT: string;
    USER: string;
    PASSWORD: string;
  };
  appVersion: Promise<IpcResult<string>>;
  onUpdateAvailable: (callback: IpcCallback<string>) => void;
  onUpdateDownloading: (callback: IpcCallback<number>) => void;
};

const {
  VITE_API_ROOT: API_ROOT,
  VITE_API_USER: USER,
  VITE_API_PASSWORD: PASSWORD,
} = process.env as Record<string, string>;

const api: API = {
  sendRequest: (telegram, subject, body) =>
    ipcRenderer.invoke('send-mail', {
      subject: `Request: ${subject}`,
      body: `<p>Telegram: <a href="https://t.me/${telegram}">@${telegram}</a></p><h2>Request: ${escapeHTML(
        subject,
      )}</h2><p>${escapeHTML(body)}</p>`,
    }),
  sendFeedback: (telegram, feedback) =>
    ipcRenderer.invoke('send-mail', {
      subject: 'Feedback',
      body: `<p>Telegram: <a href="https://t.me/${telegram}">@${telegram}</a></p><h2>Feedback</h2><p>${escapeHTML(
        feedback,
      )}</p>`,
    }),
  filesConfig: { API_ROOT, USER, PASSWORD },
  appVersion: ipcRenderer.invoke<void, string>('get-version'),
  onUpdateAvailable: (callback: IpcCallback<string>) => ipcRenderer.on('notify-update', callback),
  onUpdateDownloading: (callback: IpcCallback<number>) =>
    ipcRenderer.on('downloading-update', callback),
};

contextBridge.exposeInMainWorld(apiName, api);
