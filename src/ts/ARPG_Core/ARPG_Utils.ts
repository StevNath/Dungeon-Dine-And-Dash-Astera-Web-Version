import { IPluginParams_Key } from "ARPG_Config";
import { Degree } from "../CommonLibrary/Degree";

export class ARPG_Utils {
    static _keyTable: { [key: string]: string | undefined } = {};

    static searchNearBattler(subjectCharacter: Game_Character, target: "all" | "opponent" | "friend"): { character: Game_Character | undefined, far: number } {
        if (!subjectCharacter.isBattler()) throw new Error(`Subject character is not battler.`);
        const actorCharacters = this.allAliveActorCharacters();
        const enemyCharacters = this.allAliveEnemyCharacters();
        if (target === "opponent") {
            if (subjectCharacter.battler().isActor()) {
                return this.searchNearCharacter(subjectCharacter, enemyCharacters);
            } else {
                return this.searchNearCharacter(subjectCharacter, actorCharacters);
            }
        } else if (target === "friend") {
            if (subjectCharacter.battler().isActor()) {
                return this.searchNearCharacter(subjectCharacter, actorCharacters);
            } else {
                return this.searchNearCharacter(subjectCharacter, enemyCharacters);
            }
        } else {
            return this.searchNearCharacter(subjectCharacter, actorCharacters.concat(enemyCharacters));
        }
    }

    private static searchNearCharacter(subjectCharacter: Game_Character, targetCharacters: Game_Character[]): { character: Game_Character | undefined, far: number } {
        let minFar;
        let minFarCharacter;
        for (const targetCharacter of targetCharacters) {
            if (targetCharacter == subjectCharacter) continue;
            const far = subjectCharacter.calcFar(targetCharacter);
            if (minFar == null || far <= minFar) {
                minFar = far;
                minFarCharacter = targetCharacter;
            }
        }
        if (minFar == null) minFar = 0;
        return { character: minFarCharacter, far: minFar };
    }

    static countEnemies() {
        const enemyCharacters = $gameMap.events().filter(event => {
            return event.battler().isEnemy() && event.battler().isAlive();
        });
        return enemyCharacters.length;
    }

    static isFront(subject: Game_Character, target: Game_Character, range: number) {
        const deg = subject.centerPositionPoint().calcDeg(target.centerPositionPoint());
        const dirDeg = Degree.fromDirection(subject.direction());
        const minDeg = dirDeg.value - range / 2;
        const maxDeg = dirDeg.value + range / 2;
        return new Degree(deg.value).isInRange(minDeg, maxDeg);
    }

    static hasActionItem(item: RMMZData.Item) {
        if (item == null) return false;
        return !!(item as any).meta.action;
    }

    static allBattlerCharacters(): Game_Character[] {
        const allCharacters = [...$gameMap.allCharacters()];
        return allCharacters.filter(character => {
            if (!(character instanceof Game_Character)) return false;
            if (!character.isBattler()) return false;
            return true;
        }) as Game_Character[];
    }

    static allAliveBattlerCharacters(): Game_Character[] {
        return this.allBattlerCharacters().filter(character => {
            if (character.battler().isDead()) return false;
            return true;
        });
    }

    static allActorCharacters(): Game_Character[] {
        return this.allBattlerCharacters().filter(character => {
            if (!character.battler().isActor()) return false;
            return true;
        });
    }

    static allAliveActorCharacters(): Game_Character[] {
        return this.allAliveBattlerCharacters().filter(character => {
            if (!character.battler().isActor()) return false;
            return true;
        });
    }

    static allEnemyCharacters(): Game_Character[] {
        return this.allBattlerCharacters().filter(character => {
            if (!character.battler().isEnemy()) return false;
            return true;
        });
    }

    static allAliveEnemyCharacters(): Game_Character[] {
        return this.allAliveBattlerCharacters().filter(character => {
            if (!character.battler().isEnemy()) return false;
            return true;
        });
    }

    static searchSkillId(skillName: string): number | undefined {
        const foundSkill = $dataSkills.find(skill => {
            if (!skill) return false;
            return skill.name === skillName;
        });
        if (foundSkill) return foundSkill.id;
        return undefined;
    }

    static characterKindValue(character: Game_Character): number {
        if (character instanceof Game_Player) {
            return 1;
        } else if (character instanceof Game_Follower) {
            return 2;
        } else if (character instanceof Game_Event) {
            return 3;
        } else if (character instanceof Game_Vehicle) {
            return 4;
        }
        throw new Error(`Character has not kind value.`);
    }

    static registerKey(name: string, key: IPluginParams_Key): void {
        switch (key.KeyName) {
            case "ok":
            case "escape":
            case "menu":
            case "shift":
            case "down":
            case "left":
            case "right":
            case "up":
            case "pageup":
            case "pagedown":
                this._keyTable[name] = key.KeyName;
                break;
            case "other":
                if (key.KeySymbol != null && key.KeySymbol !== "") {
                    this._keyTable[name] = key.KeySymbol;
                    if (key.KeyCodes) {
                        for (const keyCode of key.KeyCodes) {
                            Input.keyMapper[keyCode] = key.KeySymbol;
                        }
                    }
                    if (key.ButtonIndexes) {
                        for (const buttonIndex of key.ButtonIndexes) {
                            Input.gamepadMapper[buttonIndex] = key.KeySymbol;
                        }
                    }
                    if (key.KeyCode >= 0) {
                        Input.keyMapper[key.KeyCode] = key.KeySymbol;
                    }
                    if (key.ButtonIndex >= 0) {
                        Input.gamepadMapper[key.ButtonIndex] = key.KeySymbol;
                    }
                }
                break;
        }
    }

    static getKeySymbol(name: string): string | undefined {
        return this._keyTable[name];
    }

    // NOTE: シーンの状態を問わずアクターの変更が可能かを判定する。
    //       そのためシーン固有の状態によるアクター変更可否はシーンの方で判定が必要。
    static isChangeActorEnabled(): boolean {
        if ($gamePlayer.isBattler()) {
            if ($gamePlayer.battler().isDamageReceiving()) return false;
            if ($gamePlayer.battler().isSkillUsing()) return false;
        }
        return true;
    }

    static itemAttackElementIds(item: RMMZData.Item): number[] {
        const allElements = $dataSystem.elements;
        let elementIds = new Set<number>();
        if (item.damage.elementId >= 0) elementIds.add(item.damage.elementId);

        for (const matchData of item.note.matchAll(/\<damageElement\s*\:\s*(.+)\s*\>/g)) {
            if (matchData && matchData[1]) {
                const elementName = matchData[1];
                for (let i = 0; i < allElements.length; i++) {
                    if (allElements[i] === elementName) {
                        elementIds.add(i);
                        break;
                    }
                }
            }
        }

        return [...elementIds];
    }
}
