import type { InitialRepairRequest } from "../../../domain/entities/InitialRepairRequest";
import styles from "./index.module.css";

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
        <div
          className={styles.listItem}
          key={request.id}
          onClick={() => onItemClick(request.id)}
        >
          <p>Отдел: {request.department}</p>
          <p>Этаж: {request.floor}</p>
          <p>Комната: {request.room}</p>
          <p>Влияние на работу: {request.workImpact}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default InitialRepairRequestsList;