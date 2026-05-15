import { useState } from "react";
import Dialog from "../../primitives/dialog";
import Button from "../../primitives/button";
import styles from "./index.module.css";
import {
  type WorkImpact,
  workImpactOptions,
} from "../../../domain/valueObjects/WorkImpact";

type CreateInitialRepairRequestDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateRequest: (workImpact: WorkImpact) => Promise<void>;
};

const CreateInitialRepairRequestDialog = ({
  isOpen,
  onClose,
  onCreateRequest,
}: CreateInitialRepairRequestDialogProps) => {
  const [selectedWorkImpact, setSelectedWorkImpact] =
    useState<WorkImpact | null>(null);

  const handleCreateRequest = async () => {
    if (!selectedWorkImpact) {
      console.log("Please choose work impact");
      return;
    }

    await onCreateRequest(selectedWorkImpact);
  };

  return (
    <Dialog
      isOpen={isOpen}
      title="Создать заявку на поломку"
      onClose={onClose}
    >
      <div>Как поломка влияет на вашу работу?</div>

      {workImpactOptions.map((option) => (
        <label className={styles.option} key={option.value}>
          <input
            className={styles.radio}
            type="radio"
            name="workImpact"
            value={option.value}
            checked={selectedWorkImpact === option.value}
            onChange={() => setSelectedWorkImpact(option.value)}
          />

          {option.label}
        </label>
      ))}

      <Button className={styles.submitButton} onClick={handleCreateRequest}>
        Сообщить о поломке
      </Button>
    </Dialog>
  );
};

export default CreateInitialRepairRequestDialog;