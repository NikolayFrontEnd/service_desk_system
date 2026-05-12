export type WorkImpact =
  | 'CANNOT_WORK'
  | 'PARTIALLY_CAN_WORK'
  | 'CAN_WAIT'
  | 'NOT_URGENT';

export class CreateInitialRepairRequestDto {

  workImpact!: WorkImpact;
}
