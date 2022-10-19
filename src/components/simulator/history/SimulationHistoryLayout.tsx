import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { FaTrash } from "react-icons/fa";
import { clsx } from "../../../classnames";
import { Tooltip } from "../../ui/Tooltip";

type Props = {
  children: ReactNode;
  onRemoveAll: () => void;
  disabledRemove?: boolean;
};
export const SimulationHistoryLayout: React.FC<Props> = ({
  children,
  onRemoveAll,
  disabledRemove = false,
}) => {
  return (
    <div className="bg-gray-100 flex flex-col shadow rounded-lg w-[700px] shrink-0">
      <div className="flex items-start justify-between space-x-2 pt-4 px-4">
        <div>
          <h3 className="text-2xl font-bold">シミュレーション履歴</h3>
          <div className="h-2 my-3 w-1/4 bg-red-700 rounded-full"></div>
        </div>
        <Tooltip
          trigger={
            <button
              className={clsx(
                "border border-gray-600 p-2 rounded-full hover:bg-gray-700/10 shadow",
                "group disabled:bg-gray-200 disabled:border-gray-200 transition-all disabled:pointer-events-none"
              )}
              onClick={onRemoveAll}
              disabled={disabledRemove}
            >
              <FaTrash className="group-disabled:fill-gray-400 transition-all" />
            </button>
          }
        >
          すべての履歴を削除する。
        </Tooltip>
      </div>
      <motion.div
        layoutScroll
        className="space-y-3 grow overflow-auto bg-gray-200 shadow-inner p-3 m-3 rounded-xl"
      >
        <AnimatePresence>{children}</AnimatePresence>
      </motion.div>
    </div>
  );
};
