import { Simulator } from "../Simulator";
import { SimulatorInput } from "../SimulatorInput";
import { SimulatorResult } from "../SimulatorResult";

export const RepaymentSimulator: React.FC = () => {
  return (
    <Simulator
      title="月々の返済額を求める"
      inputs={
        <>
          <SimulatorInput label="借入額" unit="万円" />
          <SimulatorInput label="年利" unit="%" />
          <SimulatorInput label="返済期間" unit="年" />
        </>
      }
      result={<SimulatorResult />}
      onSimulate={() => console.log("simulate!")}
    />
  );
};
