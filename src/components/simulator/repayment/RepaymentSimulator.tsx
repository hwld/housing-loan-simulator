import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RepaymentFormData,
  repaymentInputs,
  RepaymentResult,
  simulateRepayment,
} from "../../../models/simulator/repayment";
import { MainResultCard } from "../MainResultCard";
import { Simulator } from "../Simulator";
import { SimulatorInput } from "../SimulatorInput";
import { SimulatorResult } from "../SimulatorResult";
import { SubResultCard } from "../SubResultCard";

export const RepaymentSimulator: React.FC = () => {
  const [simulateResult, setSimulateResult] = useState<
    RepaymentResult | undefined
  >(undefined);

  const {
    register,
    handleSubmit: buildSubmitHandler,
    formState: { errors },
  } = useForm<RepaymentFormData>();

  const handleSubmit: SubmitHandler<RepaymentFormData> = (formData) => {
    const inputs = repaymentInputs(formData);
    if (inputs === undefined) {
      throw new Error("");
    }

    setSimulateResult(simulateRepayment(inputs));
  };

  return (
    <Simulator
      onSimulate={buildSubmitHandler(handleSubmit)}
      title="月々の返済額を求める"
      inputs={
        <>
          <SimulatorInput
            label="借入額"
            placeholder="3500"
            unit="万円"
            error={errors.borrowableAmount}
            {...register("borrowableAmount", {
              required: {
                value: true,
                message: "必須項目です。",
              },
              maxLength: {
                value: 5,
                message: "5桁以下の金額を入力してください。",
              },
              min: {
                value: 100,
                message: "100万円以上の金額を入力してください。",
              },
              //　小数を入力したときにブラウザ検証のエラーメッセージを出さないようにする
              pattern: {
                value: /^\d*$/g,
                message: "半角整数を入力してください。",
              },
            })}
          />
          <SimulatorInput
            label="年利"
            unit="%"
            placeholder="1.2"
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
            label="返済期間"
            unit="年"
            placeholder="35"
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
        // レイアウトシフトを防ぐためにSimulatorResultの方で結果の表示・非表示を制御させる。
        <SimulatorResult isShown={simulateResult !== undefined}>
          <MainResultCard
            title="月々の返済額"
            result={simulateResult?.monthlyRepaymentAmount}
          />
          <SubResultCard
            title="支払総額"
            result={simulateResult?.totalRepaymentAmount}
          />
          <SubResultCard
            title="利子総額"
            result={simulateResult?.totalInterest}
          />
        </SimulatorResult>
      }
    />
  );
};
