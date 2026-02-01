declare const scriptUrls: string[];
declare const effekseerWasmUrl = "js/libs/effekseer.wasm";
declare var $plugins: any[];
declare var nw: any;
declare var effekseer: any;
declare class Main {
    xhrSucceeded: boolean;
    loadCount: number;
    error: any;
    numScripts: number;
    constructor();
    run(): void;
    showLoadingSpinner(): void;
    eraseLoadingSpinner(): void;
    testXhr(): void;
    hookNwjsClose(): void;
    loadMainScripts(): void;
    onScriptLoad(): void;
    onScriptError(e: any): void;
    printError(name: string, message: string): void;
    makeErrorHtml(name: string, message: string): string;
    onWindowLoad(): void;
    onWindowError(event: any): void;
    isPathRandomized(): boolean;
    initEffekseerRuntime(): void;
    onEffekseerLoad(): void;
    onEffekseerError(): void;
}
declare const main: Main;
