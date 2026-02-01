import { TimerComponent } from "../CommonLibrary/TimerComponent";
import { Component } from "../CommonLibrary/Component";
import { Window_CommonMessage } from "./Window_CommonMessage";

export type MessageWindowType = "common";

export class MessageWindowController extends Component<Game_Character> {
    private static readonly DEFAULT_SHOW_WINDOW_TIME = 60;
    private static readonly SHOW_WINDOW_GUARD_TIME = 6000;

    private _windowDatas: WindowData[] = [];
    private _createWindowCallback?: Function;
    private _deleteWindowCallback?: Function;
    private _showWindowTimer: TimerComponent<Game_Character> = new TimerComponent(this.showWindowTimerTimeout.bind(this));
    private _setupCompleted: boolean = false;
    private _afterFirst: boolean = false;
    private _manualWait: boolean = false;
    private _showWindowGuardTimer: TimerComponent<Game_Character> = new TimerComponent(this.showWindowGuardTimerTimeout.bind(this));

    protected start(): void {
        super.start();
        this.addComponent(this._showWindowTimer);
        this.addComponent(this._showWindowGuardTimer);
    }

    showWindow(text: string, rect: Rectangle, opt: { time?: number, type?: MessageWindowType } = {}): void {
        if (!this._setupCompleted) throw new Error("MessageWindowController is not setup completed.");
        const time = opt.time ?? MessageWindowController.DEFAULT_SHOW_WINDOW_TIME;
        const type = opt.type ?? "common";
        let window: Window_CommonMessage;
        if (type === "common") {
            window = new Window_CommonMessage(rect);
        } else {
            throw new Error(`${type} is invalid type.`);
        }
        window.text = text;
        window.y = this.calcWindowYPos(this._windowDatas.length);
        this._windowDatas.push(new WindowData(text, rect, window, type, time));
        if (!this.isManualWaiting() && !this._showWindowTimer.isTimerRunning()) {
            this._showWindowTimer.startTimer(time);
        }

        this._showWindowGuardTimer.startTimer(MessageWindowController.SHOW_WINDOW_GUARD_TIME);

        this._createWindowCallback!(window);
    }

    startManualWait(): void {
        if (this._showWindowTimer.isTimerRunning()) {
            this._manualWait = true;
            this._showWindowTimer.stop();
        }
    }

    endManualWait(): void {
        this._manualWait = false;
        this._showWindowTimer.resume();
    }

    isManualWaiting(): boolean {
        return this._manualWait;
    }

    clearAllWindows(): void {
        for (const winData of this._windowDatas) {
            this._deleteWindowCallback!(winData.window);
        }
        this._windowDatas = [];
    }

    sceneStart(createWindowCallback: Function, deleteWindowCallback: Function): void {
        this._createWindowCallback = createWindowCallback;
        this._deleteWindowCallback = deleteWindowCallback;
        this._setupCompleted = true;
        if (this._afterFirst) {
            this._windowDatas.forEach((winData, i) => {
                let window;
                if (winData.type === "common") {
                    window = new Window_CommonMessage(winData.rect);
                } else {
                    throw new Error(`${winData.type} is invalid type.`);
                }
                window.text = winData.text;
                window.y = this.calcWindowYPos(i);
                winData.window = window;
                this._createWindowCallback!(window);
            });
        } else {
            this._afterFirst = true;
        }
    }

    sceneTerminate(): void {
        this._setupCompleted = false;
        for (const winData of this._windowDatas) {
            this._deleteWindowCallback!(winData.window);
            winData.window = undefined;
        }
    }

    private calcWindowYPos(index: number): number {
        return index * 64 + 8;
    }

    private showWindowTimerTimeout(): void {
        const windowData = this._windowDatas.splice(0, 1)[0];
        if (this._windowDatas.length > 0) {
            this._showWindowTimer.startTimer(windowData.time);
        } else {
            this._showWindowGuardTimer.cancel();
        }

        this._windowDatas.forEach((winData, i) => {
            if (winData.window) {
                winData.window.y = this.calcWindowYPos(i);
            }
        });

        this._deleteWindowCallback!(windowData.window);
    }

    // NOTE: 何かしらの要因でウィンドウが破棄されなかった場合、永久的にウィンドウが残り続けるため、
    //       SHOW_WINDOW_GUARD_TIMEが経過した場合強制的に全ウィンドウをクリアする。
    private showWindowGuardTimerTimeout(): void {
        this.clearAllWindows();
        this._manualWait = false;
        this._showWindowTimer.cancel();
    }
}

class WindowData {
    text: string;
    rect: Rectangle
    window?: Window_CommonMessage;
    type: MessageWindowType;
    time: number;

    constructor(text: string, rect: Rectangle, window: Window_CommonMessage, type: MessageWindowType, time: number) {
        this.text = text;
        this.rect = rect;
        this.window = window;
        this.type = type;
        this.time = time;
    }
}
