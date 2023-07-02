import Sidenav from "@/components/sidenav";

export default function AdminLayout({ children }) {
  return (
    <div>
      <Sidenav />
      <main className="ml-64 min-h-screen">{children}</main>
    </div>
  );
}
