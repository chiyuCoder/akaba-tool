export declare namespace NSOptionCopier {
    type TAdditionalHandlerMethod<T> = (opt: T, obj: OptionCopier<T>) => T;
    interface IAdditionalHandle<T> {
        type: any;
        handler: TAdditionalHandlerMethod<T>;
    }
}
export declare class OptionCopier<T> {
    private origin;
    readonly additionalHandlerList: Array<NSOptionCopier.IAdditionalHandle<T>>;
    constructor(origin: T);
    getOrigin(): T;
    setOrigin(origin: T): this;
    doCopy(): T;
}
