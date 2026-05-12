export class Technician {
  private _id: number;
  private _userId: number;
  private _name: string;
  private _specializations: string;
  private _skillLevel: number;
  private _currentStatus: string;

  constructor(
    id: number,
    userId: number,
    name: string,
    specializations: string,
    skillLevel: number,
    currentStatus: string
  ) {
    this._id = id;
    this._userId = userId;
    this._name = name;
    this._specializations = specializations;
    this._skillLevel = skillLevel;
    this._currentStatus = currentStatus;
  }

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