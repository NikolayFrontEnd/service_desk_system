export type AssignedRepairTasksResponseDto = {
  message: string;
  tasks: {
    task: {
      id: number;
      originalRequestId: number;
      department: string;
      floor: number;
      room: number;
      faultTypeCode: string;
      category: string;
      complexityLevel: number;
      estimatedRepairMinutes: number;
      priority: string;
      assignedTechnicianId: number;
      createdAt: number;
      startedAt: string | null;
      status: string;
    };

    technician: {
      id: number;
      userId: number;
      name: string;
      specializations: string;
      skillLevel: number;
      currentStatus: string;
    };
  }[];
};