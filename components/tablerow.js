export default function TableRow({ children, onClick }) {
  return (
    <tr
      onClick={onClick}
      className="hover:bg-gray-50 cursor-pointer focus:outline focus:outline-2 focus:outline-gray-900 focus:outline-offset-2"
    >
      {children}
    </tr>
  );
}
