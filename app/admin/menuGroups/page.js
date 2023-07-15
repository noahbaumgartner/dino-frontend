"use client";
import Button from "@/components/button";
import SVG from "@/components/svg";
import Title from "@/components/title";
import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Input from "@/components/input";
import { ItemTable } from "@/components/itemtable";
import {
  createMenuGroup,
  deleteMenuGroup,
  getMenuGroups,
} from "@/api/services/menuGroupService";

export default function MenuGroups() {
  const [items, setItems] = useState(false);
  const [menuGroupName, setMenuGroupName] = useState("");

  const loadItems = () => {
    getMenuGroups()
      .then((response) => {
        setItems(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addItem = (name) => {
    if (name) {
      createMenuGroup(name).then(() => {
        setMenuGroupName("");
        loadItems();
      });
    }
  };
  const deleteItem = (event, id) => {
    event.stopPropagation();
    deleteMenuGroup(id).then(() => {
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
          <Title>Menü-Gruppen</Title>
          <div className="mb-4 md:flex">
            <Input
              type="text"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={menuGroupName}
              onChange={(value) => {
                setMenuGroupName(value.currentTarget.value);
              }}
            />
            <Button
              onClick={() => addItem(menuGroupName)}
              className="drop-shadow"
            >
              <SVG src="/add.svg" className="mr-2" />
              Menü-Gruppe hinzufügen
            </Button>
          </div>
          <ItemTable
            columns={["id", "name"]}
            columnNames={["#", "Menü-Gruppe"]}
            columnClasses={["text-center", "text-left"]}
            columnWidths={["40px", "200px"]}
            items={items}
            onClickRoute="admin/menuGroups/"
            deleteItem={deleteItem}
          />
        </div>
      )}
    </div>
  );
}
