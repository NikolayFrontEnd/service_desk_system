import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import styles from "./index.module.css";
import Button from "../button";

type DialogProps = {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
};

const Dialog = ({ isOpen, title, children, onClose }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.header}>
        {title && <h2>{title}</h2>}

        <Button onClick={onClose}>Закрыть</Button>
      </div>

      <div>{children}</div>
    </dialog>
  );
};

export default Dialog;
