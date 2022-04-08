export declare namespace NSFuncArrayLike {
    type TLoopFunc<T> = (item: T, index: number, arrLike: ArrayLike<T>) => any;
    interface IRange {
        min: number;
        max: number;
    }
}
export declare function doLoop<T>(arrLike: ArrayLike<T>, loopFunc: NSFuncArrayLike.TLoopFunc<T>): void;
export declare function getRangeOfList<T>(arrLike: ArrayLike<T>, valueFunc?: (item: T, index: number) => number): NSFuncArrayLike.IRange;
