declare class ConfigManager {
    constructor();
    static alwaysDash: boolean;
    static commandRemember: boolean;
    static touchUI: boolean;
    static _isLoaded: boolean;
    static get bgmVolume(): number;
    static set bgmVolume(value: number);
    static get bgsVolume(): number;
    static set bgsVolume(value: number);
    static get meVolume(): number;
    static set meVolume(value: number);
    static get seVolume(): number;
    static set seVolume(value: number);
    static load(): void;
    static save(): void;
    static isLoaded(): boolean;
    static makeData(): IConfig;
    static applyData(config: IConfig): void;
    static readFlag(config: IConfig, name: keyof IConfig, defaultValue: any): any;
    static readVolume(config: IConfig, name: keyof IConfig): number;
}
interface IConfig {
    alwaysDash: boolean;
    commandRemember: boolean;
    touchUI: boolean;
    bgmVolume: number;
    bgsVolume: number;
    meVolume: number;
    seVolume: number;
}
