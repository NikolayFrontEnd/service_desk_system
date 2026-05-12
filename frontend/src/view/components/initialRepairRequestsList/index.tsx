import type { InitialRepairRequest } from "../../../domain/entities/InitialRepairRequest";

type InitialRepairRequestsListProps = {
  requests: InitialRepairRequest[];
};

const InitialRepairRequestsList = ({
  requests,
}: InitialRepairRequestsListProps) => {
  return (
    <div>
      <h2>Initial repair requests</h2>

      {requests.map((request) => (
        <div key={request.id}>
          <p>ID: {request.id}</p>
          <p>Department: {request.department}</p>
          <p>Floor: {request.floor}</p>
          <p>Room: {request.room}</p>
          <p>Work impact: {request.workImpact}</p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default InitialRepairRequestsList;