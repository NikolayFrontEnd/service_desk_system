import type { TechnicianAssignedRepairTask } from "../../../domain/entities/TechnicianAssignedRepairTask";
import {
  categoryLabels,
  priorityLabels,
  taskStatusLabels,
  faultTypeLabels,
  getLabel,
} from "../../../domain/valueObjects/RepairTaskLabels";

type TechnicianTasksListProps = {
  tasks: TechnicianAssignedRepairTask[];
  onItemClick: (id: number) => void;
};

const TechnicianTasksList = ({
  tasks,
  onItemClick,
}: TechnicianTasksListProps) => {
  return (
    <div>
      <h2>Мои ремонтные задачи</h2>

      {tasks.length === 0 && <p>У вас нет назначенных задач.</p>}

      {tasks.map((task) => (
        <div key={task.id} onClick={() => onItemClick(task.id)}>
          <h3>{getLabel(faultTypeLabels, task.faultTypeCode)}</h3>

          <p>Номер задачи: {task.id}</p>
          <p>Номер исходной заявки: {task.originalRequestId}</p>
          <p>Отдел: {task.department}</p>
          <p>Этаж: {task.floor}</p>
          <p>Кабинет: {task.room}</p>
          <p>Категория: {getLabel(categoryLabels, task.category)}</p>
          <p>Сложность: {task.complexityLevel}</p>
          <p>Примерное время ремонта: {task.estimatedRepairMinutes} минут</p>
          <p>Приоритет: {getLabel(priorityLabels, task.priority)}</p>
          <p>Статус: {getLabel(taskStatusLabels, task.status)}</p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default TechnicianTasksList;