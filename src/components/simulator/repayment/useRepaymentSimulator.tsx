import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RepaymentFormData,
  repaymentSchema,
  RepaymentSnapshot,
  simulateRepayment,
} from "../../../models/simulator/repayment";

export const useRepaymentSimulator = () => {
  const [simulationResult, setSimulationResult] = useState<
    RepaymentSnapshot | undefined
  >(undefined);

  const {
    register,
    handleSubmit: buildSubmitHandler,
    formState: { errors },
    getValues,
  } = useForm<RepaymentFormData>({ resolver: zodResolver(repaymentSchema) });

  const simulate = useMemo(() => {
    const handleSubmit: SubmitHandler<RepaymentFormData> = (formData) => {
      const result = simulateRepayment(formData);
      setSimulationResult({ ...result, ...getValues() });
    };

    return buildSubmitHandler(handleSubmit);
  }, [buildSubmitHandler, getValues]);

  return {
    simulate,
    simulationResult,
    simulationsInputs: { errors, register },
  };
};
