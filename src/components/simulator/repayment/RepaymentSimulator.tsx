import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RepaymentFormData,
  RepaymentInputs,
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
    const inputs = RepaymentInputs(formData);
    if (inputs === undefined) {
      throw new Error("dev:数値データ以外は検証で取り除いてください。");
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
                message: "借入額は必須項目です。",
              },
              max: {
                value: 10000,
                message: "借入額には1億円以下の金額を入力してください。",
              },
              min: {
                value: 100,
                message: "借入額には100万円以上の金額を入力してください。",
              },
              //　小数を入力したときにブラウザ検証のエラーメッセージを出さないようにする
              pattern: {
                value: /^\d*$/g,
                message: "借入額には半角整数を入力してください。",
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
                message: "年利は必須項目です。",
              },
              max: {
                value: 100,
                message: "年利には100以下の利率を入力してください。",
              },
              maxLength: {
                value: 9,
                message: "年利は9桁未満で入力してください。",
              },
              min: {
                value: 0.1,
                message: "年利は0.1%以上で入力してください。",
              },
              pattern: {
                value: /^\d*\.?\d*$/g,
                message: "年利には半角数字を入力してください。",
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
                message: "返済期間は必須項目です。",
              },
              max: {
                value: 50,
                message: "返済期間には50年以下を入力してください。",
              },
              min: {
                value: 1,
                message: "返済期間は1年以上で入力してください。",
              },
              pattern: {
                value: /^\d*$/g,
                message: "返済期間には半角整数を入力してください。",
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
