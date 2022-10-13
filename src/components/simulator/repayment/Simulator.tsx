import {
  repaymentSchema,
  simulateRepayment,
} from "../../../models/simulator/repayment";
import { MainResultCard } from "../result/MainResultCard";
import { SimulatorResult } from "../result/SimulatorResult";
import { SubResultCard } from "../result/SubResultCard";
import { SimulatorInput } from "../SimulatorInput";
import { SimulatorLayout } from "../SimulatorLayout";
import { useDownloadElement } from "../useDownloadResult";
import { useSimulator } from "../useSimulator";
import { ResultDoc } from "./ResultDoc";

export const Simulator: React.FC = () => {
  const {
    simulate,
    simulationResult,
    simulationInputs: { register, errors },
    remarks,
    handleChangeRemarks,
  } = useSimulator(simulateRepayment, repaymentSchema);

  const { downloadId, handleDownload, downloading } = useDownloadElement();

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
            resultDocForDownload={
              simulationResult && (
                <ResultDoc
                  id={downloadId}
                  result={simulationResult}
                  remarks={remarks}
                />
              )
            }
            onDownload={handleDownload}
            downloading={downloading}
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
        remarks={remarks}
        onChangeRemarks={handleChangeRemarks}
      />
    </div>
  );
};
