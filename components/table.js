export default function Table({ children, className }) {
  return (
    <div
      className={`overflow-x-scroll rounded-lg drop-shadow-sm border-2 border-gray-200 ${className}`}
    >
      <table className="table-auto w-full border-none rounded-lg min-w-full whitespace-no-wrap">
        {children}
      </table>
    </div>
  );
}
