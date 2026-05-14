import Button from '../../primitives/button';
import Dialog from '../../primitives/dialog';
import styles from './index.module.css';
type UpdateRepairTaskStatusDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};
const UpdateRepairTaskStatusDialog = ({ isOpen, onClose }: UpdateRepairTaskStatusDialogProps) => {
    return (  <Dialog isOpen={isOpen} title="" onClose={onClose}>
      <div className={styles.content}>
<Button > Начал ремонт </Button>
<Button > Ремонт завершен </Button>
      </div>
    </Dialog>
    );
}
export default UpdateRepairTaskStatusDialog;