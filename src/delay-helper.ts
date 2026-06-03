export function delay(delayTime: number = 16): Promise<void> {
    return new Promise((resolve) => {
       setTimeout(() => {
           resolve();
       }, delayTime);
    });
}

export {
  debounce,
  throttle,
} from "./debounce";

/**
 * @since 1.4.17
 */
export class DelayRunHelper {
  private timeoutId: number = 0;
  /**
   * @description unit: ms
   */
  public timeOut: number = 200;

  public callbackFunc: () => void = function () {
    // noop
  };

  public constructor(
    initTimeOut = 200,
    initCallback?: () => void
  ) {
    this.timeoutId = initTimeOut;
    this.callbackFunc = initCallback || (() => {
      // noop
    });
  }

  public updateCallback(callbackNew: () => void) {
    this.callbackFunc = callbackNew;
    return this;
  }

  public setTimeOut(timeOutNew: number) {
    this.timeOut = timeOutNew;
    return this;
  }

  public delayToRun(callbackNew?: () => void) {
    if (callbackNew) {
      this.updateCallback(callbackNew);
    }
    if (this.timeoutId) {
      this.initTimeId();
    }
    this.timeoutId = setTimeout(() => {
      this.callbackFunc();
    }, this.timeOut) as any;
  }

  public initTimeId() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = 0;
  }
}

/**
 * @since 1.4.17
 */
export function useDelayRunHelper(
  timeOut = 200,
  initCallback?: () => void
) {
  return new DelayRunHelper(timeOut, initCallback);
}
