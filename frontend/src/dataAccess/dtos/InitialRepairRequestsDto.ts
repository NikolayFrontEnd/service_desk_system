export type InitialRepairRequestsResponseDto = {
  message: string;
  requests: {
    id: number;
    department: string;
    floor: number;
    room: number;
    workImpact: string;
  }[];
};