export declare class NumTransferTool {
    defaultNanText: string | number;
    defaultSaveNum: number;
    constructor(defaultNanText?: string | number);
    floatVal(text: any, nanText?: string | number): string | number;
    intVal(text: any, nanText?: string | number): string | number;
    toFixed(text: any, saveNum?: number, nanText?: string | number): string | number;
    floatNum(text: any, saveNum?: number, nanText?: string | number): string | number;
}
export declare const numTransferTool: NumTransferTool;
