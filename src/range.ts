import {doLoop} from "./arrayLike";
import { callFunc } from "./func-helper";
import {floatVal} from "./num";
import {optionCopier} from "./OptionCopier";

export namespace NSFuncRange {
    export type TValHandle<T> =  (item: T, index: number) => number;
    export interface IBaseRange  {
        min: number;
        max: number;
    }
    export interface IBaseSplitInfo {
        min: number;
        max: number;
        splitNumber: number;
    }

    export interface IExtraSplitInfo {
        stepHandle: (step: number) => number;
        baseRefer: "min" | "max";
    }

    export interface IBaseSplitInfoStep extends IBaseSplitInfo {
        step: number;
    }


    export interface IBaseSplitInfoStepTimes extends IBaseSplitInfoStep {
        timesBase: number;
    }
}

export function getRangeOfDataList<T>(list: ArrayLike<T>, valHandle?: NSFuncRange.TValHandle<T>): NSFuncRange.IBaseRange {
    let min = NaN;
    let max = NaN;
    let valHandleFunc: NSFuncRange.TValHandle<T>;
    if (typeof valHandle !== "function") {
        valHandleFunc = function (item) {
            return floatVal(item, NaN);
        };
    } else {
        valHandleFunc = valHandle;
    }
    doLoop(list, (valItem, index) => {
        let val: number = valHandleFunc(valItem, index);
        if (isNaN(min) || min > val) {
            min = val;
        }
        if (isNaN(max) || max < val) {
            max = val;
        }
    });
    return {
        min,
        max,
    };
}

export function getSplitInfoOf(splitInfo: NSFuncRange.IBaseSplitInfo, option: Partial<NSFuncRange.IExtraSplitInfo> = {}): NSFuncRange.IBaseSplitInfoStep {
    const baseOption: NSFuncRange.IExtraSplitInfo = {
        stepHandle(step: number) {
            return step;
        },
        baseRefer: "min",
    };
    const resultOption: NSFuncRange.IExtraSplitInfo = optionCopier.mixedOpt(baseOption as any, option);
    let { min, max, splitNumber } = splitInfo;
    let step = resultOption.stepHandle((max - min) / splitNumber);
    if (baseOption.baseRefer === "max") {
        return {
            max,
            min: max - splitNumber * step,
            step,
            splitNumber,
        };
    }
    return {
        min,
        max: min + splitNumber * step,
        splitNumber,
        step,
    };
}

export function getSplitInfoIntStep(splitInfo:  NSFuncRange.IBaseSplitInfo, option: Partial<NSFuncRange.IExtraSplitInfo> = {}): NSFuncRange.IBaseSplitInfoStep {
    let copySplitInfo = optionCopier.copyOptionAsObj(splitInfo);
    copySplitInfo.min = Math.floor(splitInfo.min);
    copySplitInfo.max = Math.ceil(splitInfo.max);
    return getSplitInfoOf(copySplitInfo, optionCopier.mixedOpt({
        stepHandle(step: number) {
            return Math.ceil(step);
        },
    }, option));
}

export function getSplitInfoTimesStep(splitInfo:  NSFuncRange.IBaseSplitInfo, option: Partial<NSFuncRange.IBaseSplitInfoStepTimes> = {}): NSFuncRange.IBaseSplitInfoStep {
    const timesBase = option.timesBase ?? 10;
    let copySplitInfo = optionCopier.copyOptionAsObj(splitInfo as any);
    copySplitInfo.min = Math.floor(splitInfo.min / timesBase) * timesBase;
    copySplitInfo.max = Math.ceil(splitInfo.max / timesBase) * timesBase;
    return getSplitInfoOf(copySplitInfo, optionCopier.mixedOpt({
        stepHandle(step: number) {
            if (step % timesBase) {
                return Math.ceil(step / timesBase) * timesBase;
            }
            return step;
        },
    } as any, option));
}

/**
 * @description 根据给定的参数 `from` 和 `to` 生成数组
 * ```TypeScript 
 * buildRangeList(10)
 * // 等价于
 * buildRangeList(10, 0) 
 * // 等价于
 * buildRangeList(10, 0, 1)
 * // 等价于
 *  buildRangeList(10, {to: 0, step: 1}) 
 * // 返回
 * [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]  
 * // --
 * buildRangeList(10, {step: 2}) 
 * // 等价于
 * buildRangeList(10, 0, 2)
 * // 等价于
 * buildRangeList(0, 10, 2) 
 * // 返回
 * [0, 2, 4, 6, 8]  
 * // -- 
 * buildRangeList(-10, {step: -2}) 
 * // 等价于
 * buildRangeList(-10, 0, -2)
 * // 等价于
 * buildRangeList(0, -10, -2) 
 * // 返回
 * [-10, -8, -6, -4, -2]  
 * @since 1.4.12
 * @param from 
 * @param to -- default is 0(number)
 * @param step 
 * @returns 
 */
export function buildRangeList(
    from: number,
    to: number | Partial<{to: number, step: number}> = 0, 
    step: number = 1
): Array<number> {
    const resultList: Array<number> = [];
    const defaultTo = 0;
    const defaultStep = 1;
    let numTo = callFunc(() => {
        if (typeof to === "object") {
            return to.to ?? defaultTo;
        }
        return to ?? defaultTo;
    });
    const numStep = callFunc(() => {
        if (typeof to === "object") {
            if (typeof to.step === "number") {
                return to.step;
            }
        }
        return step ?? defaultStep;
    });
    if (
        (numStep > 0 && from > numTo) ||
        (numStep < 0 && numTo < from)
    ) {
        [from, numTo] = [numTo, from];
    }
    const stepVal = Math.abs(numStep);
    for (let i = from; i < numTo; i += stepVal) {
        resultList.push(i);
    }
    return resultList;
}
