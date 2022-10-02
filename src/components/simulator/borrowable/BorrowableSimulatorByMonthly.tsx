import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BorrowableByMonthlyFormData,
  borrowableByMonthlyInputs,
  BorrowableByMonthlyResult,
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
  } = useForm<BorrowableByMonthlyFormData>();

  const handleSubmit: SubmitHandler<BorrowableByMonthlyFormData> = (
    formData
  ) => {
    const inputs = borrowableByMonthlyInputs(formData);
    if (inputs === undefined) {
      throw new Error("");
    }

    setSimulateResult(simulateBorrowableByMonthly(inputs));
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
            {...register("monthlyRepayment", {
              required: {
                value: true,
                message: "必須項目です。",
              },
              maxLength: {
                value: 4,
                message: "4桁以下の金額を入力してください。",
              },
              min: {
                value: 1,
                message: "1万円以上の金額を入力してください。",
              },
              pattern: {
                value: /^\d*$/g,
                message: "半角整数を入力してください。",
              },
            })}
          />
          <SimulatorInput
            label="年利"
            placeholder="1.2"
            unit="%"
            error={errors.annualInterest}
            {...register("annualInterest", {
              required: {
                value: true,
                message: "必須項目です。",
              },
              max: {
                value: 100,
                message: "100以下の利率を入力してください。",
              },
              min: {
                value: 0.1,
                message: "0.1%以上で入力してください。",
              },
              pattern: {
                value: /^\d*\.?\d*$/g,
                message: "半角数字を入力してください。",
              },
            })}
          />
          <SimulatorInput
            label="借入期間"
            placeholder="35"
            unit="年"
            error={errors.yearsOfRepayment}
            {...register("yearsOfRepayment", {
              required: {
                value: true,
                message: "必須項目です。",
              },
              max: {
                value: 50,
                message: "50年以下を入力してください。",
              },
              min: {
                value: 1,
                message: "1年以上で入力してください。",
              },
              pattern: {
                value: /^\d*$/g,
                message: "半角整数を入力してください。",
              },
            })}
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
