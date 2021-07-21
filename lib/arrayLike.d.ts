export declare namespace NSFuncArrayLike {
    type TLoopFunc<T> = (item: T, index: number, arrLike: ArrayLike<T>) => any;
}
export declare function doLoop<T>(arrLike: ArrayLike<T>, loopFunc: NSFuncArrayLike.TLoopFunc<T>): void;
