export default function Button({
  children,
  onClick,
  className,
  square = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center ${
        square ? "p-2" : "px-2.5 py-1.5"
      } bg-white text-gray-900 rounded-lg hover:bg-gray-100 border-2 focus:outline focus:outline-2 focus:outline-gray-900 focus:outline-offset-2 ${className}`}
    >
      {children}
    </button>
  );
}
