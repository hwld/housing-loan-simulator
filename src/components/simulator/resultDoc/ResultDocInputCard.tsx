type Props = { title: string; value: string };
export const ResultDocInputCard: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="p-2 bg-gray-200 rounded-lg">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="ml-1 text-lg font-bold">{value}</div>
    </div>
  );
};
