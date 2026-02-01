export class Window_Shortcut extends Window_Selectable {
    initialize(rect: Rectangle): void {
        super.initialize(rect);
        this.contents.fontSize = 20;
    }

    maxCols() {
        return $shortcutStatus.numSlots();
    }

    maxItems() {
        return $shortcutStatus.numSlots();
    }

    isCurrentItemEnabled() {
        return true;
    }

    drawItem(index: number) {
        const actorId = $gameParty.leader().actorId();
        const rect = this.itemRect(index);
        const item = $shortcutStatus.shortcut(actorId, index);
        if (item) {
            const itemData = item.object()! as RMMZData.Item;
            this.drawIcon(itemData.iconIndex, rect.x + 4, rect.y + 4);
            if (DataManager.isSkill(itemData)) {
                this.changeTextColor(ColorManager.mpCostColor());
                this.drawText(itemData.mpCost, rect.x + 12, rect.y + 12, 24, "right");
                this.changeTextColor(ColorManager.normalColor());
            } else {
                this.drawText($gameParty.numItems(item.object()), rect.x + 12, rect.y + 12, 24, "right");
            }
        }
    }

    removeShortcut(): void {
        const actorId = $gameParty.leader().actorId();
        const removed = $shortcutStatus.remove(actorId, this.index());
        if (removed) {
            SoundManager.playCancel();
        }
    }

    processHandling(): void {
        super.processHandling.call(this);
        if (this.isOpenAndActive()) {
            if (this.isHandled("shift") && Input.isTriggered("shift")) {
                return this.processShift();
            }
        }
    }

    protected processShift(): void {
        this.callShiftHandler();
    }

    protected callShiftHandler(): void {
        this.callHandler("shift");
    }
}
