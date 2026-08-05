import {floatNum, floatVal, intVal, toFixed} from "./num";

export class NumTransferTool {
    public defaultSaveNum = 2;
    constructor(public defaultNanText: string | number = "") {
    }


    /**
     * @description parseFloat 的 TypeScript 版本  
     * -- floatVal(null,'-') 返回值是 "-"  
     * -- floatVal(undefined,'-') 返回值是 "-"  
     * -- floatVal(NaN,'-') 返回值是 "-"  
     * -- floatVal(0, "-") 返回值是 0  
     * -- floatVal("0", "-") 返回值是 0  
     * -- floatVal("0px", "-") 返回值是 0  
     * -- floatVal("1e", "-") 返回值是 1  
     * -- floatVal("1e-9", "-") 返回值是 1e-9  
     * -- floatVal(1e-9, "-") 返回值是 1e-9  
     * -- floatVal("1.2300px", "-") 返回值是 1.23  
     * -- floatVal("1.2300", "-") 返回值是 1.23  
     * @since 1.3.4 更新类名 (update function name)
     * @param text
     * @param nanText
     */
    floatVal(text: unknown, nanText?: string | number): string | number {
        return floatVal(text, nanText ?? this.defaultNanText);
    }

    /**
     * @description parseInt 的 TypeScript 版本  
     * -- intVal(null,'-') 返回值是 "-"  
     * -- intVal(undefined,'-') 返回值是 "-"  
     * -- intVal(NaN,'-') 返回值是 "-"  
     * -- intVal(0, "-") 返回值是 0  
     * -- intVal("0", "-") 返回值是 0  
     * -- intVal("0px", "-") 返回值是 0  
     * -- intVal("1e", "-") 返回值是 1  
     * -- intVal("1e-9", "-") 返回值是 1  
     * -- intVal(1e-9, "-") 返回值是 0  
     * @since 1.3.4 更新类名 (update function name)
     * @param text
     * @param nanText
     */
    intVal(text: unknown, nanText?: string | number): string | number {
        return intVal(text, nanText ?? this.defaultNanText);
    }
    /**
     * @version 1.3.4 parseFloat 然后根据 saveNum 四舍五入之后的数字 ( 同 fixedVal 函数)
     * -- fixedVal(null, 2, '-') 返回 "-"  
     * -- fixedVal(undefined, 2, '-') 返回 "-"  
     * -- fixedVal(NaN, 2, '-') 返回 "-"  
     * -- fixedVal(0, 2, '-') 返回 "0.00"  
     * -- fixedVal("0", 2, '-') 返回 "0.00"  
     * -- fixedVal("0px", 2, '-') 返回 "0.00"  
     * -- fixedVal("1e-9", 2, '-') 返回 "0.00"  
     * -- fixedVal(1e-9, 2, '-') 返回 "0.00"  
     * -- fixedVal("1e", 2, '-') 返回 "1.00"  
     * -- fixedVal("1.2300px", 2, '-') 返回 "1.23"  
     * -- fixedVal("1.2300", 2, '-') 返回 "1.23"  
     * -- fixedVal("1.2340", 2, '-') 返回 "1.23"  
     * -- fixedVal("1.2350", 2, '-') 返回 "1.24"  
     * -- fixedVal(-1.2, 2, "") 返回 "-1.20"  
     * -- fixedVal(1.204, 2, "") 返回 "1.20"  
     * -- fixedVal(1.205, 2, "") 返回 "-1.21"  
     * -- fixedVal(-1.204, 2, "") 返回 "-1.20"  
     * -- fixedVal(-1.205, 2, "") 返回 "-1.21"  
     * @param text
     * @param saveNum
     * @param nanText
     */
    toFixed(text: unknown, saveNum: number = this.defaultSaveNum,  nanText?: string | number): string {
        return toFixed(text, saveNum, (nanText ?? this.defaultNanText) as string);
    }
    /**
     * @description parseFloat 然后根据 saveNum 四舍五入之后的数字
     * -- floatNum(null, 2, '-') 返回 "-"  
     * -- floatNum(undefined, 2, '-') 返回 "-"  
     * -- floatNum(NaN, 2, '-') 返回 "-"  
     * -- floatNum(0, 2, '-') 返回 0  
     * -- floatNum("0", 2, '-') 返回 0  
     * -- floatNum("0px", 2, '-') 返回 0  
     * -- floatNum("1e-9", 2, '-') 返回 0  
     * -- floatNum(1e-9, 2, '-') 返回 0  
     * -- floatNum("1e", 2, '-') 返回 1  
     * -- floatNum("1.2300px", 2, '-') 返回 1.23  
     * -- floatNum("1.2300", 2, '-') 返回 1.23  
     * -- floatNum("1.2340", 2, '-') 返回 1.23  
     * -- floatNum("1.2350", 2, '-') 返回 1.24  
     * @since 1.3.4 更新类名 (update function name)
     * @param text
     * @param saveNum
     * @param nanText
     */
    floatNum(text: unknown, saveNum: number = this.defaultSaveNum,  nanText?: string | number): string | number {
        return floatNum(text, saveNum, nanText ?? this.defaultNanText);
    }
}

export const numTransferTool = new NumTransferTool("-");
