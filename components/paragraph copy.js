export default function Popup({ children }) {
  return (
    <div className="w-full p-4 h-auto border-2 border-gray-200 bg-white z-10 drop-shadow rounded-lg">
      {children}
    </div>
  );
}
