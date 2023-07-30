import { app } from 'electron';
import sendMail from './sendMail';
import { ipcMain } from './ipc';

const setupIpc = () => {
  ipcMain.handle<{ subject: string; body: string }, void>('send-mail', (_, { subject, body }) =>
    sendMail(subject, body),
  );
  ipcMain.handle<void, string>('get-version', async () => ({ ok: true, data: app.getVersion() }));
};

export default setupIpc;
