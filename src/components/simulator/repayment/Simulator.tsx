import { MainResultCard } from "../result/MainResultCard";
import { SimulatorInput } from "../SimulatorInput";
import { SimulatorLayout } from "../SimulatorLayout";
import { SimulatorResult } from "../result/SimulatorResult";
import { SubResultCard } from "../result/SubResultCard";
import { useDownloadElement } from "../useDownloadResult";
import { ResultDoc } from "./ResultDoc";
import { useSimulator } from "./useSimulator";

export const Simulator: React.FC = () => {
  const {
    simulate,
    simulationResult,
    simulationsInputs: { register, errors },
  } = useSimulator();

  const { downloadId, handleDownload } = useDownloadElement();

  return (
    <div>
      <SimulatorLayout
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
                <ResultDoc id={downloadId} result={simulationResult} />
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
