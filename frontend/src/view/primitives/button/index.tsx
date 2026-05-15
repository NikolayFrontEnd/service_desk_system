import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button = ({ children, type = "button", ...props }: ButtonProps) => {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
