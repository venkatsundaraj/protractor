import { cn } from "@/utils/clsx";
import { VariantProps, cva } from "class-variance-authority";
import { FC } from "react";

export const buttonVariants = cva(
  "inline-flex items-center font-paragraph px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm  focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-slate-50 hover:bg-slate-200 text-slate-950 focus:ring-slate-200",
        dark: "bg-slate-900 hover:bg-slate-950 text-slate-50 focus:ring-slate-950",
      },
      size: {
        sm: "text-sm px-2 py-1",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = ({
  children,
  className,
  size,
  variant,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      {children}
    </button>
  );
};

export default Button;
