export class User {
  private _id: number;
  private _name: string;
  private _role: string;

  constructor(id: number, name: string, role: string) {
    this._id = id;
    this._name = name;
    this._role = role;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get role(): string {
    return this._role;
  }

  get isEmployee(): boolean {
    return this._role === "EMPLOYEE";
  }

  get isTechnician(): boolean {
    return this._role === "TECHNICIAN";
  }

  get isSupport(): boolean {
    return this._role === "SUPPORT";
  }
}