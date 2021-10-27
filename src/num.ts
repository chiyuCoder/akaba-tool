export namespace NSFuncNum {
    export type TResultIsMatchFloatFalseReason = "stringLengthMax" | "notLikeNumber" | "fractionStringLengthMax";

    export interface IResultIsMatchFloatFalse {
        match: false,
        reason: TResultIsMatchFloatFalseReason,
    }
    export interface IResultIsMatchFloatTrue {
        match: true,
    }

    export type TResultIsMatchFloat = IResultIsMatchFloatFalse | IResultIsMatchFloatTrue;
}

function showNum(text: number, nanText: string | number): string | number {
    if (isNaN(text)) {
        return nanText;
    }
    return text;
}

export function floatVal(text: string | number, nanText: string | number): string | number {
    const num = parseFloat(text as string);
    return showNum(num, nanText);
}

export function intVal(text: string | number, nanText: string | number): string | number {
    const num = parseInt(text as string);
    return showNum(num, nanText);
}

export function floatNum(text: string | number, saveNum: number, nanText: string | number) {
    let num = parseFloat(text as string);
    if (isNaN(num)) {
        return nanText;
    }
    return Math.round(num * Math.pow(10, saveNum)) / Math.pow(10, saveNum);
}

export function toFixed(text: string | number, saveNum: number, nanText: string | number): string | number {
    const tmpNan = "isNaN";
    let numStr = floatNum(text as string, saveNum, tmpNan);
    if (numStr === tmpNan) {
        return nanText;
    }
    let [intPart, fractionPart] = numStr.toString().split(".");
    if (!intPart) {
        intPart = '0';
    }
    fractionPart = fractionPart || '';
    if (fractionPart.length < saveNum) {
        fractionPart = fractionPart.padEnd(saveNum, "0");
    } else if (fractionPart.length > saveNum) {
        const referNum = parseInt(fractionPart.slice(0, saveNum));
        const referNumStep = parseInt(fractionPart.slice(saveNum, saveNum + 1));
        if (referNumStep >= 5) {
            fractionPart = (referNum + 1).toString();
        } else {
            fractionPart = referNum.toString();
        }
    }
    return [intPart, fractionPart].join(".");
}

export function cryptoRandInt(min: number, max: number = 0) {
    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.floor(cryptoRandom() * (max - min) + min);
}
export const winCrypto = window.crypto || (window as any).webkitCrypto ||  (window as any).msCrypto;
const max = 2 ** 16 - 1;
export function cryptoRandom(): number {
    const array = new Uint16Array(1);
    winCrypto.getRandomValues(array);
    const num = array[0] / max;
    if (num === 1) {
        return 0;
    }
    return num;
}

export function toChineseIndex(num: 0, zeroStr: string): string
export function toChineseIndex(num: number): string
export function toChineseIndex(num: number, zeroStr: string = '零'): string {
    const list = [
        zeroStr,
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九',
        '十',
        '百',
        '千',
        '万',
        '亿',
    ];
    return list[num];
}

export function isNumberLike(numStr: any) {
    if (typeof numStr === "string" || typeof numStr === "number") {
        return /^[+-]?(\d+(\.\d+)?|\.\d+)$/.test(numStr.toString());
    }
    return false;
}

export function isIntLike(numStr: any) {
    if (typeof numStr === "string" || typeof numStr === "number") {
        return /^([+-])?(\d+)$/.test(numStr.toString());
    }
    return false;
}

export function isPositiveInt(numStr: any) {
    if (typeof numStr === "string" || typeof numStr === "number") {
        return /^\+?\d+$/.test(numStr.toString());
    }
    return false;
}

export function isMatchFloat(num: number | string, maxLen: number = 10, fractionMaxLen: number = 2): NSFuncNum.TResultIsMatchFloat {
    const str = num.toString();
    if (isNumberLike(str)) {
        if (str.length > maxLen) {
            return {
                match: false,
                reason: "stringLengthMax",
            };
        }
        const [intPart, fractionPart] = str.split(".");
        if ((fractionPart || '').length > fractionMaxLen) {
            return {
                match: false,
                reason: "fractionStringLengthMax",
            };
        }
        return {
            match: true,
        };
    }
    return {
        match: false,
        reason: "notLikeNumber"
    };
}

export function getNumInRange(obj: {num: number, min: number, max?: number}): number
export function getNumInRange(obj: {num: number, min?: number, max: number}): number
export function getNumInRange(obj: number, min: number, max?: number): number
export function getNumInRange(obj: {num: number, min: number, max?: number} | {num: number, min?: number, max: number} | number, min?:number, max?:number): number {
    let num: number;
    if (typeof obj === "object") {
        min = obj.min;
        max = obj.max;
        num = obj.num;
    } else {
        num = obj;
    }
    let minNum = min as number;
    let maxNum = max as number;
    if (!isNaN(minNum) && minNum > num) {
        return minNum;
    }
    if (!isNaN(maxNum) && maxNum < num) {
        return maxNum;
    }
    return num;
}
