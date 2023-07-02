import Sidenav from "@/components/sidenav";

export default function AdminLayout({ children }) {
  return (
    <div>
      <Sidenav />
      <main className="min-h-full md:min-h-screen w-full container mx-auto my-20 md:my-10">
        {children}
      </main>
    </div>
  );
}
