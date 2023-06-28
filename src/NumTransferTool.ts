import {floatNum, floatVal, intVal, toFixed} from "./num";

export class NumTransferTool {
    public defaultSaveNum = 2;
    constructor(public defaultNanText: string | number = "") {
    }

    floatVal(text: unknown, nanText?: string | number): string | number {
        return floatVal(text, nanText ?? this.defaultNanText);
    }

    intVal(text: unknown, nanText?: string | number): string | number {
        return intVal(text, nanText ?? this.defaultNanText);
    }

    toFixed(text: unknown, saveNum: number = this.defaultSaveNum,  nanText?: string | number): string {
        return toFixed(text, saveNum, (nanText ?? this.defaultNanText) as string);
    }

    floatNum(text: unknown, saveNum: number = this.defaultSaveNum,  nanText?: string | number): string | number {
        return floatNum(text, saveNum, nanText ?? this.defaultNanText);
    }
}

export const numTransferTool = new NumTransferTool("-");
