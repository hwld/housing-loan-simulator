type Props = { title: string; result: string };
export const MainResultCard: React.FC<Props> = ({ title, result }) => {
  return (
    <div className="bg-gray-100 w-full px-4 py-3 rounded shadow">
      <p className="text-lg">{title}</p>
      <p className="ml-2 text-3xl">{result}</p>
    </div>
  );
};
