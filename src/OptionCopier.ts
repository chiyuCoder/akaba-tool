import {BaseCopier} from "./BaseCopier";

export namespace NSOptionCopier {
}

export class OptionCopier extends BaseCopier {
    public addressReferTypeList: Array<{ new(...args: Array<any>): any}> = [
        Map,
        Set,
    ];

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
}

export const optionCopier = new OptionCopier();
