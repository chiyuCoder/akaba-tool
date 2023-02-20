export class OptionNullSetter<T> {
  public readonly bindObj: T | null | undefined;
  public whenNull?: any;

  constructor(bindObj: T | null | undefined) {
    this.bindObj = bindObj;
  }

  public setNullOption(whenNull: any): this {
     this.whenNull = whenNull;
     return this;
  }

  public getValue(): T {
    return (this.bindObj ?? this.whenNull);
  }

  public getProperty<K extends keyof T>(propertyName: K): OptionNullSetter<T[K]> {
    return new OptionNullSetter(this.getValue()[propertyName]);
  }

  public static bind<T>(obj: T | null | undefined): OptionNullSetter<T> {
    return new OptionNullSetter(obj);
  }
}
