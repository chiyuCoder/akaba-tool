import {floatVal} from "./num";

export namespace NSFuncArrayLike {
    export type TLoopFunc<T> = (item: T , index: number, arrLike: ArrayLike<T>) => any;

    export interface IRange {
        min: number;
        max: number;
    }
}

export function doLoop<T>(arrLike: ArrayLike<T>, loopFunc: NSFuncArrayLike.TLoopFunc<T>) {
    const len = arrLike.length;
    for (let i = 0; i < len; i ++) {
        const goOn = loopFunc(arrLike[i], i, arrLike);
        if (goOn === false) {
            return;
        }
    }
}

export function getRangeOfList<T>(arrLike: ArrayLike<T>, valueFunc?: (item: T, index: number) => number): NSFuncArrayLike.IRange {
    let min: number = NaN;
    let max: number = NaN;
    doLoop(arrLike, (item, index) => {
       let valNum: number = NaN;
       if (valueFunc) {
           valNum = valueFunc(item, index);
       } else {
           valNum = floatVal(item as any as string, NaN) as number;
       }
       if (isNaN(min) || min > valNum) {
           min = valNum;
       }
       if (isNaN(max) || max < valNum) {
           max = valNum;
       }
    });
    return {
        min,
        max
    };
}
