//inspired by https://github.com/mathieumg/i18next-callback-backend/tree/initial_version
export default class CustomCallbackBackend {
  static type = "backend";

  constructor(...args) {
    this.init(...args);
  }

  create(...args) {
    this.options.customCreate(...args);
  }

  missingCustomCallback(callbackType) {
    return (language, namespace, callback) => callback(new Error(
      `You must provide a "custom${callbackType}" option with the ` +
      `"CustomCallbackBackend".`,
    ));
  }

  init(services, options = {}, i18nextOptions = {}) {
    this.options = {
      customCreate: () => {},
      customLoad: this.missingCustomCallback("Load"),
      customLoadMulti: this.missingCustomCallback("LoadMulti"),
      ...i18nextOptions,
      ...options,
    };
  }

  read(...args) {
    this.options.customLoad(...args);
  }

  readMulti(...args) {
    this.options.customLoadMulti(...args);
  }
}
