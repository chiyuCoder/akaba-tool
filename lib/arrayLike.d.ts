export declare namespace NSFuncArrayLike {
    type TLoopFunc<T> = (item: T, index: number, arrLike: ArrayLike<T>) => any;
    interface IRange {
        min: number;
        max: number;
    }
    interface IMatchLevelInfo<T> {
        itemArray: Array<T>;
        indexArray: Array<number>;
    }
    interface IMatchLevelOptionDict<T> {
        childrenAttr: keyof T;
        valueAttr: keyof T;
        getIsMatch: (item: T, levelInfo: IMatchLevelInfo<T>) => boolean;
    }
    interface IMatchLevelResult<T> {
        isMatch: boolean;
        itemArray: Array<T>;
        indexArray: Array<number>;
    }
}
export declare function doLoop<T>(arrLike: ArrayLike<T>, loopFunc: NSFuncArrayLike.TLoopFunc<T>): void;
export declare function getRangeOfList<T>(arrLike: ArrayLike<T>, valueFunc?: (item: T, index: number) => number): NSFuncArrayLike.IRange;
export declare function getMatchLevelList<T>(val: string | number, list: ArrayLike<T>, optionDict?: Partial<NSFuncArrayLike.IMatchLevelOptionDict<T>>, levelInfoList?: NSFuncArrayLike.IMatchLevelInfo<T>): {
    isMatch: boolean;
    itemArray: T[];
    indexArray: number[];
};
