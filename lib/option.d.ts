export declare namespace NSFuncOption {
    type TOptionPropertyValue = Option | string | number | ArrayLike<any> | Function | null | undefined;
    interface Option {
        [attr: string]: TOptionPropertyValue;
    }
}
export declare function copyOptionAsArray<T>(optA: ArrayLike<T>): Array<T>;
export declare function copyOptionAsObj<T extends NSFuncOption.Option>(optA: T): T;
export declare function copyOption(optA: string): string;
export declare function copyOption(optA: number): number;
export declare function copyOption(optA: null): null;
export declare function copyOption(optA: undefined): undefined;
export declare function copyOption<T>(optA: ArrayLike<T>): T[];
export declare function copyOption(optA: Function): Function;
export declare function copyOption(optA: NSFuncOption.Option): NSFuncOption.Option;
export declare function mixedOpt<TypeA extends NSFuncOption.TOptionPropertyValue, TypeB extends NSFuncOption.TOptionPropertyValue>(optA: TypeA, optB: TypeB): TypeA & TypeB;
export declare function mixedOptAndCopyResult<TypeA extends NSFuncOption.TOptionPropertyValue, TypeB extends NSFuncOption.TOptionPropertyValue>(optA: TypeA, optB: TypeB): TypeA & TypeB;
export declare function jsonCopy<T>(obj: T): T;
