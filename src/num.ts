export namespace NSFuncNum {
  export type TResultIsMatchFloatFalseReason =
    "stringLengthMax"
    | "notLikeNumber"
    | "fractionStringLengthMax"
    | "intStringLengthMax";

  export interface IResultIsMatchFloatFalse {
    match: false,
    reason: TResultIsMatchFloatFalseReason,
  }

  export interface IResultIsMatchFloatTrue {
    match: true,
  }

  export type TResultIsMatchFloat = IResultIsMatchFloatFalse | IResultIsMatchFloatTrue;
}

/**
 * @version 1.3.4 更新类名 (update function name)
 * @param text
 * @param nanText
 */
function showNum<T extends string | number>(text: any, nanText: T): T | number {
  if (isNaN(text)) {
    return nanText;
  }
  return text;
}

/**
  * parseFloat 的 TypeScript 版本  
  * ```TypeScript
  * floatVal(null,'-') === "-"  // 返回 true
  * floatVal(undefined,'-') === "-"  // 返回 true
  * floatVal(NaN,'-') === "-"  // 返回 true
  * floatVal(0, "-") === 0  // 返回 true
  * floatVal("0", "-") === 0  // 返回 true
  * floatVal("0px", "-") === 0  // 返回 true
  * floatVal("1e", "-") === 1  // 返回 true
  * floatVal("1e-9", "-") === 1e-9  // 返回 true
  * floatVal(1e-9, "-") === 1e-9  // 返回 true
  * floatVal("1.2300px", "-") === 1.23  // 返回 true
  * floatVal("1.2300", "-") === 1.23  // 返回 true
  * ```
 * @since 1.3.4 更新类名 (update function name)
 * @param text
 * @param nanText
 */
export function floatVal<T extends string | number>(text: any, nanText: T): T | number {
  const num = parseFloat(text as string);
  return showNum(num, nanText);
}

export function stringifyNumber(num: number): string {
  const numStr = num.toString();
  if (numStr.indexOf("e") >= 0) {
    let arr = numStr.split("e");
    let powerPart = -parseInt(arr[1]);
    if (powerPart > 0) {
      let numPartStr = arr[0];
      let numPartArr = numPartStr.split(".");
      let numIntPart = numPartArr[0];
      let numFractionPart = numPartArr[1] || "";
      let resultStr: string;
      const intLen = numIntPart.length;
      if (intLen <= powerPart) {
        resultStr = "0." + numIntPart.padStart(powerPart, "0");
      } else {
        let sepIndex = intLen - powerPart;
        resultStr = numIntPart.slice(0, sepIndex) + "." + numIntPart.slice(sepIndex);
      }
      return resultStr + numFractionPart;
    }
  }
  return numStr;
}

/** 
 * parseInt 的 TypeScript 版本  
 * ```TypeScript
 * intVal(null,'-') === "-"  // 返回 true
 * intVal(undefined,'-') === "-"  // 返回 true
 * intVal(NaN,'-') === "-"  // 返回 true
 * intVal(0, "-") === 0  // 返回 true
 * intVal("0", "-") === 0  // 返回 true
 * intVal("0px", "-") === 0  // 返回 true
 * intVal("1e", "-") === 1  // 返回 true
 * intVal("1e-9", "-") === 1  // 返回 true
 * intVal(1e-9, "-") === 0  // 返回 true
 * ```
 * @since 1.3.4 更新类名 (update function name)
 * @param text
 * @param nanText
 */
export function intVal<T  extends string | number>(text: any, nanText: T): T | number {
  if (typeof text === "number") {
    if (text <= 1e-7) {
      return 0;
    }
  }
  const num = parseInt(text as string);
  return showNum(num, nanText);
}

