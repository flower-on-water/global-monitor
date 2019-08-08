import { promises as fs } from 'fs';
import path from 'path';

import log from './log';

interface IExtensionContext {
}

interface IExtension {
  activate(context: IExtensionContext): void
  deactivate(): void
}

const context: IExtensionContext = {};
const extensionsPull: IExtension[] = [];

async function activate() {
  const absolutePathToExt = path.resolve(__dirname, '../extensions');

  try {
    const dirs = await fs.readdir(absolutePathToExt, { withFileTypes: true });

    dirs.forEach((dir) => {
      if (dir.isDirectory) {
        const extensionDir = dir.name;

        import(`../extensions/${extensionDir}/main`)
          .then(({ default: extension }: {default: IExtension}) => {
            extension.activate(context);
            extensionsPull.push(extension);
          })
          .catch((e) => {
            log.warn(e, `Extension '${extensionDir}' don't loaded`);
          });
      }
    });
  } catch (e) {
    log.warn(e, "Extensions don't loaded");
  }
}

function deactivate() {
  extensionsPull.forEach((extension) => {
    extension.deactivate();
  });
}

export default {
  activate,
  deactivate,
};
