type InitialRepairRequestItem = {
  request: {
    id: number;
    department: string;
    floor: number;
    room: number;
    workImpact: string;
  };
};

type InitialRepairRequestsListProps = {
  requests: InitialRepairRequestItem[];
};

const InitialRepairRequestsList = ({
  requests,
}: InitialRepairRequestsListProps) => {
  return (
    <div>
      <h2>Initial repair requests</h2>

      {requests.map((item) => (
        <div key={item.request.id}>
          <p>Request ID: {item.request.id}</p>
          <p>Department: {item.request.department}</p>
          <p>Floor: {item.request.floor}</p>
          <p>Room: {item.request.room}</p>
          <p>Work impact: {item.request.workImpact}</p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default InitialRepairRequestsList;