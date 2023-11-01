"use client";
import Header from "@/components/header";
import SVG from "@/components/svg";
import { useRouter } from "next/navigation";
import { useState } from "react";

const menuTypes = {
  TABLES: "Tische",
  ROOM_PLAN: "Saalplan"
}

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [selected, setSelected] = useState(menuTypes.TABLES);

  const router = useRouter();

  return (
    <main>
      <Header tabs={[101, 102, 103, 202, 204, 505]}>
        <div className="relative inline-block text-left">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="inline-flex items-center justify-center py-2 pl-2 rounded-md text-sm font-header">
            {selected}
            <SVG src="/greaterDown.svg" className={`ml-2 duration-200 ${showMenu ? "rotate-0" : "rotate-90"}`} />
          </button>
          {showMenu ? (
            <div className="absolute right-0 z-10 mt-2 origin-top-right bg-white border-2 border-gray-200 shadow-md rounded-md w-32 text-left">
              {Object.values(menuTypes).map((type, key) =>
                type !== selected ? (
                  <a
                    key={key}
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 font-header text-sm"
                    onClick={() => {
                      setSelected(type);
                      setShowMenu(false);
                    }}
                  >{type}</a>
                ) : null
              )}
            </div>
          ) : null}
        </div>
      </Header>
      {selected === menuTypes.TABLES ? (
        <div className="w-full bg-blue-200 h-full">
          .
        </div>
      ) : (
        <div>
          Saalplan
        </div>
      )}
    </main >
  );
}
