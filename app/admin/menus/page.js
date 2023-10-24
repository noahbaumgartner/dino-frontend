"use client";
import Button from "@/components/admin/button";
import SVG from "@/components/svg";
import Title from "@/components/admin/title";
import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Input from "@/components/admin/input";
import { ItemTable } from "@/components/admin/itemtable";
import { createMenu, deleteMenu, getMenus } from "@/api/services/menuService";

export default function Menus() {
  const [items, setItems] = useState(false);
  const [menuName, setMenuName] = useState("");

  const loadItems = () => {
    getMenus()
      .then((response) => {
        setItems(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addItem = (name) => {
    if (name) {
      createMenu(name).then(() => {
        setMenuName("");
        loadItems();
      });
    }
  };
  const deleteItem = (event, id) => {
    event.stopPropagation();
    deleteMenu(id).then(() => {
      loadItems();
    });
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      {!items ? (
        <Loader />
      ) : (
        <div>
          <Title>Menüs</Title>
          <div className="mb-4 md:flex">
            <Input
              type="text"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={menuName}
              onChange={(value) => {
                setMenuName(value.currentTarget.value);
              }}
            />
            <Button onClick={() => addItem(menuName)} className="drop-shadow">
              <SVG src="/add.svg" className="mr-2" />
              Menü hinzufügen
            </Button>
          </div>
          <ItemTable
            columns={["name"]}
            columnNames={["Menü"]}
            columnClasses={["text-left"]}
            columnWidths={["200px"]}
            items={items}
            onClickRoute="admin/menus/"
            deleteItem={deleteItem}
          />
        </div>
      )}
    </div>
  );
}
