"use client";
import Link from "next/link";
import { useState } from "react";
import Button from "./button";
import SVG from "./svg";
import { BeakerIcon } from "@heroicons/react/24/outline";
function Header({ closeOnClick }) {
  return (
    <li className="flex">
      <span className="font-bold flex-1 items-center py-2 text-gray-900">
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
  return (
    <li>
      <Link
        onClick={onClick}
        href={link}
        className="flex items-center p-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 mb-1"
      >
        <SVG src={svg} />
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
        className={`fixed top-0 left-0 z-30 border-r-2 border-gray-200 sm:w-72 w-full h-screen bg-white duration-200 drop-shadow rounded-r-xl transition-transform -translate-x-full ${
          isVisible ? "translate-x-0" : ""
        }`}
      >
        <div className="h-full p-4 overflow-y-auto">
          <ul className="font-medium">
            <Header closeOnClick={toggleVisibility} />
            <Title title="Allgemein" />
            <Item
              onClick={toggleVisibility}
              link="/admin/"
              text="Home"
              svg="/home.svg"
            />
            <Divider />
            <Title title="Produkt" />
            <Item
              onClick={toggleVisibility}
              link="/admin/"
              text="Menüs"
              svg="/menus.svg"
            />
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
              link="/admin/products"
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
              link="/admin/statistic"
              text="Statistik"
              svg="/statistic.svg"
            />
            <Divider />
            <Title title="Geräte" />
            <Item
              onClick={toggleVisibility}
              link="/admin/systemStatus"
              text="Clients"
              svg="/client.svg"
            />
            <Item
              onClick={toggleVisibility}
              link="/admin/systemStatus"
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
              link="/admin/systemStatus"
              text="Aufträge"
              svg="/printOrder.svg"
            />
            <Item
              onClick={toggleVisibility}
              link="/admin/systemStatus"
              text="Drucke"
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
              link="/admin/systemStatus"
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
