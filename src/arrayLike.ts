export namespace NSFuncArrayLike {
    export type TLoopFunc<T> = (item: T , index: number, arrLike: ArrayLike<T>) => any;
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
