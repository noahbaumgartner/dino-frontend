export default function Table({ children }) {
  return (
    <div className="overflow-x-scroll border-2 border-gray-200 rounded-lg drop-shadow-sm">
      <table className="table-auto w-full border-none rounded-lg min-w-full whitespace-no-wrap">
        {children}
      </table>
    </div>
  );
}
