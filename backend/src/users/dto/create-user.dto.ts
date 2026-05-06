export type UserRole = 'EMPLOYEE' | 'SUPPORT' | 'TECHNICIAN';

export class CreateUserDto {
  name!: string;
  email!: string;
  password!: string;
  role!: UserRole;

  employee?: {
    department: string;
    floor: number;
    room: number;
  };

  technician?: {
    specializations: string;
    skillLevel: number;
    experienceYears: number;
    currentStatus: string;
    currentLoadMinutes: number;
    activeTasksCount: number;
    maxDailyLoadMinutes: number;
    currentDepartment: string;
  };
}
