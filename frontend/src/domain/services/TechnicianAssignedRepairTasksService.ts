import { technicianAssignedRepairTasksGateway } from "../../dataAccess/gateways/TechnicianAssignedRepairTasksGateway";
import type { TechnicianAssignedRepairTasksResult } from "../entities/TechnicianAssignedRepairTasksResult";

export class TechnicianAssignedRepairTasksService {
  async getMyTasks(): Promise<TechnicianAssignedRepairTasksResult> {
    return technicianAssignedRepairTasksGateway.getMyTasks();
  }
}

export const technicianAssignedRepairTasksService =
  new TechnicianAssignedRepairTasksService();