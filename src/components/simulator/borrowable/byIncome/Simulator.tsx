import { ChangeEvent, useState } from "react";
import { MainResultCard } from "../../result/MainResultCard";
import { SimulatorResult } from "../../result/SimulatorResult";
import { SimulatorInput } from "../../SimulatorInput";
import { SimulatorLayout } from "../../SimulatorLayout";
import { useDownloadElement } from "../../useDownloadResult";
import { ResultDoc } from "./ResultDoc";
import { useSimulator } from "./useSimulator";

export const Simulator: React.FC = () => {
  const {
    simulate,
    simulationResult,
    simulationInputs: { register, errors },
  } = useSimulator();
  const { downloadId, handleDownload, downloading } = useDownloadElement();

  const [remarks, setRemarks] = useState("");
  const handleChangeRemarks = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRemarks(e.target.value);
  };

  return (
    <>
      <SimulatorLayout
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
              title="借入可能額"
              result={simulationResult?.borrowableAmount}
            />
          </SimulatorResult>
        }
        remarks={remarks}
        onChangeRemarks={handleChangeRemarks}
      />
    </>
  );
};
