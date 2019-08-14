import { promises as fs } from 'fs';
import path from 'path';

import log from './log';

import { IExtension, IExtensionContext } from './typings/extensions';

const logger = log.get(log.Domain.Ext);

const context: IExtensionContext = {};
const extensionsPull: IExtension[] = [];

async function activate() {
  const absolutePathToExt = path.resolve(__dirname, '../extensions');

  try {
    const dirs = await fs.readdir(absolutePathToExt, { withFileTypes: true });

    dirs.forEach((dir) => {
      if (dir.isDirectory) {
        const extensionDir = dir.name;

        import(`../extensions/${extensionDir}/index`)
          .then(({ default: extension }: {default: IExtension}) => {
            extension.activate(context);
            extensionsPull.push(extension);
          })
          .catch((e) => {
            logger.warn(`Extension '${extensionDir}' don't loaded`, e);
          });
      }
    });
  } catch (e) {
    logger.warn("Extensions don't loaded", e);
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
