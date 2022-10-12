import { ComponentPropsWithoutRef } from "react";
import { clsx } from "../../classnames";

type Props = Omit<ComponentPropsWithoutRef<"button">, "className">;
export const Button: React.FC<Props> = ({ ...props }) => {
  return (
    <button
      className={clsx(
        "block text-white bg-red-600 hover:bg-red-700 active:bg-red-800 transition-all rounded px-4 py-2 ",
        "focus:outline-none focus:ring-2 ring-red-600 ring-offset-2"
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};
