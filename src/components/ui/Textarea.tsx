import { ComponentPropsWithoutRef } from "react";
import { clsx } from "../../classnames";

type Props = Omit<ComponentPropsWithoutRef<"textarea">, "className">;
export const Textarea: React.FC<Props> = ({ ...props }) => {
  return (
    <textarea
      className={clsx(
        "w-full border p-2 rounded-md transition-all outline-none text-sm",
        "focus:ring-gray-400 focus:ring-2 focus:ring-offset-2"
      )}
      {...props}
    ></textarea>
  );
};
