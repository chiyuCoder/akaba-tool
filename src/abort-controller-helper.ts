export class AbortControllerHelper {
  public abortController: AbortController = new AbortController();

  public update() {
    this.abortController = new AbortController();
    return this;
  }

  public abort() {
    this.abortController.abort();
    return this;
  }

  public abortThenNew() {
    return this.abort().update();
  }

  public getController() {
    return this.abortController;
  }
}


export function useAbortControllerHelper() {
  const targetHelper = new AbortControllerHelper();

  function getCurrentOne(): null | AbortController {
    return targetHelper.getController();
  }

  function useNewOne(): AbortController {
    return targetHelper.update().getController();
  }

  function abort(reason?: any) {
    targetHelper.abort();
  }

  function abortThenNew(reason?: any): AbortController {
    abort(reason);
    return useNewOne();
  }

  return {
    getCurrentOne,
    abort,
    useNewOne,
    abortThenNew,
    targetHelper,
  };
}