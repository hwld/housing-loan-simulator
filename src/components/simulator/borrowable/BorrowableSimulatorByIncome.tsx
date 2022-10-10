import { zodResolver } from "@hookform/resolvers/zod";
import { toPng } from "html-to-image";
import { useId, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BorrowableByIncomeFormData,
  BorrowableByIncomeResult,
  borrowableByIncomeSchema,
  simulateBorrowableByIncome,
} from "../../../models/simulator/borrowable/income";
import { MainResultCard } from "../MainResultCard";
import { Simulator } from "../Simulator";
import { SimulatorInput } from "../SimulatorInput";
import { SimulatorResult } from "../SimulatorResult";
import { ByIncomeResultDoc } from "./ByIncomeResultDoc";

export const BorrowableSimulatorByIncome: React.FC = () => {
  const [simulateResult, setSimulateResult] = useState<
    (BorrowableByIncomeResult & BorrowableByIncomeFormData) | undefined
  >(undefined);

  const {
    register,
    handleSubmit: buildSubmitHandler,
    formState: { errors },
    getValues,
  } = useForm<BorrowableByIncomeFormData>({
    resolver: zodResolver(borrowableByIncomeSchema),
  });

  const handleSubmit: SubmitHandler<BorrowableByIncomeFormData> = (
    formData
  ) => {
    const result = simulateBorrowableByIncome(formData);
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
          isShown={simulateResult !== undefined}
          resultForDownload={
            simulateResult && (
              <ByIncomeResultDoc
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
    />
  );
};
