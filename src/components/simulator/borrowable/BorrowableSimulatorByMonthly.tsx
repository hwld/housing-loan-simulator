import { zodResolver } from "@hookform/resolvers/zod";
import { toPng } from "html-to-image";
import React, { useId, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BorrowableByMonthlyFormData,
  BorrowableByMonthlyResult,
  borrowableByMonthlySchema,
  simulateBorrowableByMonthly,
} from "../../../models/simulator/borrowable/monthlyRepayment";
import { MainResultCard } from "../MainResultCard";
import { Simulator } from "../Simulator";
import { SimulatorInput } from "../SimulatorInput";
import { SimulatorResult } from "../SimulatorResult";
import { ByMonthlyResultDoc } from "./ByMonthlyResultDoc";

// 毎月の返済額から借入可能額を求める
export const BorrowableSimulatorByMonthy: React.FC = () => {
  const [simulateResult, setSimulateResult] = useState<
    (BorrowableByMonthlyResult & BorrowableByMonthlyFormData) | undefined
  >(undefined);

  const {
    register,
    handleSubmit: buildSubmitHandler,
    formState: { errors },
    getValues,
  } = useForm<BorrowableByMonthlyFormData>({
    resolver: zodResolver(borrowableByMonthlySchema),
  });

  const handleSubmit: SubmitHandler<BorrowableByMonthlyFormData> = (
    formData
  ) => {
    const result = simulateBorrowableByMonthly(formData);
    setSimulateResult({ ...result, ...getValues() });
  };

  const resultForDownloadId = useId();
  const handleDownload = async () => {
    const element = document.getElementById(resultForDownloadId);
    if (!element) {
      return;
    }

    const imgUrl = await toPng(element);
    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = "result.png";
    a.click();
  };

  return (
    <Simulator
      onSimulate={buildSubmitHandler(handleSubmit)}
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
          isShown={simulateResult !== undefined}
          resultForDownload={
            simulateResult && (
              <ByMonthlyResultDoc
                id={resultForDownloadId}
                result={simulateResult}
              />
            )
          }
          onDownload={handleDownload}
        >
          <MainResultCard
            title="借入可能額"
            result={simulateResult?.borrowableAmount}
          />
        </SimulatorResult>
      }
    ></Simulator>
  );
};
