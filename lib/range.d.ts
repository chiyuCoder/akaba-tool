export declare namespace NSFuncRange {
    type TValHandle<T> = (item: T, index: number) => number;
    interface IBaseRange {
        min: number;
        max: number;
    }
    interface IBaseSplitInfo {
        min: number;
        max: number;
        splitNumber: number;
    }
    interface IExtraSplitInfo {
        stepHandle: (step: number) => number;
        baseRefer: "min" | "max";
    }
    interface IBaseSplitInfoStep extends IBaseSplitInfo {
        step: number;
    }
    interface IBaseSplitInfoStepTimes extends IBaseSplitInfoStep {
        timesBase: number;
    }
}
export declare function getRangeOfDataList<T>(list: ArrayLike<T>, valHandle?: NSFuncRange.TValHandle<T>): NSFuncRange.IBaseRange;
export declare function getSplitInfoOf(splitInfo: NSFuncRange.IBaseSplitInfo, option?: Partial<NSFuncRange.IExtraSplitInfo>): NSFuncRange.IBaseSplitInfoStep;
export declare function getSplitInfoIntStep(splitInfo: NSFuncRange.IBaseSplitInfo, option?: Partial<NSFuncRange.IExtraSplitInfo>): NSFuncRange.IBaseSplitInfoStep;
export declare function getSplitInfoTimesStep(splitInfo: NSFuncRange.IBaseSplitInfo, option?: Partial<NSFuncRange.IBaseSplitInfoStepTimes>): NSFuncRange.IBaseSplitInfoStep;
