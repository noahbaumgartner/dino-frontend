"use client";
import Button from "@/components/admin/button";
import SVG from "@/components/svg";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedStart, setSelectedStart] = useState("Saalplan");
  const [selection, setSelection] = useState("Tisch");

  const router = useRouter();

  return (
    <main>
      <div className="md:p-12 p-4 w-full">
        <h1 className="text-3xl font-header font-semibold inline-block">Dino 🦖</h1>

        <div className="relative inline-block text-left float-right">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="inline-flex items-center justify-center py-2 pl-2 rounded-md font-header">
            {selectedStart}
            <SVG src="/greaterDown.svg" className="ml-2" />
          </button>
          {showMenu ? (
            <div className="absolute right-0 z-10 mt-2 origin-top-right bg-white border-2 border-gray-200 shadow-md rounded-md w-36 text-left">
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-header"
                onClick={() => {
                  const oldStart = selectedStart
                  setSelectedStart(selection)
                  setSelection(oldStart)
                  setShowMenu(false)
                }}
              >{selection}</a>
            </div>
          ) : null}
        </div>
      </div>
    </main >
  );
}
