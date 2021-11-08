export namespace NSOptionCopier {
}

export class OptionCopier {
    private readonly copyIdMap: Map<string, Array<any>> = new Map();
    private readonly copyIdSet: Set<string> = new Set();
    public addressReferTypeList: Array<{ new(...args: any[]): any}> = [
        HTMLElement,
        Map,
        Set,
    ];

    public constructor() {
    }

    public generateCopyId(): string {
        const id: string = Date.now().toString(32) + '#' + Math.random();
        if (this.copyIdSet.has(id)) {
            return this.generateCopyId();
        }
        this.copyIdSet.add(id);
        return id;
    }

    public copyOptionAsArray<T>(optA: ArrayLike<T>,  copyId?: string): Array<T> {
        if (!copyId) {
            copyId = this.generateCopyId();
        }
        return Array.from(optA).map((item) => {
            return this.copyOption(item as any, copyId) as any as T;
        });
    }

    public copyOption<T>(optA: T, copyId?: string): T {
        if (!copyId) {
            copyId = this.generateCopyId();
        }
        let list: Array<any> | undefined = this.copyIdMap.get(copyId);
        if (!list) {
            list = [];
            this.copyIdMap.set(copyId, list);
        }
        if (!optA) {
            return optA;
        }
        if (typeof optA === "object") {
            if (
                this.addressReferTypeList.find((type) => {
                    return optA instanceof type;
                }) || list.indexOf(optA) >= 0
            ) {
                return optA;
            }
            list.push(optA);
            return this.copyOptionAsObj(optA as any, copyId);
        }
        return optA;
    }

    public copyOptionAsObj<T>(optA: T, copyId?: string): T {
        if (!copyId) {
            copyId = this.generateCopyId();
            const list: any[] = [
                optA
            ];
            this.copyIdMap.set(copyId, list);
        }
        if (optA instanceof Array) {
            return this.copyOption(optA, copyId) as any as T;
        }
        let copy = {} as any as T;
        for (let attr in optA) {
            if (Object.prototype.hasOwnProperty.call(optA, attr)) {
                (copy as any)[attr] = this.copyOption(optA[attr] as any, copyId);
            }
        }
        return copy;
    }

    public  mixedOpt<TypeA, TypeB>(optA: TypeA, optB: TypeB): TypeA & TypeB {
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
                        (targetA as any)[attr] = this.mixedOpt((optA as any)[attr], (optB as any)[attr]);
                    }
                }
                return targetA;
            }
            return optB as TypeA & TypeB;
        }
        return optB  as TypeA & TypeB;
    }

    public jsonCopy<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj)) as T;
    }

    public mixedOptAndCopyResult<TypeA, TypeB>(
        optA: TypeA,
        optB: TypeB,
        copyId?: string
    ): TypeA & TypeB {
        if (!optA) {
            return optB as TypeA & TypeB;
        }
        if (optB instanceof Array) {
            return this.copyOptionAsArray(optB as any)  as any as TypeA & TypeB;
        }
        if (typeof optB === "object") {
            if (typeof optA === "object") {
                if (!copyId) {
                    copyId = this.generateCopyId();
                    const list: any[] = [
                        optA,
                        optB,
                    ];
                    this.copyIdMap.set(copyId, list);
                }
                let targetA = this.copyOptionAsObj(optA as any, copyId) as TypeA & TypeB;
                for (let attr in optB) {
                    if (Object.prototype.hasOwnProperty.call(optB, attr)) {
                        (targetA as any)[attr] = this.mixedOptAndCopyResult((optA as any)[attr], (optB as any)[attr], copyId);
                    }
                }
                return targetA;
            }
            return this.copyOptionAsObj(optB as any, copyId) as TypeA & TypeB;
        }
        return this.copyOption(optB as any, copyId)  as TypeA & TypeB;
    }
}

export const optionCopier = new OptionCopier();
