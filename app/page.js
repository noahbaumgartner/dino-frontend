"use client";
import Button from "@/components/admin/button";
import SVG from "@/components/svg";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <input
        type="text"
        className="fixed top-4 left-4 border-2 border-gray-300 px-3 py-2 focus:outline-2 focus:outline-black rounded-lg hover:bg-gray-50"
      />
    </main>
  );
}
