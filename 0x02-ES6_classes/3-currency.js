export default class Currency {
  constructor(code, name) {
    this.name = name;
    this.code = code;
  }

  get name() {
    return this._name;
  }

  get code() {
    return this._code;
  }

  set name(value) {
    if (typeof value != 'string') {
      throw new TypeError('Name must be a string');
    } else {
      this._name = value;
    }
  }

  set code(value) {
    if (typeof code != 'string') {
      throw new TypeError('Code must be a string');
    } else {
      this._code = value;
    }
  }

  displayFullCurrency() {
    return `${this._name} (${this._code})`;
  }
}
