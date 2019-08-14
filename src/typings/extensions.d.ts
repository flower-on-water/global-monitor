export interface IExtensionContext {}

export interface IExtension {
  activate(context: IExtensionContext): void
  deactivate(): void
}
