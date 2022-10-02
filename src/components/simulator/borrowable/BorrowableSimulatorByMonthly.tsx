import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
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

// 毎月の返済額から借入可能額を求める
export const BorrowableSimulatorByMonthy: React.FC = () => {
  const [simulateResult, setSimulateResult] = useState<
    BorrowableByMonthlyResult | undefined
  >(undefined);

  const {
    register,
    handleSubmit: buildSubmitHandler,
    formState: { errors },
  } = useForm<BorrowableByMonthlyFormData>({
    resolver: zodResolver(borrowableByMonthlySchema),
  });

  const handleSubmit: SubmitHandler<BorrowableByMonthlyFormData> = (
    formData
  ) => {
    setSimulateResult(simulateBorrowableByMonthly(formData));
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
        <SimulatorResult isShown={simulateResult !== undefined}>
          <MainResultCard
            title="借入可能額"
            result={simulateResult?.borrowableAmount}
          />
        </SimulatorResult>
      }
    ></Simulator>
  );
};
