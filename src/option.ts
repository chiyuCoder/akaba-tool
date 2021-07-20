
export function copyOptionAsArray<T>(optA: ArrayLike<T>): Array<T> {
    return Array.from(optA);
}

export function copyOptionAsObj<T>(optA: T): T {
    if (optA instanceof Array) {
        return copyOptionAsArray(optA) as any as T;
    }
    let copy = {} as any as T;
    for (let attr in optA) {
        copy[attr] = copyOption(optA[attr]);
    }
    return copy;
}

export function copyOption<T>(optA: T): T {
    if (!optA) {
        return optA;
    }
    if (typeof optA === "object") {
        return copyOptionAsObj(optA);
    }
    return optA;
}
