export declare class NumTransferTool {
    defaultNanText: string | number;
    defaultSaveNum: number;
    constructor(defaultNanText?: string | number);
    floatVal(text: string | number, nanText?: string | number): string | number;
    intVal(text: string | number, nanText?: string | number): string | number;
    toFixed(text: string | number, saveNum?: number, nanText?: string | number): string | number;
    floatNum(text: string | number, saveNum?: number, nanText?: string | number): string | number;
}
export declare const numTransferTool: NumTransferTool;
