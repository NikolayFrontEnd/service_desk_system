import axios from "axios";
import type { TechnicianAssignedRepairTasksResponseDto } from "../dtos/TechnicianAssignedRepairTasksDto";
import { TechnicianProfile } from "../../domain/entities/TechnicianProfile";
import { TechnicianAssignedRepairTask } from "../../domain/entities/TechnicianAssignedRepairTask";
import { TechnicianAssignedRepairTasksResult } from "../../domain/entities/TechnicianAssignedRepairTasksResult";

export class TechnicianAssignedRepairTasksGateway {
  private readonly API_BASE_URL = "http://localhost:3000";

  async getMyTasks(): Promise<TechnicianAssignedRepairTasksResult> {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const { data } = await axios.get<TechnicianAssignedRepairTasksResponseDto>(
        `${this.API_BASE_URL}/users/my-assigned-repair-tasks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const technician = new TechnicianProfile(
        data.technician.id,
        data.technician.userId,
        data.technician.specializations,
        data.technician.skillLevel,
        data.technician.currentStatus,
        data.technician.currentLoadMinutes,
        data.technician.activeTasksCount
      );

      const tasks = data.tasks.map(
        (task) =>
          new TechnicianAssignedRepairTask(
            task.id,
            task.originalRequestId,
            task.department,
            task.floor,
            task.room,
            task.faultTypeCode,
            task.category,
            task.complexityLevel,
            task.estimatedRepairMinutes,
            task.priority,
            task.assignedTechnicianId,
            task.createdAt,
            task.startedAt,
            task.status
          )
      );

      return new TechnicianAssignedRepairTasksResult(technician, tasks);
    } catch {
      throw new Error("Failed to load technician assigned repair tasks");
    }
  }
}

export const technicianAssignedRepairTasksGateway =
  new TechnicianAssignedRepairTasksGateway();