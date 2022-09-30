import { ReactNode } from "react";
import { Button } from "../ui/Button";

type Props = {
  title: string;
  inputs: ReactNode;
  result: ReactNode;
  onSimulate: () => void;
};
export const Simulator: React.FC<Props> = ({
  title,
  inputs,
  result,
  onSimulate,
}) => {
  return (
    <div className="flex flex-col w-[800px] bg-gray-100 rounded-lg px-4 py-6 space-y-6 shadow-lg">
      <h3 className="text-xl text-red-700">{title}</h3>
      <div className="flex-grow grid grid-cols-2 gap-3">
        <div className="space-y-6">
          <div className="flex flex-col space-y-3">{inputs}</div>
          <Button onClick={onSimulate}>計算する</Button>
        </div>
        {result}
      </div>
    </div>
  );
};
