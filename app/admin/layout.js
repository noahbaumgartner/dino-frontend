"use client";
import Sidenav from "@/components/sidenav";

export default function AdminLayout({ children }) {
  return (
    <div>
      <Sidenav />
      <main className="min-h-full md:min-h-screen w-full container mx-auto py-12 md:py-16">
        {children}
      </main>
    </div>
  );
}
