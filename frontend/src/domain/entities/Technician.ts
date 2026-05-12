export class Technician {
  constructor(
    private _id: number,
    private _userId: number,
    private _name: string,
    private _specializations: string,
    private _skillLevel: number,
    private _currentStatus: string
  ) {}

  get id(): number {
    return this._id;
  }

  get userId(): number {
    return this._userId;
  }

  get name(): string {
    return this._name;
  }

  get specializations(): string {
    return this._specializations;
  }

  get skillLevel(): number {
    return this._skillLevel;
  }

  get currentStatus(): string {
    return this._currentStatus;
  }
}