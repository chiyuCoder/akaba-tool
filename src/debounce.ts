
// /** Error message constants. */
const FUNC_ERROR_TEXT = "Expected a function";
//
// /* Built-in method references for those with the same name as other `lodash` methods. */
// var nativeMax = Math.max,
//   nativeMin = Math.min;

export interface DebounceSettings {
  /**
   * @see _.leading
   */
  leading?: boolean;
  /**
   * @see _.maxWait
   */
  maxWait?: number;
  /**
   * @see _.trailing
   */
  trailing?: boolean;
}

export interface DebounceSettingsLeading extends DebounceSettings {
  leading: true;
}

export interface  DebouncedFunc<T extends (...args: Array<any>) => any> {
/**
 * Call the original function, but applying the debounce rules.
 *
 * If the debounced function can be run immediately, this calls it and returns its return
 * value.
 *
 * Otherwise, it returns the return value of the last invocation, or undefined if the debounced
 * function was not invoked yet.
 */
(...args: Parameters<T>): ReturnType<T> | undefined;

/**
 * Throw away any pending invocation of the debounced function.
 */
cancel(): void;

/**
 * If there is a pending invocation of the debounced function, invoke it immediately and return
 * its return value.
 *
 * Otherwise, return the value from the last invocation, or undefined if the debounced function
 * was never invoked.
 */
flush(): ReturnType<T> | undefined;
}

export interface DebouncedFuncLeading<T extends (...args: Array<any>) => any> extends DebouncedFunc<T> {
  (...args: Parameters<T>): ReturnType<T>;
  flush(): ReturnType<T>;
}
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced. cancel);
 */
export function debounce<T extends (...args: any) => any>(func: T, wait: number | undefined, options: DebounceSettingsLeading): DebouncedFuncLeading<T>
export function debounce<T extends (...args: any) => any>(func: T, wait?: number, options?: DebounceSettings): DebouncedFunc<T> {
  let lastArgs: Parameters<T> | undefined;
  let lastThis: ThisType<T> | undefined;
  let maxWait: number | undefined;
  let result: ReturnType<T> | undefined;
  let timerId: number | undefined |  NodeJS.Timeout;
  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  if (typeof func !== "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = Number(wait) || 0;
  if (options) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time: number): ReturnType<T> {
    let args = lastArgs,
      thisArg = lastThis;

    lastArgs = undefined;
    lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args!);
    return (result!);
  }

  function leadingEdge(time: number) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time: number) {
    let timeSinceLastCall = time - (lastCallTime!),
      timeSinceLastInvoke = time - lastInvokeTime,
      timeWaiting = (wait!) - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, (maxWait!) - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time: number) {
    let timeSinceLastCall = time - (lastCallTime!);
    let timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped
    // ,and we're at the trailing edge, the system time has gone backwards
    // ,and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= (wait!)) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= (maxWait!)));
  }

  function timerExpired() {
    let time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time: number) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = undefined;
    lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function debounced(...args: Parameters<T>) {
    let time = Date.now();
    let isInvoking = shouldInvoke(time);

    lastArgs = args;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this ;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
