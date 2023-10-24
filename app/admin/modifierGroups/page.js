"use client";
import Button from "@/components/admin/button";
import SVG from "@/components/svg";
import Title from "@/components/admin/title";
import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Input from "@/components/admin/input";
import { ItemTable } from "@/components/admin/itemtable";
import { createModifierGroup, deleteModifierGroup, getModifierGroups } from "@/api/services/modifierGroupService";

export default function ModifierGroups() {
  const [items, setItems] = useState(false);
  const [modifierGroup, setModifierGroup] = useState("");

  const loadItems = () => {
    getModifierGroups()
      .then((response) => {
        setItems(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addItem = (name) => {
    if (name) {
      createModifierGroup(name).then(() => {
        setModifierGroup("");
        loadItems();
      });
    }
  };

  const deleteItem = (event, id) => {
    event.stopPropagation();
    deleteModifierGroup(id).then(() => {
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
          <Title>Modifier-Gruppen</Title>
          <div className="mb-4 md:flex">
            <Input
              type="text"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={modifierGroup}
              onChange={(value) => {
                setModifierGroup(value.currentTarget.value);
              }}
            />
            <Button
              onClick={() => addItem(modifierGroup)}
              className="drop-shadow"
            >
              <SVG src="/add.svg" className="mr-2" />
              Gruppe hinzufügen
            </Button>
          </div>
          <ItemTable
            columns={["name"]}
            columnNames={["Modifier-Gruppe"]}
            columnClasses={["text-left"]}
            columnWidths={["200px"]}
            items={items}
            onClickRoute="admin/modifierGroups/"
            deleteItem={deleteItem}
          />
        </div>
      )}
    </div>
  );
}
