export default function TableBodyField({ children, className }) {
  return <td className={`px-3 py-1 ${className}`}>{children}</td>;
}
