import { optionCopier } from "./OptionCopier";
//
export namespace NSFuncOption {
}

export function copyOptionAsArray<T>(optA: ArrayLike<T>): Array<T> {
    return optionCopier.copyOptionAsArray(optA);
}

export function copyOptionAsObj<T>(optA: T): T {
    return optionCopier.copyOptionAsObj(optA);
}

export function copyOption<T>(optA: T): T {
    return optionCopier.copyOption(optA as any);
}

export function mixedOpt<TypeA, TypeB>(optA: TypeA, optB: TypeB): TypeA & TypeB {
    return optionCopier.mixedOpt(optA, optB);
}

export function mixedOptAndCopyResult<TypeA, TypeB>(optA: TypeA, optB: TypeB): TypeA & TypeB {
    return optionCopier.mixedOptAndCopyResult(optA, optB);
}

export function jsonCopy<T>(obj: T): T {
    return optionCopier.jsonCopy(obj);
}

export function getOptionKeyAsList<T extends object>(dict: T): Array<Extract<keyof T, string>> {
    return Array.from(Object.keys(dict)) as Array<any>;
}
