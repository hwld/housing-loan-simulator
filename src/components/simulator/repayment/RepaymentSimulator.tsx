import { MainResultCard } from "../MainResultCard";
import { Simulator } from "../Simulator";
import { SimulatorInput } from "../SimulatorInput";
import { SimulatorResult } from "../SimulatorResult";
import { SubResultCard } from "../SubResultCard";
import { useDownloadElement } from "../useDownloadResult";
import { RepaymentResultDoc } from "./RepaymentResultDoc";
import { useRepaymentSimulator } from "./useRepaymentSimulator";

export const RepaymentSimulator: React.FC = () => {
  const {
    simulate,
    simulationResult,
    simulationsInputs: { register, errors },
  } = useRepaymentSimulator();

  const { downloadId, handleDownload } = useDownloadElement();

  return (
    <div>
      <Simulator
        onSimulate={simulate}
        title="月々の返済額を求める"
        inputs={
          <>
            <SimulatorInput
              label="借入額"
              placeholder="3500"
              unit="万円"
              error={errors.borrowableAmount}
              {...register("borrowableAmount", { valueAsNumber: true })}
            />
            <SimulatorInput
              label="年利"
              unit="%"
              placeholder="1.2"
              error={errors.annualInterest}
              {...register("annualInterest", { valueAsNumber: true })}
            />
            <SimulatorInput
              label="返済期間"
              unit="年"
              placeholder="35"
              error={errors.yearsOfRepayment}
              {...register("yearsOfRepayment", { valueAsNumber: true })}
            />
          </>
        }
        result={
          <SimulatorResult
            isShown={simulationResult !== undefined}
            resultForDownload={
              simulationResult && (
                <RepaymentResultDoc id={downloadId} result={simulationResult} />
              )
            }
            onDownload={handleDownload}
          >
            <MainResultCard
              title="月々の返済額"
              result={simulationResult?.monthlyRepaymentAmount}
            />
            <SubResultCard
              title="支払総額"
              result={simulationResult?.totalRepaymentAmount}
            />
            <SubResultCard
              title="利子総額"
              result={simulationResult?.totalInterest}
            />
          </SimulatorResult>
        }
      />
    </div>
  );
};
