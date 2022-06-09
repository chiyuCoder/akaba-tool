import {floatVal} from "./num";
import {mixedOpt} from "./option";

export namespace NSFuncArrayLike {
  export type TLoopFunc<T> = (item: T , index: number, arrLike: ArrayLike<T>) => any;

  export interface IRange {
    min: number;
    max: number;
  }

  export interface IMatchLevelInfo<T> {
    itemArray: T[],
    indexArray: number[],
  }

  export interface IMatchLevelOptionDict<T> {
    childrenAttr: keyof T,
    valueAttr: keyof T,
    getIsMatch: (item: T, levelInfo: IMatchLevelInfo<T>) => boolean,
  }

  export interface IMatchLevelResult<T> {
    isMatch: boolean,
    itemArray: T[],
    indexArray: number[],
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

export function getMatchLevelList<T>(
  val: string | number,
  list: ArrayLike<T>,
  optionDict: Partial<NSFuncArrayLike.IMatchLevelOptionDict<T>> = {},
  levelInfoList: NSFuncArrayLike.IMatchLevelInfo<T> = { itemArray: [], indexArray: [] }
) {
  const defaultOptionDict: NSFuncArrayLike.IMatchLevelOptionDict<T> = {
    childrenAttr: "children",
    valueAttr: "value",
  } as NSFuncArrayLike.IMatchLevelOptionDict<T>;
  const option: NSFuncArrayLike.IMatchLevelOptionDict<T> = mixedOpt(defaultOptionDict, optionDict);
  if (!(option as any).getIsMatch) {
    option.getIsMatch = function (item) {
      return (item as any)[option.valueAttr] === val;
    }
  }
  let isMatch = false;
  let itemArray: T[] = [];
  let indexArray: number[] = [];
  doLoop(list, (item, index) => {
    const areaItem: any = item;
    itemArray = levelInfoList.itemArray.slice();
    indexArray = levelInfoList.indexArray.slice();
    itemArray.push(item);
    indexArray.push(index);
    if (option.getIsMatch(areaItem, {
      itemArray,
      indexArray,
    })) {
      isMatch = true;
      return false;
    }
    const children = areaItem[option.childrenAttr] as ArrayLike<T>;
    if (children && children.length) {
      const matchResult = getMatchLevelList(val, children, option, {
        itemArray,
        indexArray,
      });
      if (matchResult.isMatch) {
        itemArray = matchResult.itemArray;
        indexArray = matchResult.indexArray;
        isMatch = matchResult.isMatch;
        return false;
      }
    }
    itemArray = [];
    indexArray = [];
  });
  return {
    isMatch,
    itemArray,
    indexArray,
  };
}
