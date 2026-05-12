export type WorkImpact =
  | "CANNOT_WORK"
  | "PARTIALLY_CAN_WORK"
  | "CAN_WAIT"
  | "NOT_URGENT";

export const workImpactOptions: { value: WorkImpact; label: string }[] = [
  {
    value: "CANNOT_WORK",
    label: "Не могу продолжать работу",
  },
  {
    value: "PARTIALLY_CAN_WORK",
    label: "Могу работать частично",
  },
  {
    value: "CAN_WAIT",
    label: "Могу подождать",
  },
  {
    value: "NOT_URGENT",
    label: "Не срочно",
  },
];