import Button from "../../primitives/button";
import Dialog from "../../primitives/dialog";
import styles from "./index.module.css";

type UpdateRepairTaskStatusDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onStartTask: () => Promise<void>;
  onFinishTask: () => Promise<void>;
};

const UpdateRepairTaskStatusDialog = ({
  isOpen,
  onClose,
  onStartTask,
  onFinishTask,
}: UpdateRepairTaskStatusDialogProps) => {
  return (
    <Dialog
      isOpen={isOpen}
      title="Изменить статус задачи"
      onClose={onClose}
    >
      <div className={styles.content}>
        <Button onClick={onStartTask}>Начал ремонт</Button>

        <Button onClick={onFinishTask}>Ремонт завершен</Button>
      </div>
    </Dialog>
  );
};

export default UpdateRepairTaskStatusDialog;