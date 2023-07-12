"use client";
import {
  getProductGroups,
  createProductGroup,
  deleteProductGroup,
} from "@/api/services/productGroupService";
import Button from "@/components/button";
import SVG from "@/components/svg";
import Title from "@/components/title";
import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Input from "@/components/input";
import { ItemTable } from "@/components/itemtable";

export default function ProductGroups() {
  const [items, setItems] = useState(false);
  const [productGroup, setProductGroup] = useState("");

  const loadItems = () => {
    getProductGroups()
      .then((response) => {
        setItems(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addItem = (name) => {
    if (name) {
      createProductGroup(name).then(() => {
        setProductGroup("");
        loadItems();
      });
    }
  };
  const deleteItem = (event, id) => {
    event.stopPropagation();
    deleteProductGroup(id).then(() => {
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
          <Title>Produkt-Gruppen</Title>
          <div className="mb-4 md:flex">
            <Input
              type="text"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={productGroup}
              onChange={(value) => {
                setProductGroup(value.currentTarget.value);
              }}
            />
            <Button
              onClick={() => addItem(productGroup)}
              className="drop-shadow"
            >
              <SVG src="/add.svg" className="mr-2" />
              Gruppe hinzufügen
            </Button>
          </div>
          <ItemTable
            columns={["id", "name"]}
            columnNames={["#", "Produkt-Gruppe"]}
            columnClasses={["text-center", "text-left"]}
            columnWidths={["40px", "200px"]}
            items={items}
            onClickRoute="admin/productGroups/"
            deleteItem={deleteItem}
          />
        </div>
      )}
    </div>
  );
}
