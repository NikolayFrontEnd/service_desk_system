export type CreateAssignedRepairTaskRequestDto = {
  originalRequestId: number;
  faultTitle: string;
};

export type CreateAssignedRepairTaskResponseDto = {
  message: string;
};
