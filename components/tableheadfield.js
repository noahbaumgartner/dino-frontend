export default function TableHeadField({ children, className, minWidth }) {
  return <th className={`p-3 min-w-[${minWidth}] ${className}`}>{children}</th>;
}
