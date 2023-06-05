import { ipcRenderer } from 'electron';
import { IpcChannel } from './IpcChannel';

const invokeIpc = <TArg>(channel: IpcChannel, arg?: TArg) => ipcRenderer.invoke(channel, arg);

export default invokeIpc;
