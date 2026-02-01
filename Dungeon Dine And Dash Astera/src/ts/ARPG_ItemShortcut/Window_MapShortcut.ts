import { Window_Shortcut } from "./Window_Shortcut";

export class Window_MapShortcut extends Window_Shortcut {
    initialize(rect: Rectangle): void {
        super.initialize(rect);
    }

    processCursorMove() {
        if (this.isCursorMovable()) {
            const lastIndex = this.index();
            if (!this.isHandled("pagedown") && Input.isTriggered("pagedown")) {
                this.cursorRight(Input.isTriggered("pagedown"));
            }
            if (!this.isHandled("pageup") && Input.isTriggered("pageup")) {
                this.cursorLeft(Input.isTriggered("pageup"));
            }
            if (this.index() !== lastIndex) {
                this.playCursorSound();
            }
        }
    }

    cursorRight(wrap: boolean) {
        const index = this.index();
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        if (maxCols >= 2) {
            this.smoothSelect((index + 1) % maxItems);
        }
    }

    cursorLeft(wrap: boolean) {
        const index = Math.max(0, this.index());
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        if (maxCols >= 2) {
            this.smoothSelect((index - 1 + maxItems) % maxItems);
        }
    }
}
