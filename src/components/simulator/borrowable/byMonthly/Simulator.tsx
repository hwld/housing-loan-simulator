import React from "react";
import { MainResultCard } from "../../result/MainResultCard";
import { SimulatorInput } from "../../SimulatorInput";
import { SimulatorLayout } from "../../SimulatorLayout";
import { SimulatorResult } from "../../result/SimulatorResult";
import { useDownloadElement } from "../../useDownloadResult";
import { ResultDoc } from "./ResultDoc";
import { useSimulator } from "./useSimulator";

// 毎月の返済額から借入可能額を求める
export const Simulator: React.FC = () => {
  const {
    simulate,
    simulationResult,
    simulationInputs: { register, errors },
  } = useSimulator();
  const { downloadId, handleDownload } = useDownloadElement();

  return (
    <SimulatorLayout
      onSimulate={simulate}
      title="借入可能額を求める (月々の支払額から)"
      inputs={
        <>
          <SimulatorInput
            label="月々の支払額"
            placeholder="10"
            unit="万円"
            error={errors.monthlyRepayment}
            {...register("monthlyRepayment", { valueAsNumber: true })}
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
              <ResultDoc id={downloadId} result={simulationResult} />
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
    ></SimulatorLayout>
  );
};
