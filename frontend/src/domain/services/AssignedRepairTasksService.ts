import { assignedRepairTasksGateway } from "../../dataAccess/gateways/AssignedRepairTasksGateway";
import type { AssignedRepairTask } from "../entities/AssignedRepairTask";

export class AssignedRepairTasksService {
  async getAll(): Promise<AssignedRepairTask[]> {
    return assignedRepairTasksGateway.getAll();
  }
}

export const assignedRepairTasksService = new AssignedRepairTasksService();