"use client";
import Button from "@/components/button";
import SVG from "@/components/svg";
import Title from "@/components/title";
import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "@/api/services/productService";
import Input from "@/components/input";
import { ItemTable } from "@/components/itemtable";

export default function Products() {
  const [items, setItems] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);

  const loadItems = () => {
    getProducts()
      .then((response) => {
        setItems(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addItem = (name, price) => {
    if (name && price) {
      createProduct(name, price).then(() => {
        setProductName("");
        setProductPrice(0);
        loadItems();
      });
    }
  };
  const deleteItem = (event, id) => {
    event.stopPropagation();
    deleteProduct(id).then(() => {
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
          <Title>Produkte</Title>
          <div className="mb-4 md:flex">
            <Input
              type="text"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={productName}
              onChange={(value) => {
                setProductName(value.currentTarget.value);
              }}
            />
            <Input
              type="number"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={productPrice}
              onChange={(value) => {
                setProductPrice(value.currentTarget.value);
              }}
            />
            <Button
              onClick={() => addItem(productName, productPrice)}
              className="drop-shadow"
            >
              <SVG src="/add.svg" className="mr-2" />
              Produkt hinzufügen
            </Button>
          </div>
          <ItemTable
            columns={["id", "name", "price"]}
            columnNames={["#", "Produkt", "Preis"]}
            columnClasses={["text-center", "text-left", "text-right"]}
            columnWidths={["40px", "200px", "350px"]}
            items={items}
            onClickRoute="admin/products/"
            deleteItem={deleteItem}
          />
        </div>
      )}
    </div>
  );
}
