import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type Props = { children: ReactNode; isActive?: boolean } & LinkProps;
export const SideMenuItem: React.FC<Props> = ({
  children,
  isActive = false,
  ...props
}) => {
  const baseClass =
    "flex items-center text-white/90 rounded-md px-4 py-2 hover:text-gray-100 transition-all";
  const activeClass = "bg-red-800";
  const normalClass = "bg-transparent cursor-pointer hover:bg-white/20";

  return (
    <Link {...props}>
      <a className={`${baseClass} ${isActive ? activeClass : normalClass}`}>
        {children}
      </a>
    </Link>
  );
};
