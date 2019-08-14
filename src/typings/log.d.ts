import { Logger } from 'winston';

export interface ILog {
  get(domain: string): Logger
}
