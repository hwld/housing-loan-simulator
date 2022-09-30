import { ComponentPropsWithoutRef } from "react";

export type InputProps = { textRight?: boolean } & Omit<
  ComponentPropsWithoutRef<"input">,
  "className"
>;
export const Input: React.FC<InputProps> = ({ textRight, ...props }) => {
  return (
    <input
      type="number"
      className={`w-full border p-2 rounded-md transition-all outline-none focus:outline-gray-500 focus:outline-offset-0 ${
        textRight ? "text-right" : ""
      }`}
      {...props}
    ></input>
  );
};