/**
 * parseFloat 然后根据 saveNum 四舍五入之后的数字
 * ```TypeScript
 * floatNum(null, 2, '-') === "-"  // 返回 true
 * floatNum(undefined, 2, '-') === "-"  // 返回 true
 * floatNum(NaN, 2, '-') === "-"  // 返回 true
 * floatNum(0, 2, '-') === 0  // 返回 true
 * floatNum("0", 2, '-') === 0  // 返回 true
 * floatNum("0px", 2, '-') === 0  // 返回 true
 * floatNum("1e-9", 2, '-') === 0  // 返回 true
 * floatNum(1e-9, 2, '-') === 0  // 返回 true
 * floatNum("1e", 2, '-') === 1  // 返回 true
 * floatNum("1.2300px", 2, '-') === 1.23  // 返回 true
 * floatNum("1.2300", 2, '-') === 1.23  // 返回 true
 * floatNum("1.2340", 2, '-') === 1.23 // 返回 true
 * floatNum("1.2350", 2, '-') === 1.24 // 返回 true
 * ```
 * @param text
 * @param saveNum
 * @param nanText
 */
export function floatNum<T>(text: any, saveNum: number, nanText: T): T | number {
  let num = parseFloat(text as string);
  if (isNaN(num)) {
    return nanText;
  }
  return Math.round(num * Math.pow(10, saveNum)) / Math.pow(10, saveNum);
}

/**
 *  parseFloat 然后根据 saveNum 四舍五入之后的数字 (fixedVal 函数的别名)
 * ``` TypeScript
 *  fixedVal(null, 2, '-') === "-"  // 返回 true
 *  fixedVal(undefined, 2, '-') === "-"  // 返回 true
 *  fixedVal(NaN, 2, '-') === "-"  // 返回 true
 *  fixedVal(0, 2, '-') === "0.00"  // 返回 true
 *  fixedVal("0", 2, '-') === "0.00"  // 返回 true
 *  fixedVal("0px", 2, '-') === "0.00"  // 返回 true
 *  fixedVal("1e-9", 2, '-') === "0.00"  // 返回 true
 *  fixedVal(1e-9, 2, '-') === "0.00"  // 返回 true
 *  fixedVal("1e", 2, '-') === "1.00"  // 返回 true
 *  fixedVal("1.2300px", 2, '-') === "1.23"  // 返回 true
 *  fixedVal("1.2300", 2, '-') === "1.23"  // 返回 true
 *  fixedVal("1.2340", 2, '-') === "1.23"  // 返回 true
 *  fixedVal("1.2350", 2, '-') === "1.24"  // 返回 true
 *  fixedVal(-1.2, 2, "") === "-1.20"  // 返回 true
 *  fixedVal(1.204, 2, "") === "1.20"  // 返回 true
 *  fixedVal(1.205, 2, "") === "-1.21"  // 返回 true
 *  fixedVal(-1.204, 2, "") === "-1.20"  // 返回 true
 *  fixedVal(-1.205, 2, "") === "-1.21"  // 返回 true
 * ```
 * @since 1.3.4
 * @param text
 * @param saveNum
 * @param nanText
 */
export function toFixed(text: any, saveNum: number, nanText: string): string {
  return fixedVal(text, saveNum, nanText);
}

