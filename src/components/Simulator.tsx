import { SimulatorInput } from "./SimulatorInput";

export const Simulator: React.FC = () => {
  return (
    <div className="flex flex-col w-[800px] bg-gray-100 rounded-lg px-4 py-6 space-y-6 shadow-lg">
      <h3 className="text-xl text-red-700">月々の返済額を求める</h3>
      <div className="flex-grow grid grid-cols-2 gap-3">
        <div>
          <div className="flex flex-col space-y-3">
            <SimulatorInput label="借入額" unit="万円" />
            <SimulatorInput label="年利" unit="%" />
            <SimulatorInput label="返済期間" unit="年" />
          </div>
          <button className="mt-6 text-white bg-red-600 hover:bg-red-700 transition-all rounded px-4 py-2">
            計算する
          </button>
        </div>
        <div className="flex flex-col space-y-6 rounded-lg bg-gray-200 p-6 shadow-inner">
          <h4 className="text-2xl font-bold">シミュレーション結果</h4>
          <div className="flex flex-col space-y-3">
            <div className="bg-gray-100 w-full px-4 py-3 rounded shadow">
              <p className="text-lg">月々の返済額</p>
              <p className="ml-2 text-3xl">10,000円</p>
            </div>
            <div className="bg-gray-100 w-full px-4 py-3 rounded shadow">
              <p>支払総額</p>
              <p className="ml-2">10,000円</p>
            </div>
            <div className="bg-gray-100 w-full px-4 py-3 rounded shadow">
              <p>利子総額</p>
              <p className="ml-2">10,000円</p>
            </div>
          </div>
          <button className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
            画像をダウンロード
          </button>
        </div>
      </div>
    </div>
  );
};
