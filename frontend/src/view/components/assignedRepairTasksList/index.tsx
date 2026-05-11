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
      <h2>Assigned repair tasks</h2>

      {tasks.map((item) => (
        <div key={item.task.id}>
          <h3>{item.selectedFault.title}</h3>

          <p>Task ID: {item.task.id}</p>
          <p>Original request ID: {item.task.originalRequestId}</p>
          <p>Department: {item.task.department}</p>
          <p>Floor: {item.task.floor}</p>
          <p>Room: {item.task.room}</p>
          <p>Fault code: {item.task.faultTypeCode}</p>
          <p>Category: {item.task.category}</p>
          <p>Complexity: {item.task.complexityLevel}</p>
          <p>Estimated repair time: {item.task.estimatedRepairMinutes} minutes</p>
          <p>Priority: {item.task.priority}</p>
          <p>Status: {item.task.status}</p>

          <h4>Assigned technician</h4>
          <p>Technician ID: {item.assignedTechnician.id}</p>
          <p>Specialization: {item.assignedTechnician.specializations}</p>
          <p>Skill level: {item.assignedTechnician.skillLevel}</p>
          <p>Status: {item.assignedTechnician.currentStatus}</p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default AssignedRepairTasksList;