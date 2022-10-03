import { ReactNode } from "react";
import { FaAngleDown, FaCalculator } from "react-icons/fa";
import { SideMenuBase } from "./SideMenuBase";

type Props = { children: ReactNode };

export const SideMenuItemGroup: React.FC<Props> = ({ children }) => {
  return (
    <details className="group" open={true}>
      <SideMenuBase
        as="summary"
        headIcon={FaCalculator}
        tailIcon={
          <FaAngleDown className="w-5 h-5 group-open:rotate-180 transition-all" />
        }
      >
        借入可能額
      </SideMenuBase>
      <div className="ml-5 mt-2 space-y-1">{children}</div>
    </details>
  );
};
