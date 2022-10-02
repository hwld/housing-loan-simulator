import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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

export const BorrowableSimulatorByIncome: React.FC = () => {
  const [simulateResult, setSimulateResult] = useState<
    BorrowableByIncomeResult | undefined
  >(undefined);

  const {
    register,
    handleSubmit: buildSubmitHandler,
    formState: { errors },
  } = useForm<BorrowableByIncomeFormData>({
    resolver: zodResolver(borrowableByIncomeSchema),
  });

  const handleSubmit: SubmitHandler<BorrowableByIncomeFormData> = (
    formData
  ) => {
    setSimulateResult(simulateBorrowableByIncome(formData));
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
        <SimulatorResult isShown={simulateResult !== undefined}>
          <MainResultCard
            title="借入可能額"
            result={simulateResult?.borrowableAmount}
          />
        </SimulatorResult>
      }
    />
  );
};
