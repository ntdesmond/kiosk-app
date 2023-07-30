import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'node:path';
import minimist from 'minimist';
import setupIpc from './ipc/setup';
import { ipcMain } from './ipc/ipc';

const dist_path = path.join(__dirname, '../dist');

const { VITE_DEV_SERVER_URL, VITE_NOUPDATE } = process.env;

const updatesEnabled = VITE_NOUPDATE === undefined;

const argv = minimist(process.argv.slice(process.argv.indexOf('--') + 1), {
  default: {
    width: 1920,
    height: 1080,
    kiosk: true,
    relaunch: false,
    update: updatesEnabled,
    debug: false,
  },
  alias: { width: 'w', height: 'h' },
});

const createWindow = () => {
  const window = new BrowserWindow({
    kiosk: argv.kiosk as boolean,
    fullscreen: argv.kiosk as boolean,
    width: argv.width as number,
    height: argv.height as number,
    autoHideMenuBar: true,
    webPreferences: {
      devTools: import.meta.env.DEV || (argv.debug as boolean),
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (import.meta.env.PROD && !(argv.debug as boolean)) {
    window.removeMenu();
  }

  if (VITE_DEV_SERVER_URL) {
    window.loadURL(VITE_DEV_SERVER_URL);
  } else {
    window.loadFile(path.join(dist_path, 'index.html'));
  }

  return window;
};

const configureUpdates = (window: BrowserWindow) => {
  const shouldUpdate = argv.update as boolean;
  autoUpdater.autoDownload = shouldUpdate;
  autoUpdater.autoInstallOnAppQuit = false;
  if (shouldUpdate) {
    const shouldRelaunch = argv.relaunch as boolean;
    autoUpdater.on('update-downloaded', () => autoUpdater.quitAndInstall(true, shouldRelaunch));
  } else {
    autoUpdater.on('update-available', (update) =>
      ipcMain.send(window, 'notify-update', update.version),
    );
  }
  autoUpdater.checkForUpdates();
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('web-contents-created', (_, contents) => {
  contents.on('will-navigate', (event) => event.preventDefault());
});

app.whenReady().then(() => {
  setupIpc();
  const window = createWindow();
  configureUpdates(window);
});
