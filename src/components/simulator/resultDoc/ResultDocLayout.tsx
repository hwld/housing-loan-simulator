import { ReactNode } from "react";

type Props = {
  id: string;
  results: ReactNode;
  inputs: ReactNode;
  remarks: string;
};
export const ResultDocLayout: React.FC<Props> = ({
  id,
  results,
  inputs,
  remarks,
}) => {
  return (
    <div
      id={id}
      className="p-3 rounded-lg bg-gray-100 shadow w-[800px] space-y-4"
    >
      <h1 className="text-2xl font-bold">シミュレーション結果</h1>
      <div className="grid grid-cols-2 gap-3 ">
        <div className="px-4 py-6 bg-gray-200 rounded-lg shadow-inner space-y-3">
          {results}
        </div>
        <div className="space-y-3">
          <p className="font-bold">入力項目</p>
          <div className="space-y-2">{inputs}</div>
        </div>
      </div>
      {remarks !== "" && (
        <div className="space-y-2">
          <p className="font-bold">備考</p>
          <div className="whitespace-pre shadow bg-gray-200 rounded p-2">
            {remarks}
          </div>
        </div>
      )}
    </div>
  );
};
