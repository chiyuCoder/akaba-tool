
class SinglePrivateMap<TBindObj extends object, TObjectPropertyDict extends object> {
  private readonly bindObj: TBindObj;
  private readonly privateMap: PrivateMap<TBindObj, TObjectPropertyDict>;

  constructor(bindObj: TBindObj, map: PrivateMap<TBindObj, TObjectPropertyDict>) {
    this.bindObj = bindObj;
    this.privateMap = map;
  }

  public setDict(dict: TObjectPropertyDict): this {
      this.privateMap.setDict(this.bindObj, dict);
      return this;
  }

  public getDict(): TObjectPropertyDict | undefined {
    return this.privateMap.getDict(this.bindObj);
  }

  public safeGetDict(): TObjectPropertyDict {
    return this.privateMap.safeGetDict(this.bindObj);
  }

  public setProperty<KeyName extends keyof TObjectPropertyDict>(
    keyName: KeyName,
    value: TObjectPropertyDict[KeyName]
  ): this {
    const dict:TObjectPropertyDict = this.getDict()!;
    dict[keyName] = value;
    return this;
  }

  public safeSetProperty<KeyName extends keyof TObjectPropertyDict>(
    keyName: KeyName,
    value: TObjectPropertyDict[KeyName]
  ): this {
    const dict: TObjectPropertyDict = this.safeGetDict();
    dict[keyName] = value;
    return this;
  }

  public getProperty<KeyName extends keyof TObjectPropertyDict>(
    keyName: KeyName
  ): TObjectPropertyDict[KeyName] {
    const dict: TObjectPropertyDict = this.getDict()!;
    return dict[keyName];
  }

  public safeGetProperty<KeyName extends keyof TObjectPropertyDict>(
    keyName: KeyName
  ): TObjectPropertyDict[KeyName] {
    const dict: TObjectPropertyDict = this.safeGetDict();
    return dict[keyName];
  }
}

export class PrivateMap<TBindObj extends  object = {}, TObjectPropertyDict extends object = {}> {
  private bindMap: WeakMap<TBindObj, TObjectPropertyDict> = new WeakMap<TBindObj, TObjectPropertyDict>();

  constructor() {
  }

  public setDict(bindObj: TBindObj, dict: TObjectPropertyDict): this {
    this.bindMap.set(bindObj, dict);
    return this;
  }

  public getDict(bindObj: TBindObj): TObjectPropertyDict | undefined {
    return this.bindMap.get(bindObj);
  }

  public safeGetDict(bindObj: TBindObj): TObjectPropertyDict {
    if (this.bindMap.has(bindObj)) {
      return this.bindMap.get(bindObj)!;
    }
    return {} as TObjectPropertyDict;
  }

  public setProperty<KeyName extends keyof TObjectPropertyDict>(
    bindObj: TBindObj,
    keyName: KeyName,
    value: TObjectPropertyDict[KeyName]
  ): this {
    const dict:TObjectPropertyDict = this.getDict(bindObj)!;
    dict[keyName] = value;
    return this;
  }

  public safeSetProperty<KeyName extends keyof TObjectPropertyDict>(
    bindObj: TBindObj,
    keyName: KeyName,
    value: TObjectPropertyDict[KeyName]
  ): this {
    const dict: TObjectPropertyDict = this.safeGetDict(bindObj);
    dict[keyName] = value;
    this.bindMap.set(bindObj, dict);
    return this;
  }

  public getProperty<KeyName extends keyof TObjectPropertyDict>(
    bindObj: TBindObj,
    keyName: KeyName
  ): TObjectPropertyDict[KeyName] {
    const dict: TObjectPropertyDict = this.getDict(bindObj)!;
    return dict[keyName];
  }

  public safeGetProperty<KeyName extends keyof TObjectPropertyDict>(
    bindObj: TBindObj,
    keyName: KeyName
  ): TObjectPropertyDict[KeyName] {
    const dict: TObjectPropertyDict = this.safeGetDict(bindObj)!;
    return dict[keyName];
  }

  public getSingleBindInstance(bindObj: TBindObj): SinglePrivateMap<TBindObj, TObjectPropertyDict> {
    return new SinglePrivateMap(bindObj, this);
  }
}
