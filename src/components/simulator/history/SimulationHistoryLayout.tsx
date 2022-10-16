import { ReactNode } from "react";
import { FaHistory } from "react-icons/fa";

type Props = { children: ReactNode };
export const SimulationHistoryLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-gray-100 grow flex flex-col shadow rounded-lg">
      <div className="flex items-center space-x-2 p-4">
        <FaHistory className="text-2xl" />
        <h3 className="text-2xl font-bold">シミュレーション履歴</h3>
      </div>
      <div className="space-y-3 grow overflow-auto p-3">{children}</div>
    </div>
  );
};
