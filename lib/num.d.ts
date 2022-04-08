export declare namespace NSFuncNum {
    type TResultIsMatchFloatFalseReason = "stringLengthMax" | "notLikeNumber" | "fractionStringLengthMax";
    interface IResultIsMatchFloatFalse {
        match: false;
        reason: TResultIsMatchFloatFalseReason;
    }
    interface IResultIsMatchFloatTrue {
        match: true;
    }
    type TResultIsMatchFloat = IResultIsMatchFloatFalse | IResultIsMatchFloatTrue;
}
export declare function floatVal(text: any, nanText: string | number): string | number;
export declare function stringifyNumber(num: number): string;
export declare function intVal(text: any, nanText: string | number): string | number;
export declare function floatNum(text: any, saveNum: number, nanText: string | number): string | number;
export declare function toFixed(text: any, saveNum: number, nanText: string | number): string | number;
export declare function toChineseIndex(num: 0, zeroStr: string): string;
export declare function toChineseIndex(num: number): string;
export declare function isNumberLike(numStr: any): boolean;
export declare function isIntLike(numStr: any): boolean;
export declare function isPositiveInt(numStr: any): boolean;
export declare function isMatchFloat(num: number | string, maxLen?: number, fractionMaxLen?: number): NSFuncNum.TResultIsMatchFloat;
export declare function getNumInRange(obj: {
    num: number;
    min: number;
    max?: number;
}): number;
export declare function getNumInRange(obj: {
    num: number;
    min?: number;
    max: number;
}): number;
export declare function getNumInRange(obj: number, min: number, max?: number): number;
