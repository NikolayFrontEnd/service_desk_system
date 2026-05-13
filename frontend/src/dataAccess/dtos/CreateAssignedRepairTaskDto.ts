import type { FaultTitle } from "../../domain/valueObjects/FaultDialog";

export type CreateAssignedRepairTaskRequestDto = {
  originalRequestId: number;
  faultTitle: FaultTitle;
};

export type CreateAssignedRepairTaskResponseDto = {
  message: string;
};