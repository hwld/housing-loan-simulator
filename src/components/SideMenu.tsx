import Link from "next/link";
import { FaCalculator, FaHome } from "react-icons/fa";
import { SideMenuItem } from "./SideMenuItem";

const page = {
  repayment: "/repayment",
  borrowable: "/borrowable",
} as const;
export type Page = typeof page[keyof typeof page];

type Props = { currentPage: Page[keyof Page] };
export const SideMenu: React.FC<Props> = ({ currentPage }) => {
  return (
    <div className="w-full h-full bg-red-700 px-4 py-6 border-r">
      <Link href={page.repayment}>
        <a>
          <h2 className="flex items-center text-xl font-bold ">
            <FaHome className="w-8 h-8 fill-gray-200" />
            <span className="ml-2 text-gray-100">住宅ローンシミュレータ</span>
          </h2>
        </a>
      </Link>
      <div className="w-full h-[1px] bg-gray-100 mt-3"></div>
      <nav className="flex flex-col mt-3 space-y-1">
        <SideMenuItem
          href={page.repayment}
          isActive={page.repayment === currentPage}
        >
          <FaCalculator className="w-5 h-5" />
          <p className="ml-3">月々の返済額</p>
        </SideMenuItem>
        <SideMenuItem
          href={page.borrowable}
          isActive={page.borrowable === currentPage}
        >
          <FaCalculator className="w-5 h-5" />
          <p className="ml-3">借入可能額</p>
        </SideMenuItem>
      </nav>
    </div>
  );
};
