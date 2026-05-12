import type { AssignedRepairTask } from "../../../domain/entities/AssignedRepairTask";

type AssignedRepairTasksListProps = {
  tasks: AssignedRepairTask[];
};

const AssignedRepairTasksList = ({ tasks }: AssignedRepairTasksListProps) => {
  return (
    <div>
      <h2>Assigned repair tasks</h2>

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.faultTypeCode}</h3>

          <p>Task ID: {task.id}</p>
          <p>Original request ID: {task.originalRequestId}</p>
          <p>Department: {task.department}</p>
          <p>Floor: {task.floor}</p>
          <p>Room: {task.room}</p>
          <p>Category: {task.category}</p>
          <p>Complexity: {task.complexityLevel}</p>
          <p>Estimated repair time: {task.estimatedRepairMinutes} minutes</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>

          <h4>Technician</h4>
          <p>Name: {task.technician.name}</p>
          <p>Specializations: {task.technician.specializations}</p>
          <p>Skill level: {task.technician.skillLevel}</p>
          <p>Status: {task.technician.currentStatus}</p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default AssignedRepairTasksList;