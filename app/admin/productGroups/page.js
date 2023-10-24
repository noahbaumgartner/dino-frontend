"use client";
import {
  getProductGroups,
  createProductGroup,
  deleteProductGroup,
} from "@/api/services/productGroupService";
import Button from "@/components/admin/button";
import SVG from "@/components/svg";
import Title from "@/components/admin/title";
import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Input from "@/components/admin/input";
import { ItemTable } from "@/components/admin/itemtable";

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
            columns={["name"]}
            columnNames={["Produkt-Gruppe"]}
            columnClasses={["text-left"]}
            columnWidths={["200px"]}
            items={items}
            onClickRoute="admin/productGroups/"
            deleteItem={deleteItem}
          />
        </div>
      )}
    </div>
  );
}
