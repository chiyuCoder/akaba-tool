export declare namespace NSOptionCopier {
    type TAdditionalHandlerMethod<T> = (opt: T, obj: OptionCopier<T>) => T;
    interface IAdditionalHandle<T> {
        type: any;
        handler: TAdditionalHandlerMethod<T>;
        handlerId?: string;
    }
}
export declare class OptionCopier<T = any> {
    readonly additionalHandlerList: Array<NSOptionCopier.IAdditionalHandle<T>>;
    constructor();
    doCopy(origin: T): T;
    protected doCopyObj<ObjType>(origin: ObjType): ObjType;
    addHandler(type: any, handler: NSOptionCopier.TAdditionalHandlerMethod<T>, handlerId?: string): this;
}
