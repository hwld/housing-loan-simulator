import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { FaDownload, FaInfoCircle } from "react-icons/fa";
import { clsx } from "../../../classnames";
import { Tooltip } from "../../ui/Tooltip";

type Props = {
  children: ReactNode;
  isShown?: boolean;
  onDownload: () => {};
  resultForDownload: ReactNode;
};
export const SimulatorResult: React.FC<Props> = ({
  children,
  isShown = false,
  onDownload,
  resultForDownload,
}) => {
  return (
    <>
      <div
        id="result"
        className="relative flex flex-col justify-between rounded-lg bg-gray-200 p-6 shadow-inner"
      >
        <AnimatePresence>
          {isShown ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={clsx("space-y-6 duration-200")}
            >
              <div className="flex flex-row items-center space-x-3">
                <h4 className="text-2xl font-bold">シミュレーション結果</h4>
                <Tooltip
                  trigger={
                    <button
                      className="border border-red-600 hover:bg-red-500/10 transition-all  p-2 rounded-full"
                      onClick={onDownload}
                    >
                      <FaDownload className="fill-red-600"></FaDownload>
                    </button>
                  }
                >
                  結果を画像としてダウンロード
                </Tooltip>
              </div>
              <div className={clsx("flex flex-col space-y-3")}>{children}</div>
            </motion.div>
          ) : (
            <div
              className={clsx(
                "flex flex-col items-center text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 text-gray-400"
              )}
            >
              <FaInfoCircle className="w-10 h-10" />
              <p className="mt-3">
                必要な項目を入力し、「計算する」ボタンを押してください。
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
      {/*　画像にする要素 */}
      <div className="fixed top-full">{resultForDownload}</div>
    </>
  );
};
