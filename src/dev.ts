import { App, BrowserWindow } from 'electron';
import { installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';

import log from './log';

const logger = log.get(log.Domain.Dev);

async function init(app: App, win: BrowserWindow) {
  // Exit cleanly on request from parent process in development mode.
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }

  try {
    await installVueDevtools();

    // use setImmediate for fix load vue tool with components
    win.webContents.once('dom-ready', () => win.webContents.openDevTools());
  } catch (e) {
    logger.error('Vue Devtools failed to install');
  }
}

export default {
  init,
};
