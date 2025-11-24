"use client"

import { ProgressActivity } from "./Loading";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  buttonType: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { isLoading, buttonType, children, ...rest } = props;
  
  return (
    <button
      {...rest}
    >
      {isLoading ? <ProgressActivity /> : children}
    </button>
  );
};