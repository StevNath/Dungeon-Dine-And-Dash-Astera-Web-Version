export class ShortcutTempData {
    private _itemMenuSelectIndex: number = 0;
    private _skillMenuSelectIndex: number = 0;
    private _mapSelectIndex: number = 0;
    private _refreshShortcutWindowRequest: boolean = false;
    private _useShortcutItemRequest: boolean = false;

    get itemMenuSelectIndex() { return this._itemMenuSelectIndex; }
    set itemMenuSelectIndex(value) { this._itemMenuSelectIndex = value; }
    get skillMenuSelectIndex() { return this._skillMenuSelectIndex; }
    set skillMenuSelectIndex(value) { this._skillMenuSelectIndex = value; }
    get mapSelectIndex() { return this._mapSelectIndex; }
    set mapSelectIndex(value) { this._mapSelectIndex = value; }

    checkRefreshShortcutWindowRequest(): boolean {
        let result = this._refreshShortcutWindowRequest;
        this._refreshShortcutWindowRequest = false;
        return result;
    }

    requestRefreshShortcutWindow(): void {
        this._refreshShortcutWindowRequest = true;
    }

    requestUseShortcutItem(): void {
        this._useShortcutItemRequest = true;
    }

    checkUseShortcutItemRequested(): boolean {
        if (this._useShortcutItemRequest) {
            this._useShortcutItemRequest = false;
            return true;
        }
        return false;
    }
}
