import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`flex justify-center items-center px-4 py-2.5 gap-3 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
