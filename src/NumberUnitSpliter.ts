import {floatNum, floatVal, toFixed} from "./num";
import {doLoop} from "./arrayLike";

export interface InputSplitReferItem {
  unit: string,
  splitNumber: number,
  compareNumber?: number,
}

export type SplitReferItem = Required<InputSplitReferItem>;

export interface SplitResultItem {
  unit: string,
  intNum: number,
  remain: number,
  splitNumber: number,
}

/**
 * @since 1.3.4
 */
export class NumberUnitSpliter {
  private splitList: Array<SplitReferItem> = [];
  public nanText: string = "-";

  constructor(list?: Array<InputSplitReferItem>) {
    if (list) {
      this.resetList(list);
    }
  }

  public addItem(item: InputSplitReferItem): this {
    let matchItem = this.findByCompareNumber(item.compareNumber ?? item.splitNumber);
    if (matchItem) {
      matchItem.unit = item.unit;
      return this;
    }
    this.splitList.push({
      unit: item.unit,
      splitNumber: item.splitNumber,
      compareNumber: item.compareNumber ?? item.splitNumber,
    });
    NumberUnitSpliter.doSort(this.splitList);
    return this;
  }

  public addItemUnitNumber(unit: string, splitNumber: number, compareNumber?: number): this {
    return this.addItem({
      unit,
      splitNumber,
      compareNumber: compareNumber ?? splitNumber,
    });
  }

  public findByCompareNumber(num: number) : SplitReferItem | null {
    return this.splitList.find((item) => item.compareNumber === num) || null;
  }
  public findBySplitNumber(num: number) : SplitReferItem | null {
    return this.splitList.find((item) => item.splitNumber === num) || null;
  }

  public removeByCompareNumber(num: number): this {
    this.splitList = this.splitList.filter((item) => {
      return item.compareNumber === num;
    });
    return this;
  }
  public removeBySplitNumber(num: number): this {
    this.splitList = this.splitList.filter((item) => {
      return item.splitNumber === num;
    });
    return this;
  }

  public addByList(list: Array<InputSplitReferItem>): this {
    list.forEach((item) => {
      this.addItem(item);
    });
    return this;
  }

  public resetList(list?: Array<InputSplitReferItem>): this {
    let splitList: Array<SplitReferItem> = [];
    if (list) {
      splitList = splitList.concat(NumberUnitSpliter.getCopyList(list));
      NumberUnitSpliter.doSort(splitList);
    }
    this.splitList = splitList;
    return this;
  }

  public clearList(): this {
    this.splitList = [];
    return this;
  }

  public cloneList(): Array<SplitReferItem>  {
    return this.splitList.slice();
  }

  public getFirstMatchItem(num: number): SplitReferItem | null {
    let matchIndex = -1;
    doLoop(this.splitList, (splitItem, index) => {
      if (num >= splitItem.compareNumber) {
        matchIndex = index;
        return false;
      }
    });
    return this.splitList[matchIndex] || null;
  }

  public floatNum(input: any, precise: number = 2): string {
    const strOrNum = floatVal(input, "-");
    if (strOrNum === "-") {
      return this.nanText;
    }
    const matchOne = this.getFirstMatchItem(strOrNum);
    if (matchOne) {
      return floatNum(strOrNum / matchOne.splitNumber, precise, this.nanText).toString() + matchOne.unit;
    }
    return floatNum(strOrNum, precise, "").toString();
  }

  public stringifyAsPreciseNum(input: any, precise: number = 2): string {
    const strOrNum = floatVal(input, "-");
    if (strOrNum === "-") {
      return this.nanText;
    }
    const matchOne = this.getFirstMatchItem(strOrNum);
    if (matchOne) {
      return toFixed(strOrNum / matchOne.splitNumber, precise, this.nanText).toString() + matchOne.unit;
    }
    return toFixed(strOrNum, precise, "").toString();
  }

  public getSplitList(num: number): Array<SplitResultItem> {
    let remain = num;
    const list: Array<SplitResultItem> = [];
    let isContinueLoop = true;
    while(isContinueLoop) {
      let matchOne = this.getFirstMatchItem(remain);
      if (matchOne) {
        let intPart = Math.floor(remain / matchOne.splitNumber);
        remain -= intPart * matchOne.splitNumber;
        list.push({
          remain,
          intNum: intPart,
          splitNumber: matchOne.splitNumber,
          unit: matchOne.unit,
        });
        continue;
      }
      list.push({
        remain,
        intNum: 0,
        splitNumber: 1,
        unit: "",
      });
      isContinueLoop = false;
    }
    return list;
  }

  public stringify(num: number): string {
    const list = this.getSplitList(num);
    return list.map((item, index) => {
      if (index === list.length - 1) {
        return `${item.remain}`;
      }
      return `${item.intNum}${item.unit}`;
    }).join("");
  }

  public static getCopyList(list: Array<InputSplitReferItem>): Array<SplitReferItem> {
    const copyList = list.map((item: InputSplitReferItem): SplitReferItem => {
      return {
        unit: item.unit,
        splitNumber: item.splitNumber,
        compareNumber: item.compareNumber ?? item.splitNumber,
      };
    });
    return copyList;
  }

  public static doSort(list: Array<SplitReferItem>): void {
    list.sort((a, b) => {
      return b.compareNumber - a.compareNumber;
    });
  }
}
