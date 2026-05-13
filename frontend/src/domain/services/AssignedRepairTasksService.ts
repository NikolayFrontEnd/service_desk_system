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
}

export const assignedRepairTasksService = new AssignedRepairTasksService();