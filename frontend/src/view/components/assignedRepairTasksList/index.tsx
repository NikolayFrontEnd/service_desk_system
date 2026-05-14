import type { AssignedRepairTask } from "../../../domain/entities/AssignedRepairTask";
import {
  categoryLabels,
  priorityLabels,
  taskStatusLabels,
  technicianStatusLabels,
  faultTypeLabels,
  getLabel,
  getSpecializationsLabel,
} from "../../../domain/valueObjects/RepairTaskLabels";

type AssignedRepairTasksListProps = {
  tasks: AssignedRepairTask[];
};

const AssignedRepairTasksList = ({ tasks }: AssignedRepairTasksListProps) => {
  return (
    <div>
      <h2>Назначенные ремонтные задачи</h2>

      {tasks.map((task) => (
        <div key={task.id}>
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

          <h4>Ремонтник</h4>
          <p>Имя: {task.technician.name}</p>
          <p>
            Специализации:{" "}
            {getSpecializationsLabel(task.technician.specializations)}
          </p>
          <p>Уровень навыка: {task.technician.skillLevel}</p>
          <p>
            Статус:{" "}
            {getLabel(technicianStatusLabels, task.technician.currentStatus)}
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default AssignedRepairTasksList;