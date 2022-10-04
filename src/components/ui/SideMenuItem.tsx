import Link, { LinkProps } from "next/link";
import { ReactNode, SVGAttributes } from "react";

type Props = {
  children: ReactNode;
  isActive?: boolean;
  icon: React.FC<SVGAttributes<SVGElement>>;
} & LinkProps;

const baseClass =
  "flex items-center justify-between text-white/90 rounded-md px-4 py-2 hover:text-gray-100 transition-all";
const activeClass = "bg-red-800";
const normalClass = "bg-transparent cursor-pointer hover:bg-white/20";

export const SideMenuItem: React.FC<Props> = ({
  children,
  isActive = false,
  icon: Icon,
  ...props
}) => {
  return (
    <Link {...props}>
      <a className={`${baseClass} ${isActive ? activeClass : normalClass}`}>
        <div className="flex">
          <Icon className="w-5 h-5" />
          <p className="ml-3 select-none">{children}</p>
        </div>
      </a>
    </Link>
  );
};