/**
 *  parseFloat 然后根据 saveNum 四舍五入之后的数字
 * ``` TypeScript
 *  fixedVal(null, 2, '-') === "-"  // 返回 true
 *  fixedVal(undefined, 2, '-') === "-"  // 返回 true
 *  fixedVal(NaN, 2, '-') === "-"  // 返回 true
 *  fixedVal(0, 2, '-') === "0.00"  // 返回 true
 *  fixedVal("0", 2, '-') === "0.00"  // 返回 true
 *  fixedVal("0px", 2, '-') === "0.00"  // 返回 true
 *  fixedVal("1e-9", 2, '-') === "0.00"  // 返回 true
 *  fixedVal(1e-9, 2, '-') === "0.00"  // 返回 true
 *  fixedVal("1e", 2, '-') === "1.00"  // 返回 true
 *  fixedVal("1.2300px", 2, '-') === "1.23"  // 返回 true
 *  fixedVal("1.2300", 2, '-') === "1.23"  // 返回 true
 *  fixedVal("1.2340", 2, '-') === "1.23"  // 返回 true
 *  fixedVal("1.2350", 2, '-') === "1.24"  // 返回 true
 *  fixedVal(-1.2, 2, "") === "-1.20"  // 返回 true
 *  fixedVal(1.204, 2, "") === "1.20"  // 返回 true
 *  fixedVal(1.205, 2, "") === "-1.21"  // 返回 true
 *  fixedVal(-1.204, 2, "") === "-1.20"  // 返回 true
 *  fixedVal(-1.205, 2, "") === "-1.21"  // 返回 true
 * ```
 * @param text
 * @param saveNum
 * @param nanText
 * @returns
 */
export function fixedVal(text: any, saveNum: number, nanText: string): string {
  const tmpNan = "isNaN";
  let numStr = floatVal(text as string, tmpNan);
  if (numStr === tmpNan) {
    return nanText;
  }
  let fixedNum = (numStr as number).toFixed(saveNum);
  let [intPart, fractionPart] = fixedNum.split(".");
  if (!intPart) {
    intPart = "0";
  }
  fractionPart = fractionPart || "";
  if (fractionPart.length > saveNum) {
    const referNum = parseInt(fractionPart.slice(0, saveNum));
    const referNumStep = parseInt(fractionPart.slice(saveNum, saveNum + 1));
    if (referNumStep >= 5) {
      fractionPart = (referNum + 1).toString();
    } else {
      fractionPart = referNum.toString();
    }
  }
  return [intPart, fractionPart].join(".");
}

/**
 * @description 依据索引值取对应汉字  
 * ```TypeScript
 * [`${zeroStr}`,"一","二","三","四","五","六","七","八","九","十","百","千","万","亿"][num]
 * ``` 
 * @param num 
 * @param zeroStr 
 */
export function toChineseIndex(num: 0, zeroStr?: string): string
export function toChineseIndex(num: number): string
export function toChineseIndex(num: number, zeroStr: string = "零"): string {
  const list = [
    zeroStr,
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "百",
    "千",
    "万",
    "亿",
  ];
  return list[num];
}

/**
 * @description 判断给定的 $numStr 是否符合数字格式   
 * -- isNumberLike(103) 返回 true   
 * -- isNumberLike(-103) 返回 true   
 * -- isNumberLike(+103) 返回 true   
 * -- isNumberLike("+103") 返回 true   
 * -- isNumberLike("-103") 返回 true   
 * -- isNumberLike(+1e3) 返回 true   
 * -- isNumberLike(-1e3) 返回 true   
 * -- isNumberLike("1e3") 返回 false    
 * -- isNumberLike(0.001) 返回 true  
 * -- isNumberLike(-0.001) 返回 true  
 * -- isNumberLike(+0.001) 返回 true  
 * -- isNumberLike("0.001") 返回 true  
 * -- isNumberLike("-0.001") 返回 true  
 * -- isNumberLike("+0.001") 返回 true  
 * -- isNumberLike("+.001") 返回 true  
 * -- isNumberLike(".001") 返回 true  
 * -- isNumberLike(1e-3) 返回 true  
 * -- isNumberLike("1e-3") 返回 false  
 * -- isNumberLike("1e") 返回 false  
 * -- isNumberLike("1px") 返回 false  
 * -- isNumberLike(null) 返回 false  
 * -- isNumberLike(undefined) 返回 false  
 * -- isNumberLike(NaN) 返回 false  
 * @param numStr 
 * @returns 
 */
export function isNumberLike(numStr: any) {
  if (typeof numStr === "string" || typeof numStr === "number") {
    return /^[+-]?(\d+(\.\d+)?|\.\d+)$/.test(numStr.toString());
  }
  return false;
}

