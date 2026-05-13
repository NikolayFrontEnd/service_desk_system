import { useState } from "react";
import Dialog from "../../primitives/dialog";
import Button from "../../primitives/button";
import styles from "./index.module.css";
import { faultTitleOptions, type FaultTitle } from "../../../domain/valueObjects/FaultDialog";


type SelectFaultTitleDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectFaultTitle: (faultTitle: FaultTitle) => Promise<void>;
};

const SelectFaultTitleDialog = ({
  isOpen,
  onClose,
  onSelectFaultTitle,
}: SelectFaultTitleDialogProps) => {
  const [selectedFaultTitle, setSelectedFaultTitle] = useState<FaultTitle | "">(
    ""
  );

  const handleSubmit = async () => {
    if (!selectedFaultTitle) {
      console.log("Please choose fault title");
      return;
    }

    await onSelectFaultTitle(selectedFaultTitle);
  };

  return (
    <Dialog isOpen={isOpen} title="Выберите тип поломки" onClose={onClose}>
      <div className={styles.content}>
        <label htmlFor="faultTitle" className={styles.label}>
          Какая проблема возникла?
        </label>

        <select
          id="faultTitle"
          className={styles.select}
          value={selectedFaultTitle}
          onChange={(event) =>
            setSelectedFaultTitle(event.target.value as FaultTitle)
          }
        >
          <option value="">Выберите проблему</option>

          {faultTitleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Button className={styles.submitButton} onClick={handleSubmit}>
          Подтвердить
        </Button>
      </div>
    </Dialog>
  );
};

export default SelectFaultTitleDialog;