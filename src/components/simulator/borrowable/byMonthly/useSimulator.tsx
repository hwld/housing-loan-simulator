import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BorrowableByMonthlyFormData,
  borrowableByMonthlySchema,
  BorrowableByMonthlySnapshot,
  simulateBorrowableByMonthly,
} from "../../../../models/simulator/borrowable/monthlyRepayment";

export const useSimulator = () => {
  const [simulationResult, setSimulationResult] = useState<
    BorrowableByMonthlySnapshot | undefined
  >(undefined);

  const {
    register,
    handleSubmit: buildSubmitHandler,
    formState: { errors },
    getValues,
  } = useForm<BorrowableByMonthlyFormData>({
    resolver: zodResolver(borrowableByMonthlySchema),
  });

  const simulate = useMemo(() => {
    const handleSubmit: SubmitHandler<BorrowableByMonthlyFormData> = (
      formData
    ) => {
      const result = simulateBorrowableByMonthly(formData);
      setSimulationResult({ ...result, ...getValues() });
    };

    return buildSubmitHandler(handleSubmit);
  }, [buildSubmitHandler, getValues]);

  return {
    simulate,
    simulationResult,
    simulationInputs: { register, errors },
  };
};
