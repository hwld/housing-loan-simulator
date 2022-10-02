import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BorrowableByIncomeFormData,
  borrowableByIncomeInputs,
  BorrowableByIncomeResult,
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
  } = useForm<BorrowableByIncomeFormData>();

  const handleSubmit: SubmitHandler<BorrowableByIncomeFormData> = (
    formData
  ) => {
    const inputs = borrowableByIncomeInputs(formData);
    if (inputs === undefined) {
      throw new Error("");
    }

    setSimulateResult(simulateBorrowableByIncome(inputs));
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
            {...register("annualIncome", {
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
    />
  );
};
