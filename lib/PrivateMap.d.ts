declare class SinglePrivateMap<TBindObj extends object, TObjectPropertyDict extends object> {
    private readonly bindObj;
    private readonly privateMap;
    constructor(bindObj: TBindObj, map: PrivateMap<TBindObj, TObjectPropertyDict>);
    setDict(dict: TObjectPropertyDict): this;
    getDict(): TObjectPropertyDict | undefined;
    safeGetDict(): TObjectPropertyDict;
    setProperty<KeyName extends keyof TObjectPropertyDict>(keyName: KeyName, value: TObjectPropertyDict[KeyName]): this;
    safeSetProperty<KeyName extends keyof TObjectPropertyDict>(keyName: KeyName, value: TObjectPropertyDict[KeyName]): this;
    getProperty<KeyName extends keyof TObjectPropertyDict>(keyName: KeyName): TObjectPropertyDict[KeyName];
    safeGetProperty<KeyName extends keyof TObjectPropertyDict>(keyName: KeyName): TObjectPropertyDict[KeyName];
}
export declare class PrivateMap<TBindObj extends object = object, TObjectPropertyDict extends object = object> {
    private bindMap;
    setDict(bindObj: TBindObj, dict: TObjectPropertyDict): this;
    getDict(bindObj: TBindObj): TObjectPropertyDict | undefined;
    safeGetDict(bindObj: TBindObj): TObjectPropertyDict;
    setProperty<KeyName extends keyof TObjectPropertyDict>(bindObj: TBindObj, keyName: KeyName, value: TObjectPropertyDict[KeyName]): this;
    safeSetProperty<KeyName extends keyof TObjectPropertyDict>(bindObj: TBindObj, keyName: KeyName, value: TObjectPropertyDict[KeyName]): this;
    getProperty<KeyName extends keyof TObjectPropertyDict>(bindObj: TBindObj, keyName: KeyName): TObjectPropertyDict[KeyName];
    safeGetProperty<KeyName extends keyof TObjectPropertyDict>(bindObj: TBindObj, keyName: KeyName): TObjectPropertyDict[KeyName];
    getSingleBindInstance(bindObj: TBindObj): SinglePrivateMap<TBindObj, TObjectPropertyDict>;
}
export {};
