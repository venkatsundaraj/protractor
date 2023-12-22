import { cn } from "@/utils/clsx";
import React, { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        placeholder={placeholder}
        {...props}
        className={cn(
          "bg-transparent border-none outline-none rounded-sm px-2 py-1 min-h-9 ring-1 ring-slate-50 focus:ring-offset-2 text-slate-50 text-md w-full font-paragraph disabled:cursor-not-allowed default:opacity-80",
          className
        )}
      />
    );
  }
);
Input.displayName = "Input";
export default Input;
