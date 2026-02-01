declare class PluginManager {
    constructor();
    static _scripts: string[];
    static _errorUrls: string[];
    static _parameters: any;
    static _commands: any;
    static setup(plugins: any[]): void;
    static parameters(name: string): any;
    static setParameters(name: string, parameters: any): void;
    static loadScript(filename: string): void;
    static onError(e: any): void;
    static makeUrl(filename: string): string;
    static checkErrors(): void;
    static throwLoadError(url: string): void;
    static registerCommand(pluginName: string, commandName: string, func: Function): void;
    static callCommand(self: any, pluginName: string, commandName: string, args: any[]): void;
}
