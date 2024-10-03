export default class HolbertonCourse {
  constructor(name, length, students) {
    this._name = name;
    this._lenght = length;
    this._students = students;
  }

  get name() {
    return this._name;
  }

  get length() {
    return this._length;
  }

  get students() {
    return this._students;
  }

  set name(value) {
    if (typeof value != 'string') {
      throw new TypeError('Name must be a string');
    } else {
      this._name = value;
    }
  }

  set length(value) {
    if (typeof value != 'number') {
      throw new TypeError('Length must be a numbe');
    } else {
      this._length = value;
    }
  }

  set students(value) {
    if (!(value instanceof Array)) {
      throw new TypeError('Students must be an array of strings');
    }
    if (!value.every((student) => typeof student === 'string')) {
      throw new TypeError('Students must be an array of strings');
    }
    this._students = value;
  }
}
