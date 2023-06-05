type IpcFailure = { ok: false; error: string };
type IpcSuccess = { ok: true };
export type IpcResult<TData> = (IpcSuccess & { data: TData }) | (IpcFailure & { data: undefined });
export type IpcVoidResult = IpcSuccess | IpcFailure;
