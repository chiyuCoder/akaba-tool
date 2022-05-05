import {doLoop} from "./arrayLike";
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
        baseRefer: 'min' | 'max';
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
        valHandleFunc = function (item, index) {
            return floatVal(item as any as number, 0) as number;
        }
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
        baseRefer: 'min',
    };
    const resultOption: NSFuncRange.IExtraSplitInfo = optionCopier.mixedOpt(baseOption as any, option);
    let { min, max, splitNumber } = splitInfo;
    let step = resultOption.stepHandle((max - min) / splitNumber);
    if (baseOption.baseRefer === 'max') {
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
    let copySplitInfo = optionCopier.copyOptionAsObj(splitInfo as any);
    copySplitInfo.min = Math.floor(splitInfo.min);
    copySplitInfo.max = Math.ceil(splitInfo.max);
    return getSplitInfoOf(copySplitInfo, optionCopier.mixedOpt({
        stepHandle(step: number) {
            return Math.ceil(step);
        }
    } as any, option));
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
