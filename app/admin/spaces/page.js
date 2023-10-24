"use client";
import Button from "@/components/admin/button";
import SVG from "@/components/svg";
import Title from "@/components/admin/title";
import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import {
  createSpace,
  deleteSpace,
  getSpaces,
} from "@/api/services/SpaceService";
import Input from "@/components/admin/input";
import { ItemTable } from "@/components/admin/itemtable";

export default function Spaces() {
  const [items, setItems] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const [spacePlan, setSpacePlan] = useState(0);

  const loadItems = () => {
    getSpaces()
      .then((response) => {
        setItems(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addItem = (name) => {
    if (name) {
      createSpace(name, "").then(() => {
        setSpaceName("");
        setSpacePlan(0);
        loadItems();
      });
    }
  };
  const deleteItem = (event, id) => {
    event.stopPropagation();
    deleteSpace(id).then(() => {
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
          <Title>Bereiche</Title>
          <div className="mb-4 md:flex">
            <Input
              type="text"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={spaceName}
              onChange={(value) => {
                setSpaceName(value.currentTarget.value);
              }}
            />
            <Button
              onClick={() => addItem(spaceName, spacePlan)}
              className="drop-shadow"
            >
              <SVG src="/add.svg" className="mr-2" />
              Bereich hinzufügen
            </Button>
          </div>
          <ItemTable
            columns={["name"]}
            columnNames={["Bereich"]}
            columnClasses={["text-left"]}
            columnWidths={["200px"]}
            items={items}
            onClickRoute="admin/spaces/"
            deleteItem={deleteItem}
          />
        </div>
      )}
    </div>
  );
}
