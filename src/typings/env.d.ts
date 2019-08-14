export interface IImmutableEnv {
  readonly isDev: boolean
  readonly isProd: boolean
  readonly isTest: boolean

  readonly code: string
  readonly version: string
}
