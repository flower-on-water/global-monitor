import { IImmutableEnv } from './typings/env';

enum Code {
  Dev = 'dev',
  Prod = 'prod',
  Test = 'test',
}

class ImmutableEnv implements IImmutableEnv {
  readonly isProd = process.env.NODE_ENV === 'production'
  readonly isTest = !!process.env.IS_TEST
  readonly isDev = !(this.isProd || this.isTest)

  readonly Code = Code
  readonly code: Code

  // todo real compute version
  readonly version = '0.0.1'

  constructor() {
    if (this.isDev) {
      this.code = Code.Dev;
    } else {
      this.code = this.isProd ? Code.Prod : Code.Test;
    }
  }
}

export default new ImmutableEnv();
