export default function Button({
  children,
  onClick,
  className,
  square = false,
  border = true,
}) {
  return (
    <button
      onClick={onClick}
      className={`${square ? "p-2" : "px-2.5 py-1.5"} ${
        border ? "border-2" : "border-none"
      } flex items-center bg-white text-gray-900 rounded-lg hover:bg-gray-100 border-gray-200 focus:outline focus:outline-2 focus:outline-gray-900 focus:outline-offset-2 ${className}`}
    >
      {children}
    </button>
  );
}
