interface AbortList {
  [key: string]: AbortController;
}

class AdvancedAbortController {
  private urlKeyList: AbortList = {};

  getSignal = (url: string): AbortSignal => {
    const urlKey = url.split('?')[0];
    if (this.urlKeyList[urlKey]) {
      this.urlKeyList[urlKey].abort();
    }
    this.urlKeyList[urlKey] = new AbortController();
    return this.urlKeyList[urlKey]?.signal;
  };
}

export default new AdvancedAbortController();
