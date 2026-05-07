export type WorkImpact =
  | 'CANNOT_WORK'
  | 'PARTIALLY_CAN_WORK'
  | 'CAN_WAIT'
  | 'NOT_URGENT';

export class CreateInitialRepairRequestDto {
  department!: string;
  floor!: number;
  room!: number;
  workImpact!: WorkImpact;
}
