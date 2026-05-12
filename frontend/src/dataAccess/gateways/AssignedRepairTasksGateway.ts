import axios from "axios";
import type { AssignedRepairTasksResponseDto } from "../dtos/AssignedRepairTasksDto";
import { AssignedRepairTask } from "../../domain/entities/AssignedRepairTask";
import { Technician } from "../../domain/entities/Technician";

export class AssignedRepairTasksGateway {
  private readonly API_BASE_URL = "http://localhost:3000";

  async getAll(): Promise<AssignedRepairTask[]> {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const { data } = await axios.get<AssignedRepairTasksResponseDto>(
        `${this.API_BASE_URL}/assigned-repair-tasks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return data.tasks.map((item) => {
        const technician = new Technician(
          item.technician.id,
          item.technician.userId,
          item.technician.name,
          item.technician.specializations,
          item.technician.skillLevel,
          item.technician.currentStatus
        );

        return new AssignedRepairTask(
          item.task.id,
          item.task.originalRequestId,
          item.task.department,
          item.task.floor,
          item.task.room,
          item.task.faultTypeCode,
          item.task.category,
          item.task.complexityLevel,
          item.task.estimatedRepairMinutes,
          item.task.priority,
          item.task.assignedTechnicianId,
          item.task.createdAt,
          item.task.startedAt,
          item.task.status,
          technician
        );
      });
    } catch {
      throw new Error("Failed to load assigned repair tasks");
    }
  }
}

export const assignedRepairTasksGateway = new AssignedRepairTasksGateway();