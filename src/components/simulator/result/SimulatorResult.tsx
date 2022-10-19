import * as Toast from "@radix-ui/react-toast";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { FaDownload, FaInfoCircle } from "react-icons/fa";
import { clsx } from "../../../classnames";
import { Tooltip } from "../../ui/Tooltip";

type Props = {
  children: ReactNode;
  isShown?: boolean;
  onDownload: () => {};
  downloading?: boolean;
  resultDocForDownload: ReactNode;
};
export const SimulatorResult: React.FC<Props> = ({
  children,
  isShown = false,
  onDownload,
  downloading = false,
  resultDocForDownload,
}) => {
  return (
    <>
      <div
        id="result"
        className="h-full relative flex flex-col justify-between rounded-lg bg-gray-200 p-6 shadow-inner"
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
                      className="border border-red-600 hover:bg-red-500/10 transition-all  p-2 rounded-full shadow"
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
      {/* 画像にする要素 */}
      <div className="fixed top-full">{resultDocForDownload}</div>

      {/* 画像の生成を知らせるインジゲータ */}
      <Toast.Provider>
        <AnimatePresence>
          {downloading && (
            <Toast.Root
              className="bg-gray-100 shadow rounded border-red-500 border"
              asChild
              forceMount
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Toast.Description className="flex items-center space-x-3 px-3 py-2">
                  <div className="flex justify-center">
                    <div className="animate-spin h-7 w-7 border-4 border-red-500 rounded-full border-t-transparent"></div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-bold">
                      結果の画像を生成しています
                    </p>
                    <p className="text-[0.8rem] text-gray-500">
                      しばらくお待ち下さい
                    </p>
                  </div>
                </Toast.Description>
              </motion.div>
            </Toast.Root>
          )}
        </AnimatePresence>

        <Toast.Viewport className="z-50 fixed bottom-4 right-4" />
      </Toast.Provider>
    </>
  );
};
