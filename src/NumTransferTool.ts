import {floatNum, floatVal, intVal, toFixed} from './num';

export class NumTransferTool {
    public defaultSaveNum: number = 2;
    constructor(public defaultNanText: string | number = "") {
    }

    floatVal(text: string | number, nanText?: string | number): string | number {
        return floatVal(text, nanText ?? this.defaultNanText);
    }

    intVal(text: string | number, nanText?: string | number): string | number {
        return intVal(text, nanText ?? this.defaultNanText);
    }

    toFixed(text: string | number, saveNum: number = this.defaultSaveNum,  nanText?: string | number): string | number {
        return toFixed(text, saveNum, nanText ?? this.defaultNanText);
    }

    floatNum(text: string | number, saveNum: number = this.defaultSaveNum,  nanText?: string | number): string | number {
        return floatNum(text, saveNum, nanText ?? this.defaultNanText);
    }
}

export const numTransferTool = new NumTransferTool("-");
