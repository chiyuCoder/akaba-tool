# akaba-tool

## 类数组形式
```typescript
export declare namespace NSFuncArrayLike {
    type TLoopFunc<T> = (item: T, index: number, arrLike: ArrayLike<T>) => any;
}

export declare function doLoop<T>(arrLike: ArrayLike<T>, loopFunc: NSFuncArrayLike.TLoopFunc<T>): void;
```

## 类数字
```typescript
export declare namespace NSFuncNum {
    type TResultIsMatchFloatFalseReason = "stringLengthMax" | "notLikeNumber" | "fractionStringLengthMax";
    interface IResultIsMatchFloatFalse {
        match: false;
        reason: TResultIsMatchFloatFalseReason;
    }
    interface IResultIsMatchFloatTrue {
        match: true;
    }
    type TResultIsMatchFloat = IResultIsMatchFloatFalse | IResultIsMatchFloatTrue;
}
```
- 格式转化
```typescript
export declare function intVal(text: string | number, nanText: string | number): string | number;
// floatVal("0.0250") ==> 0.025
export declare function floatVal(text: string | number, nanText: string | number): string | number;
// floatNum("0.0250", 2) => 0.03 
// floatNum("0.0250", 3) => 0.025
export declare function floatNum(text: string | number, saveNum: number, nanText: string | number): string | number;
// toFixed("0.0250", 3) => 0.0250
export declare function toFixed(text: string | number, saveNum: number, nanText: string | number): string | number;
// toChineseIndex(0) => '零'
// toChineseIndex(0, "0") => "0"
// num取值范围是 0 - 15; 其中 1 - 10对应一-十; 11->百；12->千; 13 -> 万；14 ->亿
export declare function toChineseIndex(num: 0, zeroStr: string): string
export declare function toChineseIndex(num: number): string;
```

- 类型匹配

```typescript 
export declare function isNumberLike(numStr: any): boolean;
export declare function isIntLike(numStr: any): boolean;
export declare function isPositiveInt(numStr: any): boolean;
export declare function isMatchFloat(num: number | string, maxLen?: number, fractionMaxLen?: number): NSFuncNum.TResultIsMatchFloat;
```

- 约束范围输出
```typescript
export declare function getNumInRange(obj: {
    num: number;
    min: number;
    max?: number;
}): number;
export declare function getNumInRange(obj: {
    num: number;
    min?: number;
    max: number;
}): number;
export declare function getNumInRange(obj: number, min: number, max?: number): number;
```

- 格式转化类 NumTransferTool

```typescript
export declare class NumTransferTool {
    defaultNanText: string | number; // 默认非数字时返回值
    defaultSaveNum: number; // 默认小数保留位数
    constructor(defaultNanText?: string | number);
    floatVal(text: string | number, nanText?: string | number): string | number; // 同上面的floatVal。nanText默认为this.deafultNanText
    intVal(text: string | number, nanText?: string | number): string | number;// 同上面的intVal。nanText默认为this.deafultNanText
    toFixed(text: string | number, saveNum?: number, nanText?: string | number): string | number;// 同上面的toFixed。nanText默认为this.deafultNanText
    floatNum(text: string | number, saveNum?: number, nanText?: string | number): string | number;// 同上面的floatNum。nanText默认为this.deafultNanText
}
export declare const numTransferTool: NumTransferTool; // 默认实例; numTransferTool.defaultNanText = "-"
```

## 简易类对象(Option)
```typescript
export declare namespace NSFuncOption {
    type TOptionPropertyValue = Option | string | number | ArrayLike<any> | Function | null | undefined;
    interface Option {
        [attr: string]: TOptionPropertyValue;
    }
}
```

- 复制相关

```typescript
export declare function jsonCopy<T>(obj: T): T;
export declare function copyOptionAsArray<T>(optA: ArrayLike<T>): Array<T>;
export declare function copyOptionAsObj<T>(optA: T): T;
export declare function copyOption(optA: string): string;
export declare function copyOption(optA: number): number;
export declare function copyOption(optA: null): null;
export declare function copyOption(optA: undefined): undefined;
export declare function copyOption<T>(optA: ArrayLike<T>): T[];
export declare function copyOption(optA: Function): Function;
export declare function copyOption(optA: NSFuncOption.Option): NSFuncOption.Option;
```

- 混入
```typescript
export declare function mixedOpt<TypeA, TypeB>(optA: TypeA, optB: TypeB): TypeA & TypeB;
export declare function mixedOptAndCopyResult<TypeA, TypeB>(optA: TypeA, optB: TypeB): TypeA & TypeB;
```

- 另外提供OptionCopier类，可以实现自定义的复制

## 范围设置

```typescript
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
        baseRefer: 'min' | 'max'; 
    }
    interface IBaseSplitInfoStep extends IBaseSplitInfo {
        step: number;
    }
    interface IBaseSplitInfoStepTimes extends IBaseSplitInfoStep {
        timesBase: number;
    }
}

export declare function getRangeOfDataList<T>(list: ArrayLike<T>, valHandle?: NSFuncRange.TValHandle<T>): NSFuncRange.IBaseRange;

/**
 * 
 * option.baseRefer 默认为'min'
 * option.stepHandle 默认为 (step: number) => step
 * getSplitInfoOf({min: 0.1, max: 0.52, splitNumber: 4}) => {min: 0.1, max: 0.52, splitNumber: 4, step: 0.10500000000000001}
 */
export declare function getSplitInfoOf(splitInfo: NSFuncRange.IBaseSplitInfo, option?: Partial<NSFuncRange.IExtraSplitInfo>): NSFuncRange.IBaseSplitInfoStep;

/**
 *
 * option.baseRefer 默认为'min'
 * option.stepHandle 默认为 (step: number) => Math.ceil(step);
 * getSplitInfoIntStep({min: 0.1, max: 0.52, splitNumber: 4}) => min: 0, max: 1, splitNumber: 4, step: 0.25}
 */
export declare function getSplitInfoIntStep(splitInfo: NSFuncRange.IBaseSplitInfo, option: Partial<NSFuncRange.IExtraSplitInfo>): NSFuncRange.IBaseSplitInfoStep;

/**
 * option.timesBase = 10
 * option.baseRefer 默认为'min'
 * option.stepHandle 默认为 (step: number) => Math.ceil(step);
 * getSplitInfoTimesStep({min: 0.1, max: 0.52, splitNumber: 4}) => {min: 0, max: 40, splitNumber: 4, step: 10}
 */
export declare function getSplitInfoTimesStep(splitInfo: NSFuncRange.IBaseSplitInfo, option: Partial<NSFuncRange.IBaseSplitInfoStepTimes>): NSFuncRange.IBaseSplitInfoStep;
```

- fileRelate
```typescript
export declare namespace NSFileRelate {
    interface IBase64RegResultMatch {
        isMatch: true;
        dataType: string;
        dataSuffix: string;
        dataData: string;
        mime: string;
    }
    interface IBase64RegResultNotMatch {
        isMatch: false;
    }
    type TBase64RegResult = IBase64RegResultNotMatch | IBase64RegResultMatch;
}

export declare function getDataFromBase64String(base64String: string): NSFileRelate.TBase64RegResult;
```

### 其他

```typescript
/**
 * 将setTimeout转成Promise
 * @param **delayTime**
 */
export declare function delay(delayTime?: number): Promise<void>;
```

## 更新记录

- 1.0.11  
  intVal(1e-9, "") => "0";  
  intVal("1e-9", "") => "1";

