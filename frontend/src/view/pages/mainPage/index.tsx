import { useEffect, useState } from "react";
import UserHeader from "../../components/userHeader";
import Button from "../../primitives/button";
import InitialRepairRequestsList from "../../components/initialRepairRequestsList";
import AssignedRepairTasksList from "../../components/assignedRepairTasksList";

type User = {
  id: number;
  name: string;
  role: string;
};
const initialRepairRequestsList = [
  {
    request: {
      id: 1,
      department: "Бухгалтерия",
      floor: 2,
      room: 214,
      workImpact: "CANNOT_WORK",
    },
  },
  {
    request: {
      id: 2,
      department: "Отдел кадров",
      floor: 3,
      room: 305,
      workImpact: "CAN_WORK_PARTLY",
    },
  },
  {
    request: {
      id: 3,
      department: "Учебный отдел",
      floor: 1,
      room: 101,
      workImpact: "CAN_WORK",
    },
  },
];



const assignedRepairTasksList = [
  {
    task: {
      id: 1,
      originalRequestId: 1,
      department: "Бухгалтерия",
      floor: 2,
      room: 214,
      faultTypeCode: "NO_POWER",
      category: "HARDWARE",
      complexityLevel: 3,
      estimatedRepairMinutes: 90,
      priority: "HIGH",
      assignedTechnicianId: 1,
      createdAt: 1778311827,
      startedAt: null,
      status: "ASSIGNED",
    },
    selectedFault: {
      title: "Компьютер не включается",
      code: "NO_POWER",
      category: "HARDWARE",
      complexity: 3,
      estimatedRepairMinutes: 90,
    },
    assignedTechnician: {
      id: 1,
      userId: 12,
      specializations: "HARDWARE",
      skillLevel: 5,
      currentStatus: "AVAILABLE",
    },
  },
  {
    task: {
      id: 2,
      originalRequestId: 2,
      department: "Отдел кадров",
      floor: 3,
      room: 305,
      faultTypeCode: "STORAGE_FAILURE",
      category: "HARDWARE",
      complexityLevel: 3,
      estimatedRepairMinutes: 180,
      priority: "MEDIUM",
      assignedTechnicianId: 2,
      createdAt: 1778312000,
      startedAt: null,
      status: "ASSIGNED",
    },
    selectedFault: {
      title: "Неисправность HDD/SSD",
      code: "STORAGE_FAILURE",
      category: "HARDWARE",
      complexity: 3,
      estimatedRepairMinutes: 180,
    },
    assignedTechnician: {
      id: 2,
      userId: 15,
      specializations: "HARDWARE",
      skillLevel: 4,
      currentStatus: "BUSY",
    },
  },
  {
    task: {
      id: 3,
      originalRequestId: 3,
      department: "Учебный отдел",
      floor: 1,
      room: 101,
      faultTypeCode: "OS_FAILURE",
      category: "SOFTWARE",
      complexityLevel: 2,
      estimatedRepairMinutes: 60,
      priority: "LOW",
      assignedTechnicianId: 3,
      createdAt: 1778312300,
      startedAt: null,
      status: "ASSIGNED",
    },
    selectedFault: {
      title: "Ошибка операционной системы",
      code: "OS_FAILURE",
      category: "SOFTWARE",
      complexity: 2,
      estimatedRepairMinutes: 60,
    },
    assignedTechnician: {
      id: 3,
      userId: 18,
      specializations: "SOFTWARE",
      skillLevel: 4,
      currentStatus: "AVAILABLE",
    },
  },
];

const MainPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <> 
    
<UserHeader name = {user.name} role = {user.role}/>
{user.role === "EMPLOYEE" && (
  <Button>Создать заявку на поломку</Button>
)}
<InitialRepairRequestsList requests={initialRepairRequestsList} />
<AssignedRepairTasksList tasks={assignedRepairTasksList} />
      </>
  );
};

export default MainPage;