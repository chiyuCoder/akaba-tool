import {copyOption} from "./option";

export namespace NSOptionCopier {
    export type TAdditionalHandlerMethod<T> = (opt: T, obj: OptionCopier<T>) => T;
    export interface IAdditionalHandle<T> {
        type: any;
        handler: TAdditionalHandlerMethod<T>;
    }
}

export class OptionCopier<T> {
    public readonly additionalHandlerList: Array<NSOptionCopier.IAdditionalHandle<T>> = [];
    public constructor(private origin: T) {
    }

    public getOrigin(): T {
        return this.origin;
    }

    public setOrigin(origin: T) {
        this.origin = origin;
        return this;
    }

    public doCopy(): T {
        if (!this.origin) {
            return this.origin;
        }
        if (typeof this.origin === "object") {
            const handlerMatch = this.additionalHandlerList.find((handler) => {
                return this.origin instanceof handler.type;
            });
            if (handlerMatch) {
                return handlerMatch.handler(this.origin, this);
            }
            return  copyOption(this.origin);
        }
        return this.origin;
    }
}
