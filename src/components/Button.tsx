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
      className={`flex items-center justify-center gap-3 px-4 py-2.5 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