/**
 * @description 判断给定的 $numStr 是否符合整数数字格式 
 * -- isIntLike(103) 返回 true   
 * -- isIntLike(103.00) 返回 true   
 * -- isIntLike('103.00') 返回 false   
 * -- isIntLike(103.01) 返回 false   
 * -- isIntLike(-103) 返回 true   
 * -- isIntLike(+103) 返回 true   
 * -- isIntLike("+103") 返回 true   
 * -- isIntLike("-103") 返回 true   
 * -- isIntLike(+1e3) 返回 true   
 * -- isIntLike(-1e3) 返回 true   
 * -- isIntLike("1e3") 返回 false   
 * -- isIntLike(0.001) 返回 false  
 * -- isIntLike(-0.001) 返回 false  
 * -- isIntLike(+0.001) 返回 false  
 * -- isIntLike("0.001") 返回 false  
 * -- isIntLike("-0.001") 返回 false  
 * -- isIntLike("+0.001") 返回 false  
 * -- isIntLike("+.001") 返回 false  
 * -- isIntLike(".001") 返回 false  
 * -- isIntLike("1e-3") 返回 false  
 * -- isIntLike("1e") 返回 false  
 * -- isIntLike("1px") 返回 false  
 * -- isIntLike(null) 返回 false  
 * -- isIntLike(undefined) 返回 false  
 * -- isIntLike(NaN) 返回 false  
 * @param numStr 
 * @returns 
 */
export function isIntLike(numStr: any) {
  if (typeof numStr === "string" || typeof numStr === "number") {
    return /^([+-])?(\d+)$/.test(numStr.toString());
  }
  return false;
}

/**
 * @description 判断给定的 $numStr 是否符合非负整数数字格式 
 * -- isPositiveInt(0) 返回 true   
 * -- isPositiveInt(+0) 返回 true   
 * -- isPositiveInt(-0) 返回 true   
 * -- isPositiveInt("0") 返回 true   
 * -- isPositiveInt("+0") 返回 true   
 * -- isPositiveInt("-0") 返回 false   
 * -- isPositiveInt(103) 返回 true   
 * -- isPositiveInt(103.00) 返回 true   
 * -- isPositiveInt("103.00") 返回 false   
 * -- isPositiveInt(-103) 返回 false   
 * -- isPositiveInt(+103) 返回 true   
 * -- isPositiveInt("+103") 返回 true   
 * -- isPositiveInt("-103") 返回 false   
 * -- isPositiveInt(+1e3) 返回 true   
 * -- isPositiveInt(-1e3) 返回 false   
 * -- isPositiveInt("1e3") 返回 false   
 * -- isPositiveInt(0.001) 返回 false  
 * -- isPositiveInt(-0.001) 返回 false  
 * -- isPositiveInt(+0.001) 返回 false  
 * -- isPositiveInt("0.001") 返回 false  
 * -- isPositiveInt("-0.001") 返回 false  
 * -- isPositiveInt("+0.001") 返回 false  
 * -- isPositiveInt("+.001") 返回 false  
 * -- isPositiveInt(".001") 返回 false  
 * -- isPositiveInt("1e-3") 返回 false  
 * -- isPositiveInt("1e") 返回 false  
 * -- isPositiveInt("1px") 返回 false  
 * -- isPositiveInt(null) 返回 false  
 * -- isPositiveInt(undefined) 返回 false  
 * -- isPositiveInt(NaN) 返回 false  
 * @param numStr 
 * @returns 
 */
export function isPositiveInt(numStr: any) {
  if (typeof numStr === "string" || typeof numStr === "number") {
    return /^\+?\d+$/.test(numStr.toString());
  }
  return false;
}

export function isPositiveNumber(numLikeStr: any): boolean {
  if (typeof numLikeStr === "string" || typeof numLikeStr === "number") {
    return /^\+?\d+(\.\d+)?$/.test(numLikeStr.toString());
  }
  return false;
}

