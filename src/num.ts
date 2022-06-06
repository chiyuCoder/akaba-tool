
export namespace NSFuncNum {
    export type TResultIsMatchFloatFalseReason = "stringLengthMax" | "notLikeNumber" | "fractionStringLengthMax" | "intStringLengthMax";

    export interface IResultIsMatchFloatFalse {
        match: false,
        reason: TResultIsMatchFloatFalseReason,
    }
    export interface IResultIsMatchFloatTrue {
        match: true,
    }

    export type TResultIsMatchFloat = IResultIsMatchFloatFalse | IResultIsMatchFloatTrue;
}

function showNum(text: any, nanText: string | number): string | number {
    if (isNaN(text)) {
        return nanText;
    }
    return text;
}

export function floatVal(text: any, nanText: string | number): string | number {
    const num = parseFloat(text as string);
    return showNum(num, nanText);
}

export function stringifyNumber(num: number): string {
    const numStr = num.toString();
    if (numStr.indexOf("e") >= 0) {
        let arr = numStr.split("e");
        let powerPart = -parseInt(arr[1]);
       if (powerPart > 0) {
           let numPartStr = arr[0];
           let numPartArr = numPartStr.split(".");
           let numIntPart = numPartArr[0];
           let numFractionPart = numPartArr[1] || "";
           let resultStr: string;
           const intLen = numIntPart.length;
           if (intLen <= powerPart) {
               resultStr = "0." + numIntPart.padStart(powerPart, "0");
           } else {
               let sepIndex = intLen - powerPart;
               resultStr = numIntPart.slice(0, sepIndex) + "." + numIntPart.slice(sepIndex);
           }
           return resultStr + numFractionPart;
       }
    }
    return numStr;
}

export function intVal(text: any, nanText: string | number): string | number {
    if (typeof text === "number") {
        if (text <= 1e-7) {
            return 0;
        }
    }
    const num = parseInt(text as string);
    return showNum(num, nanText);
}

export function floatNum(text: any, saveNum: number, nanText: string | number): string | number {
    let num = parseFloat(text as string);
    if (isNaN(num)) {
        return nanText;
    }
    return Math.round(num * Math.pow(10, saveNum)) / Math.pow(10, saveNum);
}

export function toFixed(text: any, saveNum: number, nanText: string | number): string | number {
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
        const intNum = parseInt(intPart);
        if (intNum > 0 && referNumStep >= 5) {
            fractionPart = (referNum + 1).toString();
        } else {
            fractionPart = referNum.toString();
        }
    }
    return [intPart, fractionPart].join(".");
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

export function isPositiveNumber(numLikeStr: any): boolean {
    if (typeof numLikeStr === "string" || typeof numLikeStr === "number") {
        return /^\+?\d+(\.\d+)?$/.test(numLikeStr.toString());
    }
    return false;
}

export function isMatchFloat(num: number | string, maxLen: number = 10, fractionMaxLen: number = 2, isLimitInt: boolean = true): NSFuncNum.TResultIsMatchFloat {
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
        if (isLimitInt && (intPart || "").length > (maxLen - fractionMaxLen)) {
            return  {
                match: false,
                reason: "intStringLengthMax",
            }
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

export function isConstraintNum(num: any, maxIntPartLen: number = 18, maxFractionLen: number = 2) {
    const str = `^(\\d{1,${maxIntPartLen}})(?:\\.\\d{1,${maxFractionLen}})?$`;
    const reg = new RegExp(str);
    return reg.test(num.toString());
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
