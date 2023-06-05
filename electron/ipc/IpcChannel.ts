const channels = ['send-mail'] as const;
export type IpcChannel = (typeof channels)[number];
