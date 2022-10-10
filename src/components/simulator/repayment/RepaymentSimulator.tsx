import { zodResolver } from "@hookform/resolvers/zod";
import { toPng } from "html-to-image";
import { useId, useState } from "react";
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
import { RepaymentResultDoc } from "./RepaymentResultDoc";

export const RepaymentSimulator: React.FC = () => {
  const [simulateResult, setSimulateResult] = useState<
    (RepaymentResult & RepaymentFormData) | undefined
  >(undefined);

  const {
    register,
    handleSubmit: buildSubmitHandler,
    formState: { errors },
    getValues,
  } = useForm<RepaymentFormData>({ resolver: zodResolver(repaymentSchema) });

  const handleSubmit: SubmitHandler<RepaymentFormData> = (formData) => {
    const result = simulateRepayment(formData);
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
    <div>
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
          <SimulatorResult
            isShown={simulateResult !== undefined}
            resultForDownload={
              simulateResult && (
                <RepaymentResultDoc
                  id={resultForDownloadId}
                  result={simulateResult}
                />
              )
            }
            onDownload={handleDownload}
          >
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
    </div>
  );
};