export function isMatchFloat(num: number | string, maxLen: number = 10, fractionMaxLen: number = 2, isLimitInt: boolean = true): NSFuncNum.TResultIsMatchFloat {
  const str = num.toString();
  if (isNumberLike(str)) {
    if (str.length > maxLen) {
      return {
        match: false,
        reason: "stringLengthMax",
      };
    }
    const [intPart, fractionPart] = str.split(".");
    if ((fractionPart || "").length > fractionMaxLen) {
      return {
        match: false,
        reason: "fractionStringLengthMax",
      };
    }
    if (isLimitInt && (intPart || "").length > (maxLen - fractionMaxLen)) {
      return {
        match: false,
        reason: "intStringLengthMax",
      };
    }
    return {
      match: true,
    };
  }
  return {
    match: false,
    reason: "notLikeNumber",
  };
}

export function isConstraintNum(num: any, maxIntPartLen: number = 18, maxFractionLen: number = 2) {
  const str = `^(\\d{1,${maxIntPartLen}})(?:\\.\\d{1,${maxFractionLen}})?$`;
  const reg = new RegExp(str);
  return reg.test(num.toString());
}

export function getNumInRange(obj: { num: number, min: number, max?: number }): number
export function getNumInRange(obj: { num: number, min?: number, max: number }): number
export function getNumInRange(obj: number, min: number, max?: number): number
export function getNumInRange(obj: { num: number, min: number, max?: number } | {
  num: number,
  min?: number,
  max: number
} | number, min?: number, max?: number): number {
  let num: number;
  if (typeof obj === "object") {
    min = obj.min;
    max = obj.max;
    num = obj.num;
  } else {
    num = obj;
  }
  let minNum = min as number;
  let maxNum = max as number;
  if (!isNaN(minNum) && minNum > num) {
    return minNum;
  }
  if (!isNaN(maxNum) && maxNum < num) {
    return maxNum;
  }
  return num;
}

/**
 * @since 1.3.4
 * @param strOrNumA
 * @param strOrNumB
 * @param epsilon
 */
export function isSimilarEqual(
  strOrNumA: any,
  strOrNumB: any,
  epsilon: number = Number.EPSILON,
): boolean {
  const a = floatVal(strOrNumA, "-");
  const b = floatVal(strOrNumA, "-");
  if (a === "-" || b === "-") {
    // eslint-disable-next-line eqeqeq
    return strOrNumA == strOrNumB;
  }
  let diff = Math.abs(a - b);
  return diff <= epsilon;
}

/**
 * @description 排除 NaN/null/undefined 之后，调用 Math.min  
 * -- getMinIn("-10px", "2%", NaN, null, undefined, 1, -5) 返回 -10  
 * @since 1.4.2
 */
export function getMinIn(...args: Array<string | number | null | undefined>): number {
  const numList = args.map((item) => {
    return floatVal(item, NaN);
  }).filter((one) => {
    return !isNaN(one);
  });
  return Math.min(...numList);
}

/**
 * @description 排除 NaN/null/undefined 之后，调用 Math.max
 * -- getMinIn("-10px", "2%", NaN, null, undefined, 1, -5) 返回 2    
 * @since 1.4.9
 */
export function getMaxIn(...args: Array<string | number | null | undefined>): number {
  const numList = args.map((item) => {
    return floatVal(item, NaN);
  }).filter((one) => {
    return !isNaN(one);
  });
  return Math.max(...numList);
}

/**
 * @description 当且仅当sth为 [string|number] 类型时，会转成 number；其他类型直接输出为NaN
 * @since 1.4.8
 * @param sth 
 * @returns 
 */
export function toNumber(sth?: unknown): number {
  if (typeof sth === "string") {
    return Number(sth);
  }
  if (typeof sth === "number") {
    return sth;
  }
  return NaN;
}
