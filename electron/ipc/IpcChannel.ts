const channels = ['send-mail', 'notify-update', 'get-version'] as const;
export type IpcChannel = (typeof channels)[number];
