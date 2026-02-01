import { ARPG_ItemShortcutPluginParams } from "./Main";

export class ShortcutStatus {
    private _shortcutInfos: (Game_Item | undefined)[][] = [];
    private _mapItemShortcutEnabled: boolean = true;

    setShortcut(actorId: number, index: number, item: Game_Item) {
        if (this._shortcutInfos[actorId] == null) {
            this._shortcutInfos[actorId] = [];
        }
        this._shortcutInfos[actorId][index] = item;
    }

    shortcut(actorId: number, index: number): Game_Item | undefined {
        if (this._shortcutInfos[actorId] == null) {
            return undefined;
        }
        return this._shortcutInfos[actorId][index];
    }

    numSlots(): number {
        return ARPG_ItemShortcutPluginParams.NumShortcutSlots;
    }

    refresh(): void {
        for (const keyActorId in this._shortcutInfos) {
            for (let i = 0; i < this._shortcutInfos[keyActorId].length; i++) {
                const item = this._shortcutInfos[keyActorId][i];
                if (item && item.isSkill()) {
                    const actor = $gameActors.actor(parseInt(keyActorId));
                    if (actor && !actor.isLearnedSkill(item.itemId())) {
                        this._shortcutInfos[keyActorId][i] = undefined;
                    }
                }
            }
        }
    }

    isEnabledItemShortcut(): boolean {
        if (!$gameMap.isEnabledARPGMode()) return false;
        if (!this._mapItemShortcutEnabled) return false;
        return true;
    }

    enableItemShortcut(): void {
        this._mapItemShortcutEnabled = true;
    }

    disableItemShortcut(): void {
        this._mapItemShortcutEnabled = false;
    }

    clear(actorId: number | undefined) {
        if (actorId == null) {
            for (const keyActorId in this._shortcutInfos) {
                this._shortcutInfos[keyActorId] = [];
            }
        } else {
            this._shortcutInfos[actorId] = [];
        }
    }

    remove(actorId: number, slotIndex: number): boolean {
        if (this._shortcutInfos[actorId][slotIndex] != null) {
            this._shortcutInfos[actorId][slotIndex] = undefined;
            return true;
        }
        return false;
    }

    makeSaveData(): any {
        const saveData: any = {
            shortcutInfos: {},
            mapItemShortcutEnabled: this._mapItemShortcutEnabled,
        };
        for (const keyActorId in this._shortcutInfos) {
            const infos = this._shortcutInfos[keyActorId];
            saveData.shortcutInfos[keyActorId] = [];
            for (let i = 0; i < this.numSlots(); i++) {
                const info = infos[i];
                if (info) {
                    let infoData: any = {};
                    if (info.isSkill()) {
                        infoData.dataClass = "skill";
                    } else {
                        infoData.dataClass = "item";
                    }
                    infoData.itemId = info.itemId();
                    saveData.shortcutInfos[keyActorId].push(infoData);
                } else {
                    saveData.shortcutInfos[keyActorId].push(null);
                }
            }
        }
        return saveData;
    }

    loadSaveData(saveData: any): void {
        if (typeof saveData.shortcutInfos !== "undefined") {
            this.loadSaveData_V1_3_1(saveData);
        } else {
            this.loadSaveData_V1_3_0(saveData);
        }
    }

    loadSaveData_V1_3_0(saveData: any): void {
        for (const keyActorId in saveData) {
            const actorId = parseInt(keyActorId);
            const infoDatas = saveData[keyActorId];
            this._shortcutInfos[actorId] = [];
            infoDatas.forEach((infoData: any, i: number) => {
                if (infoData) {
                    let item = new Game_Item();
                    if (infoData.dataClass === "skill") {
                        item.setObject($dataSkills[infoData.itemId]);
                    } else {
                        item.setObject($dataItems[infoData.itemId]);
                    }
                    this._shortcutInfos[actorId][i] = item;
                }
            });
        }
    }

    loadSaveData_V1_3_1(saveData: any): void {
        for (const keyActorId in saveData.shortcutInfos) {
            const actorId = parseInt(keyActorId);
            const infoDatas = saveData.shortcutInfos[keyActorId];
            this._shortcutInfos[actorId] = [];
            infoDatas.forEach((infoData: any, i: number) => {
                if (infoData) {
                    let item = new Game_Item();
                    if (infoData.dataClass === "skill") {
                        item.setObject($dataSkills[infoData.itemId]);
                    } else {
                        item.setObject($dataItems[infoData.itemId]);
                    }
                    this._shortcutInfos[actorId][i] = item;
                }
            });
        }
        this._mapItemShortcutEnabled = saveData.mapItemShortcutEnabled;
    }
}
