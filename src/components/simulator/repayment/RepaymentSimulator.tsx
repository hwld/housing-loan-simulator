import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RepaymentFormData,
  RepaymentResult,
  repaymentSchema,
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
  } = useForm<RepaymentFormData>({ resolver: zodResolver(repaymentSchema) });

  const handleSubmit: SubmitHandler<RepaymentFormData> = (formData) => {
    setSimulateResult(simulateRepayment(formData));
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
            {...register("borrowableAmount", { valueAsNumber: true })}
          />
          <SimulatorInput
            label="年利"
            unit="%"
            placeholder="1.2"
            error={errors.annualInterest}
            {...register("annualInterest", { valueAsNumber: true })}
          />
          <SimulatorInput
            label="返済期間"
            unit="年"
            placeholder="35"
            error={errors.yearsOfRepayment}
            {...register("yearsOfRepayment", { valueAsNumber: true })}
          />
        </>
      }
      result={
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
