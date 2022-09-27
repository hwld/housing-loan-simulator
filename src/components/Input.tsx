import { ComponentPropsWithoutRef } from "react";

type Props = { textRight?: boolean } & Omit<
  ComponentPropsWithoutRef<"input">,
  "className"
>;
export const Input: React.FC<Props> = ({ textRight, ...props }) => {
  return (
    <input
      type="number"
      className={`w-full p-2 rounded-md ${textRight ? "text-right" : ""}`}
      {...props}
    ></input>
  );
};
