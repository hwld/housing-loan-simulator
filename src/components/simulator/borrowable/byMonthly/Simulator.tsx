import React from "react";
import {
  BorrowableByMonthlyFormData,
  BorrowableByMonthlyResult,
} from "../../../../models/simulator/borrowable/monthlyRepayment";
import { MainResultCard } from "../../result/MainResultCard";
import { SimulatorResult } from "../../result/SimulatorResult";
import { SimulatorInput } from "../../SimulatorInput";
import { SimulatorLayout } from "../../SimulatorLayout";
import { useDownloadElement } from "../../useDownloadResult";
import { SimulatorProps } from "../../useSimulator";
import { ResultDoc } from "./ResultDoc";

type Props = {
  simulator: SimulatorProps<
    BorrowableByMonthlyFormData,
    BorrowableByMonthlyResult
  >;
};

// 毎月の返済額から借入可能額を求める
export const Simulator: React.FC<Props> = ({
  simulator: {
    simulate,
    simulationResult,
    simulationInputs: { register, errors },
    remarks,
    handleChangeRemarks,
  },
}) => {
  const { downloadId, handleDownload, downloading } = useDownloadElement();

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
    ></SimulatorLayout>
  );
};
