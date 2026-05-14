import { assignedRepairTasksGateway } from "../../dataAccess/gateways/AssignedRepairTasksGateway";
import type { AssignedRepairTask } from "../entities/AssignedRepairTask";
import type { FaultTitle } from "../valueObjects/FaultDialog";

export class AssignedRepairTasksService {
  async getAll(): Promise<AssignedRepairTask[]> {
    return assignedRepairTasksGateway.getAll();
  }
    async create(
    originalRequestId: number,
    faultTitle: FaultTitle
  ): Promise<void> {
    return assignedRepairTasksGateway.create(originalRequestId, faultTitle);
  }
async startTask(taskId: number): Promise<void> {
  return assignedRepairTasksGateway.startTask(taskId);
}

async finishTask(taskId: number): Promise<void> {
  return assignedRepairTasksGateway.finishTask(taskId);
}


}

export const assignedRepairTasksService = new AssignedRepairTasksService();