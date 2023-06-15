import { contextBridge } from 'electron';
import { IpcVoidResult } from './ipc/IpcResult';
import invokeIpc from './ipc/invoke';

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
  sendRequest: (telegram: string, subject: string, body: string) => Promise<IpcVoidResult>;
  sendFeedback: (telegram: string, feedback: string) => Promise<IpcVoidResult>;
  filesConfig: {
    API_ROOT: string;
    USER: string;
    PASSWORD: string;
  };
};

const {
  VITE_API_ROOT: API_ROOT,
  VITE_API_USER: USER,
  VITE_API_PASSWORD: PASSWORD,
} = process.env as Record<string, string>;

const api: API = {
  sendRequest: (telegram, subject, body) =>
    invokeIpc('send-mail', {
      subject: `Request: ${subject}`,
      body: `<p>Telegram: <a href="https://t.me/${telegram}">@${telegram}</a></p><h2>Request: ${escapeHTML(
        subject,
      )}</h2><p>${escapeHTML(body)}</p>`,
    }),
  sendFeedback: (telegram, feedback) =>
    invokeIpc('send-mail', {
      subject: 'Feedback',
      body: `<p>Telegram: <a href="https://t.me/${telegram}">@${telegram}</a></p><h2>Feedback</h2><p>${escapeHTML(
        feedback,
      )}</p>`,
    }),
  filesConfig: { API_ROOT, USER, PASSWORD },
};

contextBridge.exposeInMainWorld(apiName, api);
