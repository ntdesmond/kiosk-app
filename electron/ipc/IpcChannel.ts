const channels = ['send-mail', 'notify-update', 'get-version', 'downloading-update'] as const;
export type IpcChannel = (typeof channels)[number];
