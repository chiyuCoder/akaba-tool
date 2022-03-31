export declare namespace NSFuncOption {
}
export declare function copyOptionAsArray<T>(optA: ArrayLike<T>): Array<T>;
export declare function copyOptionAsObj<T>(optA: T): T;
export declare function copyOption<T>(optA: T): T;
export declare function mixedOpt<TypeA, TypeB>(optA: TypeA, optB: TypeB): TypeA & TypeB;
export declare function mixedOptAndCopyResult<TypeA, TypeB>(optA: TypeA, optB: TypeB): TypeA & TypeB;
export declare function jsonCopy<T>(obj: T): T;
