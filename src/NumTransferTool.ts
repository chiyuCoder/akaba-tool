import {floatNum, floatVal, intVal, toFixed} from './num';

export class NumTransferTool {
    public defaultSaveNum: number = 2;
    constructor(public defaultNanText: string | number = "") {
    }

    floatVal(text: string | number, nanText: string | number = this.defaultNanText): string | number {
        return floatVal(text, nanText);
    }

    intVal(text: string | number, nanText: string | number = this.defaultNanText): string | number {
        return intVal(text, nanText);
    }

    toFixed(text: string | number, saveNum: number = this.defaultSaveNum,  nanText: string | number = this.defaultNanText): string | number {
        return toFixed(text, saveNum, nanText);
    }

    floatNum(text: string | number, saveNum: number = this.defaultSaveNum,  nanText: string | number = this.defaultNanText): string | number {
        return floatNum(text, saveNum, nanText);
    }
}

export const numTransferTool = new NumTransferTool("-");
