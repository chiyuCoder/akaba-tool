export declare class NumTransferTool {
    defaultNanText: string | number;
    defaultSaveNum: number;
    constructor(defaultNanText?: string | number);
    floatVal(text: unknown, nanText?: string | number): string | number;
    intVal(text: unknown, nanText?: string | number): string | number;
    toFixed(text: unknown, saveNum?: number, nanText?: string | number): string | number;
    floatNum(text: unknown, saveNum?: number, nanText?: string | number): string | number;
}
export declare const numTransferTool: NumTransferTool;
