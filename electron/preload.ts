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
};

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
};

contextBridge.exposeInMainWorld(apiName, api);
