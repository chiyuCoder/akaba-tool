export namespace NSBaseCopier {
  export interface ExtraHandleReturn<T> {
    hasNext: boolean,
    value: T,
  }
  export type ExtraHandle<T, Copier> = (optA: T, copier: Copier, copyId: string) => ExtraHandleReturn<T>;
}

/**
 * @since 1.2.0
 */
export class BaseCopier {
  protected readonly copyIdMap: Map<string, Array<any>> = new Map();
  protected readonly copyIdSet: Set<string> = new Set();
  public extraHandleList: Array<NSBaseCopier.ExtraHandle<any, this>> = [];

  public generateCopyId(): string {
    const id: string = Date.now().toString(32) + "#" + Math.random();
    if (this.copyIdSet.has(id)) {
      return this.generateCopyId();
    }
    this.copyIdSet.add(id);
    return id;
  }

  public getCopyLogById(copyId: string): Array<any> {
    let list = this.copyIdMap.get(copyId);
    if (!list) {
      list = [];
      this.copyIdMap.set(copyId, list);
    }
    return list;
  }

  public jsonCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
  }

  public getExtraHandleReturn<T>(value: T, hasNext: boolean = true): NSBaseCopier.ExtraHandleReturn<T> {
    return {
      hasNext,
      value,
    };
  }

  public copyOption<T>(optA: T, copyId?: string): T {
    if (!copyId) {
      copyId = this.generateCopyId();
    }
    const result = this.doExtraHandle(optA, copyId);
    if (!result.hasNext) {
      return result.value;
    }
    if (typeof optA === "object") {
      return this.copyOptionAsObj(optA);
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

  protected doExtraHandle<T>(val: T, copyId: string, index: number = 0): NSBaseCopier.ExtraHandleReturn<T> {
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

export const baseCopier = new BaseCopier();
