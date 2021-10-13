export declare namespace NSOptionCopier {
    type TAdditionalHandlerMethod<T> = (opt: T, obj: OptionCopier<T>) => T;
    interface IAdditionalHandle<T> {
        type: any;
        handler: TAdditionalHandlerMethod<T>;
        handlerId?: string;
    }
    type TOptionPropertyValue = Option | string | number | ArrayLike<any> | Function | null | undefined;
    interface Option {
        [attr: string]: TOptionPropertyValue;
    }
}
export declare class OptionCopier<T = any> {
    readonly additionalHandlerList: Array<NSOptionCopier.IAdditionalHandle<T>>;
    private readonly copyIdMap;
    private readonly copyIdSet;
    addressReferTypeList: Array<{
        new (...args: any[]): any;
    }>;
    constructor();
    generateCopyId(): string;
    copyOptionAsArray<T>(optA: ArrayLike<T>, copyId?: string): Array<T>;
    copyOption(optA: string, copyId?: string): string;
    copyOption(optA: number, copyId?: string): number;
    copyOption(optA: null, copyId?: string): null;
    copyOption(optA: undefined, copyId?: string): undefined;
    copyOption<T>(optA: ArrayLike<T>, copyId?: string): T[];
    copyOption(optA: Function, copyId?: string): Function;
    copyOption(optA: NSOptionCopier.Option, copyId?: string): NSOptionCopier.Option;
    copyOptionAsObj<T extends NSOptionCopier.Option>(optA: T, copyId?: string): T;
    mixedOpt<TypeA extends NSOptionCopier.TOptionPropertyValue, TypeB extends NSOptionCopier.TOptionPropertyValue>(optA: TypeA, optB: TypeB): TypeA & TypeB;
    jsonCopy<T>(obj: T): T;
    mixedOptAndCopyResult<TypeA extends NSOptionCopier.TOptionPropertyValue, TypeB extends NSOptionCopier.TOptionPropertyValue>(optA: TypeA, optB: TypeB, copyId?: string): TypeA & TypeB;
}
export declare const optionCopier: OptionCopier<any>;
