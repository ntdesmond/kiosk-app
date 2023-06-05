import { ipcMain } from 'electron';
import sendMail from './sendMail';
import { IpcResult, IpcVoidResult } from './IpcResult';
import { IpcChannel } from './IpcChannel';

type IpcHandler<TArg> = (
  event: Electron.IpcMainInvokeEvent,
  arg: TArg,
) => Promise<IpcVoidResult> | Promise<IpcResult<unknown>>;

const addHandler = <TArg>(channel: IpcChannel, handler: IpcHandler<TArg>) =>
  ipcMain.handle(channel, handler);

const setupIpc = () => {
  addHandler<{ subject: string; body: string }>('send-mail', (_, { subject, body }) =>
    sendMail(subject, body),
  );
};

export default setupIpc;
