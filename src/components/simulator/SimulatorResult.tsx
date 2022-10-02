import { ReactNode } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { clsx } from "../../classnames";

type Props = { children: ReactNode; isShown?: boolean };
export const SimulatorResult: React.FC<Props> = ({
  children,
  isShown = false,
}) => {
  return (
    <div className="relative flex flex-col justify-between rounded-lg bg-gray-200 p-6 shadow-inner">
      <div
        className={clsx(
          "space-y-6 transition-all duration-200",
          isShown ? "opacity-100" : "opacity-0 invisible"
        )}
      >
        <h4 className="text-2xl font-bold">シミュレーション結果</h4>
        <div className={clsx("flex flex-col space-y-3")}>{children}</div>
      </div>
      <div
        className={clsx(
          "flex flex-col items-center text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 text-gray-400",
          isShown ? "opacity-0 invisible" : "opacity-100"
        )}
      >
        <FaInfoCircle className="w-10 h-10" />
        <p className="mt-3">
          必要な項目を入力し、「計算する」ボタンを押してください。
        </p>
      </div>
    </div>
  );
};
