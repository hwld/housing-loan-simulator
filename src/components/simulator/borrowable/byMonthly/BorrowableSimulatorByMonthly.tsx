import React from "react";
import { MainResultCard } from "../../MainResultCard";
import { Simulator } from "../../Simulator";
import { SimulatorInput } from "../../SimulatorInput";
import { SimulatorResult } from "../../SimulatorResult";
import { useDownloadElement } from "../../useDownloadResult";
import { ByMonthlyResultDoc } from "./ByMonthlyResultDoc";
import { useBorrowableSimulatorByMonthly } from "./useBorrowableSimulatorByMonthly";

// 毎月の返済額から借入可能額を求める
export const BorrowableSimulatorByMonthy: React.FC = () => {
  const {
    simulate,
    simulationResult,
    simulationInputs: { register, errors },
  } = useBorrowableSimulatorByMonthly();
  const { downloadId, handleDownload } = useDownloadElement();

  return (
    <Simulator
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
              <ByMonthlyResultDoc id={downloadId} result={simulationResult} />
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
    ></Simulator>
  );
};
