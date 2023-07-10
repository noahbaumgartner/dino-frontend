"use client";
import Button from "@/components/button";
import SVG from "@/components/svg";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <Button
        onClick={() => router.push("/admin")}
        className="fixed left-4 bottom-4 drop-shadow z-20"
      >
        <SVG src="/arrowRight.svg" className="mr-2" />
        Zum Admin
      </Button>
    </main>
  );
}
