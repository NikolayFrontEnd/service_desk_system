import type { ChangeEvent } from "react";
import styles from "./index.module.css";

type InputProps = {
  id: string;
  label?: string;
  type?: "text" | "email" | "password" | "number";
  value?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

  className?: string;
  labelClassName?: string;
  wrapperClassName?: string;
};

const Input = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  className = "",
  labelClassName = "",
  wrapperClassName = "",
}: InputProps) => {
  return (
    <div className={`${styles.wrapper} ${wrapperClassName}`}>
      {label && (
        <label htmlFor={id} className={`${styles.label} ${labelClassName}`}>
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${styles.input} ${className}`}
      />
    </div>
  );
};

export default Input;
