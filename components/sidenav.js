"use client";

import Image from "next/image";
import { useState } from "react";

function Header({ closeOnClick }) {
  return (
    <li className="flex">
      <span className="font-bold flex-1 items-center py-2 text-gray-900">
        Admin-Menu
      </span>
      <button
        onClick={closeOnClick}
        className="w-10 flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 border-2 focus:outline focus:outline-2 focus:outline-gray-900 focus:outline-offset-2"
      >
        <Image src="/close.svg" width={20} height={20} />
      </button>
    </li>
  );
}

function Title({ title }) {
  return <li className="text-xs text-gray-400 py-2">{title}</li>;
}

function Item({ text, svg }) {
  return (
    <li>
      <a
        href="#"
        className="flex items-center p-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100"
      >
        <Image src={svg} width={20} height={20} />
        <span className="ml-3">{text}</span>
      </a>
    </li>
  );
}

function Divider() {
  return <li className="border-b-2 border-gray-200 my-2"></li>;
}

export default function Sidenav() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-20 sm:w-72 w-full h-screen duration-200 drop-shadow transition-transform -translate-x-full ${
          isVisible ? "translate-x-0" : ""
        }`}
      >
        <div className="h-full p-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <Header closeOnClick={() => setIsVisible(!isVisible)} />
            <Title title="System" />
            <Item text="Systemstatus" svg="/systemState.svg" />
            <Divider />
            <Title title="Produkt" />
            <Item text="Produkt-Gruppen" svg="/productGroup.svg" />
            <Item text="Produkte" svg="/product.svg" />
            <Divider />
            <Title title="Darstellung" />
            <Item text="Bereiche" svg="/space.svg" />
            <Divider />
            <Title title="Daten" />
            <Item text="Bestellungen" svg="/order.svg" />
            <Item text="Statistik" svg="/statistics.svg" />
            <Divider />
            <Title title="Weiteres" />
            <Item text="Einstellungen" svg="/settings.svg" />
          </ul>
        </div>
      </aside>

      <button
        onClick={() => setIsVisible(!isVisible)}
        className="drop-shadow fixed top-4 left-4 z-10 flex items-center p-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 border-2 focus:outline focus:outline-2 focus:outline-gray-900 focus:outline-offset-2"
      >
        <Image src="/menu.svg" width={20} height={20} />
      </button>
    </div>
  );
}
