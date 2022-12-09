export namespace NSOptionCopier {
    export interface ExtraHandleReturn<T> {
        hasNext: boolean,
        value: T,
    }
    export type ExtraHandle<T> = (optA: T, copier: OptionCopier, copyId: string) => ExtraHandleReturn<T>;
}

export class OptionCopier {
    protected readonly copyIdMap: Map<string, Array<any>> = new Map();
    protected readonly copyIdSet: Set<string> = new Set();
    /**
     * @since 1.1.2
     */
    public extraHandleList: Array<NSOptionCopier.ExtraHandle<any>> = [];
    public addressReferTypeList: Array<{ new(...args: Array<any>): any}> = [
        Map,
        Set,
    ];

    public generateCopyId(): string {
        const id: string = Date.now().toString(32) + "#" + Math.random();
        if (this.copyIdSet.has(id)) {
            return this.generateCopyId();
        }
        this.copyIdSet.add(id);
        return id;
    }

    /**
     * @since 1.1.2
     */
    public getCopyLogById(copyId: string): Array<any> {
        let list = this.copyIdMap.get(copyId);
        if (!list) {
            list = [];
            this.copyIdMap.set(copyId, list);
        }
        return list;
    }

    /**
     * @since 1.1.4
     */
    public addCopyLogById(copyId: string, val: any): this {
        const list = this.getCopyLogById(copyId);
        list.push(val);
        return this;
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
        const result = this.doExtraHandle(optA, copyId);
        if (!result.hasNext) {
            return result.value;
        }
        optA = result.value;
        let list: Array<any> | undefined = this.getCopyLogById(copyId);
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
            const list: Array<any> = [
                optA,
            ];
            this.copyIdMap.set(copyId, list);
        }
        if (optA instanceof Array) {
            return this.copyOption(optA, copyId) as any as T;
        }
        const copy = {} as any as T;
        for (const attr in optA) {
            if (Object.prototype.hasOwnProperty.call(optA, attr)) {
                (copy as any)[attr] = this.copyOption(optA[attr] as any, copyId);
            }
        }
        return copy;
    }

    public mixedOpt<TypeA, TypeB>(optA: TypeA, optB: TypeB): TypeA & TypeB {
        if (!optA) {
            return optB as TypeA & TypeB;
        }
        if (optB instanceof Array) {
            return optB as any as TypeA & TypeB;
        }
        if (typeof optB === "object") {
            if (typeof optA === "object") {
                const targetA = optA as TypeA & TypeB;
                for (const attr in optB) {
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
                    const list: Array<any> = [
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

    /**
     * @since 1.1.2
     */
    public getExtraHandleReturn<T>(value: T, hasNext: boolean = true): NSOptionCopier.ExtraHandleReturn<T> {
        return {
            hasNext,
            value,
        };
    }

    /**
     * @since 1.1.2
     */
    protected doExtraHandle<T>(val: T, copyId: string, index: number = 0): NSOptionCopier.ExtraHandleReturn<T> {
        let handle = this.extraHandleList[index];
        if (!handle) {
            return this.getExtraHandleReturn(val);
        }
        const result = handle(val, this, copyId);
        index ++;
        if (result.hasNext && index < this.extraHandleList.length) {
            return this.doExtraHandle<T>(result.value, copyId, index);
        }
        return result;
    }
}

export const optionCopier = new OptionCopier();
