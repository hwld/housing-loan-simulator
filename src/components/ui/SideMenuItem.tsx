import Link, { LinkProps } from "next/link";
import { ReactNode, SVGAttributes } from "react";
import { SideMenuBase } from "./SideMenuBase";

type Props = {
  children: ReactNode;
  isActive?: boolean;
  icon: React.FC<SVGAttributes<SVGElement>>;
} & LinkProps;

export const SideMenuItem: React.FC<Props> = ({
  children,
  isActive = false,
  icon,
  ...props
}) => {
  return (
    <Link {...props}>
      <SideMenuBase isActive={isActive} headIcon={icon}>
        {children}
      </SideMenuBase>
    </Link>
  );
};
