export class TechnicianProfile {
  private _id: number;
  private _userId: number;
  private _specializations: string;
  private _skillLevel: number;
  private _currentStatus: string;
  private _currentLoadMinutes: number;
  private _activeTasksCount: number;

  constructor(
    id: number,
    userId: number,
    specializations: string,
    skillLevel: number,
    currentStatus: string,
    currentLoadMinutes: number,
    activeTasksCount: number
  ) {
    this._id = id;
    this._userId = userId;
    this._specializations = specializations;
    this._skillLevel = skillLevel;
    this._currentStatus = currentStatus;
    this._currentLoadMinutes = currentLoadMinutes;
    this._activeTasksCount = activeTasksCount;
  }

  get id(): number {
    return this._id;
  }

  get userId(): number {
    return this._userId;
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

  get currentLoadMinutes(): number {
    return this._currentLoadMinutes;
  }

  get activeTasksCount(): number {
    return this._activeTasksCount;
  }
}