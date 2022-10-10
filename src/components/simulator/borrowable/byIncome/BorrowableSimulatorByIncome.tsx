import { MainResultCard } from "../../MainResultCard";
import { Simulator } from "../../Simulator";
import { SimulatorInput } from "../../SimulatorInput";
import { SimulatorResult } from "../../SimulatorResult";
import { useDownloadElement } from "../../useDownloadResult";
import { ByIncomeResultDoc } from "./ByIncomeResultDoc";
import { useBorrowableSimulatorByIncome } from "./useBorrowableSimulatorByIncome";

export const BorrowableSimulatorByIncome: React.FC = () => {
  const {
    simulate,
    simulationResult,
    simulationInputs: { register, errors },
  } = useBorrowableSimulatorByIncome();
  const { downloadId, handleDownload } = useDownloadElement();

  return (
    <Simulator
      onSimulate={simulate}
      title="借入可能額を求める (年収から)"
      inputs={
        <>
          <SimulatorInput
            label="年収"
            placeholder="400"
            unit="万円"
            error={errors.annualIncome}
            {...register("annualIncome", { valueAsNumber: true })}
          />
          <SimulatorInput
            label="年利"
            placeholder="1.2"
            unit="%"
            error={errors.annualInterest}
            {...register("annualInterest", { valueAsNumber: true })}
          />
          <SimulatorInput
            label="借入期間"
            placeholder="35"
            unit="年"
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
              <ByIncomeResultDoc id={downloadId} result={simulationResult} />
            )
          }
          onDownload={handleDownload}
        >
          <MainResultCard
            title="借入可能額"
            result={simulationResult?.borrowableAmount}
          />
        </SimulatorResult>
      }
    />
  );
};
