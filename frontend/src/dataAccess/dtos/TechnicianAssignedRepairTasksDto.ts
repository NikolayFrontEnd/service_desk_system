export type TechnicianAssignedRepairTasksResponseDto = {
  message: string;

  technician: {
    id: number;
    userId: number;
    specializations: string;
    skillLevel: number;
    currentStatus: string;
    currentLoadMinutes: number;
    activeTasksCount: number;
  };

  tasks: {
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
  }[];
};