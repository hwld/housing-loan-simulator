import { ComponentPropsWithoutRef, forwardRef } from "react";
import { clsx } from "../../classnames";

export type InputProps = { textRight?: boolean; isError?: boolean } & Omit<
  ComponentPropsWithoutRef<"input">,
  "className"
>;

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ textRight = false, isError = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "w-full border p-1 rounded-md transition-all outline-none",
          textRight && "text-right",
          isError
            ? "border-red-400 focus:ring-red-400 focus:ring focus:ring-offset-2"
            : "focus:ring-gray-400 focus:ring-2 focus:ring-offset-2"
        )}
        {...props}
      ></input>
    );
  }
);
