export default function Input({
  children,
  type,
  value,
  placeholder,
  onChange,
  className,
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`drop-shadow h-10 text-sm py-1.5 px-2.5 text-gray-900 rounded-lg border-2 border-gray-200 focus:outline focus:outline-2 focus:outline-gray-900 focus:outline-offset-2 ${className}`}
    >
      {children}
    </input>
  );
}
