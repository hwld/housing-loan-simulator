import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { FaAngleDown } from "react-icons/fa";
import { clsx } from "../../../classnames";

type Props = {
  headIcon: ElementType;
  isOpen: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

export const SideMenuItemGroupHeader: React.FC<Props> = ({
  headIcon: HeadIcon,
  isOpen,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "w-full flex items-center justify-between text-white/90 rounded-md px-4 py-2 transition-all bg-transparent cursor-pointer",
        "hover:bg-white/20 hover:text-gray-100"
      )}
      {...props}
    >
      <div className="flex">
        <HeadIcon className="w-5 h-5" />
        <p className="ml-3 select-none">{children}</p>
      </div>
      <div>
        <FaAngleDown
          className={`w-5 h-5 transition-all ${isOpen ? "" : "rotate-90"}`}
        />
      </div>
    </button>
  );
};
