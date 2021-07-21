export namespace NSFuncOption {
    export type TOptionPropertyValue = Option | string | number | ArrayLike<any> | Function | null | undefined;
    export interface Option {
        [attr: string]: TOptionPropertyValue;
    }
}

export function copyOptionAsArray<T>(optA: ArrayLike<T>): Array<T> {
    return Array.from(optA).map((item) => {
        return copyOption(item as any) as any as T;
    });
}

export function copyOptionAsObj<T extends NSFuncOption.Option>(optA: T): T {
    if (optA instanceof Array) {
        return copyOptionAsArray(optA) as any as T;
    }
    let copy = {} as any as T;
    for (let attr in optA) {
        if (Object.prototype.hasOwnProperty.call(optA, attr)) {
            (copy as any)[attr] = copyOption(optA[attr] as any);
        }
    }
    return copy;
}

export function copyOption(optA: string): string
export function copyOption(optA: number): number
export function copyOption(optA: null): null
export function copyOption(optA: undefined): undefined
export function copyOption<T>(optA: ArrayLike<T>): T[]
export function copyOption(optA: Function): Function
export function copyOption(optA: NSFuncOption.Option): NSFuncOption.Option
export function copyOption(optA: NSFuncOption.TOptionPropertyValue): NSFuncOption.TOptionPropertyValue {
    if (!optA) {
        return optA;
    }
    if (typeof optA === "object") {
        return copyOptionAsObj(optA as any);
    }
    return optA;
}

export function mixedOpt<TypeA extends NSFuncOption.TOptionPropertyValue, TypeB extends NSFuncOption.TOptionPropertyValue>(optA: TypeA, optB: TypeB): TypeA & TypeB {
    if (!optA) {
        return optB as TypeA & TypeB;
    }
    if (optB instanceof Array) {
        return optB as any as TypeA & TypeB;
    }
    if (typeof optB === "object") {
        if (typeof optA === "object") {
            let targetA = optA as TypeA & TypeB;
            for (let attr in optB) {
                if (Object.prototype.hasOwnProperty.call(optB, attr)) {
                    (targetA as any)[attr] = mixedOpt((optA as any)[attr], (optB as any)[attr]);
                }
            }
            return targetA;
        }
        return optB as TypeA & TypeB;
    }
    return optB  as TypeA & TypeB;
}

export function mixedOptAndCopyResult<TypeA extends NSFuncOption.TOptionPropertyValue, TypeB extends NSFuncOption.TOptionPropertyValue>(optA: TypeA, optB: TypeB): TypeA & TypeB {
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
    return JSON.parse(JSON.stringify(obj)) as T;
}
