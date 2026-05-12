export class InitialRepairRequest {
  private _id: number;
  private _department: string;
  private _floor: number;
  private _room: number;
  private _workImpact: string;

  constructor(
    id: number,
    department: string,
    floor: number,
    room: number,
    workImpact: string
  ) {
    this._id = id;
    this._department = department;
    this._floor = floor;
    this._room = room;
    this._workImpact = workImpact;
  }

  get id(): number {
    return this._id;
  }

  get department(): string {
    return this._department;
  }

  get floor(): number {
    return this._floor;
  }

  get room(): number {
    return this._room;
  }

  get workImpact(): string {
    return this._workImpact;
  }
}