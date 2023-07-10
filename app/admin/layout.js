import Sidenav from "@/components/sidenav";

export const metadata = {
  title: "Admin | Dino",
};

export default function AdminLayout({ children }) {
  return (
    <div className="bg-white">
      <Sidenav />
      <main className="min-h-screen w-full container mx-auto pt-12 pb-20 md:py-16">
        {children}
      </main>
    </div>
  );
}
