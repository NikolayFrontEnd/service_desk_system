export class InitialRepairRequest {
  constructor(
    private _id: number,
    private _department: string,
    private _floor: number,
    private _room: number,
    private _workImpact: string
  ) {}

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