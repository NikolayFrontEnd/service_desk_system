export class TechnicianAssignedRepairTask {
  private _id: number;
  private _originalRequestId: number;
  private _department: string;
  private _floor: number;
  private _room: number;
  private _faultTypeCode: string;
  private _category: string;
  private _complexityLevel: number;
  private _estimatedRepairMinutes: number;
  private _priority: string;
  private _assignedTechnicianId: number;
  private _createdAt: number;
  private _startedAt: string | null;
  private _status: string;

  constructor(
    id: number,
    originalRequestId: number,
    department: string,
    floor: number,
    room: number,
    faultTypeCode: string,
    category: string,
    complexityLevel: number,
    estimatedRepairMinutes: number,
    priority: string,
    assignedTechnicianId: number,
    createdAt: number,
    startedAt: string | null,
    status: string
  ) {
    this._id = id;
    this._originalRequestId = originalRequestId;
    this._department = department;
    this._floor = floor;
    this._room = room;
    this._faultTypeCode = faultTypeCode;
    this._category = category;
    this._complexityLevel = complexityLevel;
    this._estimatedRepairMinutes = estimatedRepairMinutes;
    this._priority = priority;
    this._assignedTechnicianId = assignedTechnicianId;
    this._createdAt = createdAt;
    this._startedAt = startedAt;
    this._status = status;
  }

  get id(): number {
    return this._id;
  }

  get originalRequestId(): number {
    return this._originalRequestId;
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

  get faultTypeCode(): string {
    return this._faultTypeCode;
  }

  get category(): string {
    return this._category;
  }

  get complexityLevel(): number {
    return this._complexityLevel;
  }

  get estimatedRepairMinutes(): number {
    return this._estimatedRepairMinutes;
  }

  get priority(): string {
    return this._priority;
  }

  get assignedTechnicianId(): number {
    return this._assignedTechnicianId;
  }

  get createdAt(): number {
    return this._createdAt;
  }

  get startedAt(): string | null {
    return this._startedAt;
  }

  get status(): string {
    return this._status;
  }
}