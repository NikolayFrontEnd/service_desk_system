import type { TechnicianProfile } from "./TechnicianProfile";
import type { TechnicianAssignedRepairTask } from "./TechnicianAssignedRepairTask";

export class TechnicianAssignedRepairTasksResult {
  private _technician: TechnicianProfile;
  private _tasks: TechnicianAssignedRepairTask[];

  constructor(
    technician: TechnicianProfile,
    tasks: TechnicianAssignedRepairTask[]
  ) {
    this._technician = technician;
    this._tasks = tasks;
  }

  get technician(): TechnicianProfile {
    return this._technician;
  }

  get tasks(): TechnicianAssignedRepairTask[] {
    return this._tasks;
  }
}