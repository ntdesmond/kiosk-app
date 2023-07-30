import {
  BrowserWindow,
  IpcMainInvokeEvent,
  IpcRendererEvent,
  ipcMain,
  ipcRenderer,
} from 'electron';
import { IpcChannel } from './IpcChannel';
import { IpcResult } from './IpcResult';

type IpcCallbackParams<TEvent extends IpcMainInvokeEvent | IpcRendererEvent, TArg> = [
  event: TEvent,
  arg: TArg,
];

export type IpcHandler<TArg, TResult> = (
  ...args: IpcCallbackParams<IpcMainInvokeEvent, TArg>
) => Promise<IpcResult<TResult>>;

export type IpcCallback<TArg> = (...arg: IpcCallbackParams<IpcRendererEvent, TArg>) => void;

const main = {
  send: <TArg>(window: BrowserWindow, channel: IpcChannel, arg?: TArg) =>
    window.webContents.send(channel, arg),
  handle: <TArg, TResult>(channel: IpcChannel, handler: IpcHandler<TArg, TResult>) =>
    ipcMain.handle(channel, handler),
};

const renderer = {
  invoke: <TArg, TResult>(channel: IpcChannel, arg?: TArg) =>
    ipcRenderer.invoke(channel, arg) as Promise<IpcResult<TResult>>,
  on: <TArg>(channel: IpcChannel, callback: IpcCallback<TArg>) => ipcRenderer.on(channel, callback),
};

export { main as ipcMain, renderer as ipcRenderer };
