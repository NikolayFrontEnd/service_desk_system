export const userRoleLabels: Record<string, string> = {
  EMPLOYEE: "Работник предприятия",
  TECHNICIAN: "Компьютерный мастер",
  SUPPORT: "Специалист техподдержки",
};

export const getUserRoleLabel = (role: string): string => {
  return userRoleLabels[role] ?? role;
};