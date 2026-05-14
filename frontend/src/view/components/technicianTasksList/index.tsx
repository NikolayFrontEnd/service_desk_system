import type { TechnicianAssignedRepairTask } from "../../../domain/entities/TechnicianAssignedRepairTask";

type TechnicianTasksListProps = {
  tasks: TechnicianAssignedRepairTask[];
};

const TechnicianTasksList = ({ tasks }: TechnicianTasksListProps) => {
  return (
    <div>
      <h2>My assigned repair tasks</h2>

      {tasks.length === 0 && <p>You have no assigned tasks.</p>}

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

          <hr />
        </div>
      ))}
    </div>
  );
};

export default TechnicianTasksList;