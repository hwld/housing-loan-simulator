import { FaHome, FaMoneyBillWave } from "react-icons/fa";
import { SideMenuItem } from "./SideMenuItem";

export const SideMenu: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-100 px-4 py-6 border-r">
      <h2 className="flex items-center text-xl font-bold">
        <FaHome className="w-8 h-8" />
        <span className="ml-2">住宅ローンシミュレータ</span>
      </h2>
      <nav className="flex flex-col mt-6 space-y-1">
        <SideMenuItem href="/">
          <FaMoneyBillWave className="w-7 h-7" />
          <p className="ml-3">月々の返済額</p>
        </SideMenuItem>
        <SideMenuItem href="/">
          <FaMoneyBillWave className="w-7 h-7" />
          <p className="ml-3">借入可能額</p>
        </SideMenuItem>
      </nav>
    </div>
  );
};
