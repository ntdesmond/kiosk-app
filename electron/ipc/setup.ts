import { ipcMain } from 'electron';
import sendMail from './sendMail';

const setupIPC = () => {
  ipcMain.handle('send-mail', (_, subject, body) => sendMail(subject, body));
};

export default setupIPC;
