"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./button";
import SVG from "../svg";

function Header({ closeOnClick }) {
  return (
    <li className="flex">
      <span className="font-medium flex-1 items-center py-2 text-black font-header">
        🦖 Dino Admin
      </span>
      <Button onClick={closeOnClick} square={true}>
        <SVG src="/x-mark.svg" />
      </Button>
    </li>
  );
}

function Title({ title }) {
  return <li className="text-xs text-gray-400 py-2">{title}</li>;
}

function Item({ onClick, link, text, svg }) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        onClick={onClick}
        href={link}
        className={`flex items-center py-2 pr-2 text-black rounded-lg hover:bg-gray-100 mb-1
        ${pathname === link
            ? "bg-gradient-to-r from-gray-100 to-gray-200"
            : "bg-white"
          }`}
      >
        <div
          className={
            pathname === link ? "border-l-2 border-black pl-2" : "pl-2"
          }
        >
          <SVG src={svg} />
        </div>
        <span className="ml-3">{text}</span>
      </Link>
    </li>
  );
}

function Divider() {
  return <li className="border-b-2 border-gray-200 mt-2"></li>;
}

export default function Sidenav() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-30 overflow-auto border-r-2 border-gray-200 sm:w-72 w-full h-screen bg-white duration-200 drop-shadow transition-transform -translate-x-full ${isVisible ? "translate-x-0" : ""
          }`}
      >
        <div className="h-full p-4 overflow-y-auto">
          <ul className="font-medium">
            <Header closeOnClick={toggleVisibility} />
            <Title title="Allgemein" />
            <Item
              onClick={toggleVisibility}
              link="/admin"
              text="Home"
              svg="/home.svg"
            />
            <Divider />
            <Title title="Menüs" />
            <Item
              onClick={toggleVisibility}
              link="/admin/menus"
              text="Menüs"
              svg="/menus.svg"
            />
            <Item
              onClick={toggleVisibility}
              link="/admin/menuGroups"
              text="Menü-Gruppen"
              svg="/menuGroup.svg"
            />
            <Divider />
            <Title title="Produkte" />
            <Item
              onClick={toggleVisibility}
              link="/admin/productGroups"
              text="Produkt-Gruppen"
              svg="/productGroup.svg"
            />
            <Item
              onClick={toggleVisibility}
              link="/admin/products"
              text="Produkte"
              svg="/product.svg"
            />
            <Item
              onClick={toggleVisibility}
              link="/admin/modifierGroups"
              text="Modifier-Gruppen"
              svg="/modifier.svg"
            />
            <Divider />
            <Title title="Darstellung" />
            <Item
              onClick={toggleVisibility}
              link="/admin/spaces"
              text="Bereiche"
              svg="/space.svg"
            />
            <Divider />
            <Title title="Daten" />
            <Item
              onClick={toggleVisibility}
              link="/admin/orders"
              text="Bestellungen"
              svg="/order.svg"
            />
            <Item
              onClick={toggleVisibility}
              link="/admin/statistics"
              text="Statistiken"
              svg="/statistic.svg"
            />
            <Item
              onClick={toggleVisibility}
              link="/admin/prints"
              text="Ausdrucke"
              svg="/printOrder.svg"
            />
            <Divider />
            <Title title="Geräte" />
            <Item
              onClick={toggleVisibility}
              link="/admin/clients"
              text="Clients"
              svg="/client.svg"
            />
            <Item
              onClick={toggleVisibility}
              link="/admin/printers"
              text="Drucker"
              svg="/printer.svg"
            />
            <Divider />
            <Title title="Druck" />
            <Item
              onClick={toggleVisibility}
              link="/admin/printTemplates"
              text="Vorlagen"
              svg="/printTemplate.svg"
            />
            <Item
              onClick={toggleVisibility}
              link="/admin/printJobs"
              text="Aufträge"
              svg="/printOrder.svg"
            />
            <Divider />
            <Title title="Weiteres" />
            <Item
              onClick={toggleVisibility}
              link="/admin/systemStatus"
              text="Systemstatus"
              svg="/systemStatus.svg"
            />
            <Item
              onClick={toggleVisibility}
              link="/admin/database"
              text="Datenbank"
              svg="/database.svg"
            />
            <Item
              onClick={toggleVisibility}
              link="/admin/settings"
              text="Einstellungen"
              svg="/settings.svg"
            />
          </ul>
        </div>
      </aside>

      <Button
        onClick={toggleVisibility}
        className="drop-shadow fixed top-4 left-4 z-20"
        square={true}
      >
        <SVG src="/menu.svg" />
      </Button>
    </div>
  );
}
