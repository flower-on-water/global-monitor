import chalk from 'chalk';
import { pad } from 'lodash-es';
import {
  createLogger,
  format,
  transports,
  Logger,
} from 'winston';
import DailyRotateFile, { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';

import env from './env';

import { ILog } from './typings/log';

enum Domain {
  Dev = 'dev',
  Ext = 'ext',
  Main = 'main',
}

enum Level {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Verbose = 'verbose',
  Debug = 'debug',
  Silly = 'silly',
}

class Log implements ILog {
  protected logger: Logger;
  readonly Domain = Domain;

  constructor() {
    const formats = {
      file: format.combine(
        format.errors({ stack: true }),
        // add version
        format((info, version) => {
          // eslint-disable-next-line no-param-reassign
          info.version = version;

          return info;
        })(env.version),
        format.timestamp({ alias: 't' }),
        format.ms(),
        format.json(),
      ),
      console: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        // format.padLevels(),
        format.printf((info) => {
          const { padding = '' } = info;
          let { domain, stack = '' } = info;
          let rest = JSON.stringify(
            info, (key, value) => (['domain', 'level', 'message', 'stack'].includes(key) ? undefined : value),
          );

          domain = chalk.white.bgBlackBright.dim(pad(info.domain.toUpperCase(), 6));
          rest = rest !== '{}' ? ` ${rest} ` : '';
          stack = stack && `\n${stack}`;

          return `${domain}  ${info.level}:${padding} ${info.message}${rest}${stack}`;
        }),
      ),
    };
    const commonTransportFileConfig: DailyRotateFileTransportOptions = {
      maxSize: '3m',
      maxFiles: '3',
      datePattern: 'YYYY-MM-DD',
      // not remove old files with gz https://github.com/winstonjs/winston-daily-rotate-file/issues/125
      zippedArchive: false,
      dirname: 'var/log',
      format: formats.file,
    };

    this.logger = createLogger({
      level: env.isProd ? Level.Warn : Level.Debug,
      transports: [
        new DailyRotateFile({ ...commonTransportFileConfig, filename: `${env.code}-%DATE%.log` }),
      ],
      exceptionHandlers: [
        new DailyRotateFile({ ...commonTransportFileConfig, filename: `${env.code}_uncaught_exception-%DATE%.log` }),
      ],
    });

    if (env.isDev) {
      this.logger.add(new transports.Console({ format: formats.console }));
    }
  }

  get(domain: Domain): Logger {
    return this.logger.child({
      domain,
    });
  }
}

export default new Log();
