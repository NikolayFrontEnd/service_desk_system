type AssignedRepairTaskItem = {
  task: {
    id: number;
    originalRequestId: number;
    department: string;
    floor: number;
    room: number;
    faultTypeCode: string;
    category: string;
    complexityLevel: number;
    estimatedRepairMinutes: number;
    priority: string;
    assignedTechnicianId: number;
    createdAt: number;
    startedAt: number | null;
    status: string;
  };

  selectedFault: {
    title: string;
    code: string;
    category: string;
    complexity: number;
    estimatedRepairMinutes: number;
  };

  assignedTechnician: {
    id: number;
    userId: number;
    specializations: string;
    skillLevel: number;
    currentStatus: string;
  };
};

type AssignedRepairTasksListProps = {
  tasks: AssignedRepairTaskItem[];
};

const AssignedRepairTasksList = ({ tasks }: AssignedRepairTasksListProps) => {
  return (
    <div>
      <h2>Назначенные ремонтные задачи</h2>

      {tasks.map((item) => (
        <div key={item.task.id}>
          <h3>{item.selectedFault.title}</h3>


          <p>Department: {item.task.department}</p>
          <p>Floor: {item.task.floor}</p>
          <p>Room: {item.task.room}</p>
          <p>Category: {item.task.category}</p>
          <p>Complexity: {item.task.complexityLevel}</p>
          <p>Estimated repair time: {item.task.estimatedRepairMinutes} минут</p>
          <p>Priority: {item.task.priority}</p>
          <p>Status: {item.task.status}</p>

          <h4>Назначенный ремонтник</h4>
          <p>Специализация: {item.assignedTechnician.specializations}</p>
          <p>Уровень навыков: {item.assignedTechnician.skillLevel}</p>
          <p>Статус: {item.assignedTechnician.currentStatus}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AssignedRepairTasksList;