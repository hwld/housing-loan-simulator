import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type Props = { children: ReactNode } & LinkProps;
export const SideMenuItem: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Link {...props}>
      <a className="flex items-center text-white/90 px-4 py-2 rounded-lg hover:bg-red-800 hover:text-gray-100">
        {children}
      </a>
    </Link>
  );
};
