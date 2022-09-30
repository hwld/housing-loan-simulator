import { Button } from "../ui/Button";
import { MainResultCard } from "./MainResultCard";
import { SubResultCard } from "./SubResultCard";

export const SimulatorResult: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6 rounded-lg bg-gray-200 p-6 shadow-inner">
      <h4 className="text-2xl font-bold">シミュレーション結果</h4>
      <div className="flex flex-col space-y-3">
        <MainResultCard title="月々の返済額" result="10,000円" />
        <SubResultCard title="支払総額" result="10,000円" />
        <SubResultCard title="利子総額" result="10,000円" />
      </div>
      <Button>画像をダウンロード</Button>
    </div>
  );
};
