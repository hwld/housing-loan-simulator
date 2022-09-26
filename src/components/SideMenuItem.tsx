import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type Props = { children: ReactNode } & LinkProps;
export const SideMenuItem: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Link {...props}>
      <a className="flex items-center text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-200 hover:text-gray-700">
        {children}
      </a>
    </Link>
  );
};
