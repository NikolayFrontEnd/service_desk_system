import type { WorkImpact } from "../../domain/valueObjects/WorkImpact";

export type CreateInitialRepairRequestRequestDto = {
  workImpact: WorkImpact;
};

export type CreateInitialRepairRequestResponseDto = {
  message: string;
};