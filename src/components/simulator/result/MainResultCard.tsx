import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

type Props = { title: string; result?: number };
export const MainResultCard: React.FC<Props> = ({ title, result = 0 }) => {
  const control = useAnimationControls();

  useEffect(() => {
    control.set({ scale: 0.8, opacity: 0 });
    control.start({ scale: 1, opacity: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div className="bg-gray-100 w-full px-4 py-3 rounded shadow">
      <p className="text-lg font-normal">{title}</p>
      <motion.p className="ml-2 text-3xl" animate={control}>
        {`${Math.round(result).toLocaleString()}`}
        <span className="text-xl">円</span>
      </motion.p>
    </div>
  );
};
