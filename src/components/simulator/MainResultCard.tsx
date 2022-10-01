type Props = { title: string; result?: number };
export const MainResultCard: React.FC<Props> = ({ title, result = 0 }) => {
  return (
    <div className="bg-gray-100 w-full px-4 py-3 rounded shadow">
      <p className="text-lg">{title}</p>
      <p className="ml-2 text-3xl">
        {`${Math.round(result).toLocaleString()}`}
        <span className="text-xl">円</span>
      </p>
    </div>
  );
};
