export namespace NSOptionCopier {
    export type TAdditionalHandlerMethod<T> = (opt: T, obj: OptionCopier<T>) => T;
    export interface IAdditionalHandle<T> {
        type: any;
        handler: TAdditionalHandlerMethod<T>;
        handlerId?: string;
    }
}

export class OptionCopier<T = any> {
    public readonly additionalHandlerList: Array<NSOptionCopier.IAdditionalHandle<T>> = [];
    public constructor() {
    }

    public doCopy(origin: T): T {
        if (!origin) {
            return origin;
        }
        const handlerMatch = this.additionalHandlerList.find((handler) => {
            return origin instanceof handler.type;
        });
        if (handlerMatch) {
            return handlerMatch.handler(origin, this);
        }
        if (typeof origin === "object") {
            return this.doCopyObj(origin as any) as any as T;
        }
        return origin;
    }

    protected doCopyObj<ObjType>(origin: ObjType): ObjType {
        let copyObj = {} as any as ObjType;
        for (let attr in origin) {
            if (Object.prototype.hasOwnProperty.call(origin, attr)) {
                copyObj[attr] = this.doCopy(origin[attr] as any) as any;
            }
        }
        return copyObj;
    }

    public addHandler(type: any, handler: NSOptionCopier.TAdditionalHandlerMethod<T>, handlerId?: string): this {
        const handlerInfo = this.additionalHandlerList.find((item) => {
           return item.type === type;
        });
        if (handlerInfo) {
            handlerInfo.handler = handler;
            handlerInfo.handlerId = handlerId;
            return this;
        }
        this.additionalHandlerList.push({
            type,
            handler,
            handlerId,
        });
        return this;
    }
}
