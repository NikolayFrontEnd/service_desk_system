import { useState } from "react";
import Dialog from "../../primitives/dialog";
import Button from "../../primitives/button";

type WorkImpact = "CANNOT_WORK" | "PARTIALLY_CAN_WORK" | "CAN_WAIT" | "NOT_URGENT";

const workImpactOptions: { value: WorkImpact; label: string }[] = [
  {
    value: "CANNOT_WORK",
    label: "Не могу продолжать работу",
  },
  {
    value: "PARTIALLY_CAN_WORK",
    label: "Могу работать частично",
  },
  {
    value: "CAN_WAIT",
    label: "Могу подождать",
  },
  {
    value: "NOT_URGENT",
    label: "Не срочно",
  },
];

type CreateInitialRepairRequestDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateInitialRepairRequestDialog = ({
  isOpen,
  onClose,
}: CreateInitialRepairRequestDialogProps) => {
  const [selectedWorkImpact, setSelectedWorkImpact] =
    useState<WorkImpact | null>(null);

  const handleCreateRequest = () => {
    console.log("Send to backend:", {
      workImpact: selectedWorkImpact,
    });
  };

  return (
    <Dialog
      isOpen={isOpen}
      title="Создать заявку на поломку"
      onClose={onClose}
    >
      <div>Как поломка влияет на вашу работу?</div>

      {workImpactOptions.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="workImpact"
            value={option.value}
            checked={selectedWorkImpact === option.value}
            onChange={() => setSelectedWorkImpact(option.value)}
          />

          {option.label}
        </label>
      ))}

      <Button onClick={handleCreateRequest}>
       Сообщить о поломке
      </Button>
    </Dialog>
  );
};

export default CreateInitialRepairRequestDialog;