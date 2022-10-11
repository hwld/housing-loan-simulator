import { ReactNode } from "react";

type Props = { id: string; results: ReactNode; inputs: ReactNode };
export const ResultDocLayout: React.FC<Props> = ({ id, results, inputs }) => {
  return (
    <div id={id} className="p-3 rounded-lg bg-gray-100 shadow w-[800px]">
      <h1 className="text-2xl font-bold">シミュレーション結果</h1>
      <div className="mt-3 grid grid-cols-2 gap-3 ">
        <div className="px-4 py-6 bg-gray-200 rounded-lg shadow-inner space-y-3">
          {results}
        </div>
        <div className="space-y-4">
          <div className="font-bold">入力項目</div>
          <div className="space-y-2">{inputs}</div>
        </div>
      </div>
    </div>
  );
};
