import type { InitialRepairRequest } from "../../../domain/entities/InitialRepairRequest";
import {
  getLabel,
  workImpactLabels,
} from "../../../domain/valueObjects/RepairTaskLabels";

type InitialRepairRequestsListProps = {
  requests: InitialRepairRequest[];
  onItemClick: (id: number) => void;
};

const InitialRepairRequestsList = ({
  requests,
  onItemClick,
}: InitialRepairRequestsListProps) => {
  return (
    <div>
      <h2>Первичные заявки о поломках</h2>

      {requests.map((request) => (
        <div key={request.id} onClick={() => onItemClick(request.id)}>
          <p>Отдел: {request.department}</p>
          <p>Этаж: {request.floor}</p>
          <p>Кабинет: {request.room}</p>
          <p>
            Влияние на работу:{" "}
            {getLabel(workImpactLabels, request.workImpact)}
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default InitialRepairRequestsList;