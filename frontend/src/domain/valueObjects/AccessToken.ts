export class AccessToken {
  private _value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error("Access token cannot be empty");
    }

    this._value = value;
  }

  toString(): string {
    return this._value;
  }
}