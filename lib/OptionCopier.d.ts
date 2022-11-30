export declare namespace NSOptionCopier {
}
export declare class OptionCopier {
    private readonly copyIdMap;
    private readonly copyIdSet;
    addressReferTypeList: Array<{
        new (...args: Array<any>): any;
    }>;
    generateCopyId(): string;
    copyOptionAsArray<T>(optA: ArrayLike<T>, copyId?: string): Array<T>;
    copyOption<T>(optA: T, copyId?: string): T;
    copyOptionAsObj<T>(optA: T, copyId?: string): T;
    mixedOpt<TypeA, TypeB>(optA: TypeA, optB: TypeB): TypeA & TypeB;
    jsonCopy<T>(obj: T): T;
    mixedOptAndCopyResult<TypeA, TypeB>(optA: TypeA, optB: TypeB, copyId?: string): TypeA & TypeB;
}
export declare const optionCopier: OptionCopier;
