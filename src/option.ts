import { optionCopier } from './OptionCopier';
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
    if (!optA) {
        return optB as TypeA & TypeB;
    }
    if (optB instanceof Array) {
        return copyOptionAsArray(optB as any)  as any as TypeA & TypeB;
    }
    if (typeof optB === "object") {
        if (typeof optA === "object") {
            let targetA = copyOptionAsObj(optA as any) as TypeA & TypeB;
            for (let attr in optB) {
                if (Object.prototype.hasOwnProperty.call(optB, attr)) {
                    (targetA as any)[attr] = mixedOpt((optA as any)[attr], (optB as any)[attr]);
                }
            }
            return targetA;
        }
        return copyOptionAsObj(optB as any) as TypeA & TypeB;
    }
    return copyOption(optB as any)  as TypeA & TypeB;
}

export function jsonCopy<T>(obj: T): T {
    return optionCopier.jsonCopy(obj);
}
