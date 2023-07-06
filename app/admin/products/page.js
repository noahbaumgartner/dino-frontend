"use client";
import Button from "@/components/button";
import SVG from "@/components/svg";
import Table from "@/components/table";
import TableBody from "@/components/tablebody";
import TableBodyField from "@/components/tablebodyfield";
import TableHead from "@/components/tablehead";
import TableHeadField from "@/components/tableheadfield";
import TableRow from "@/components/tablerow";
import Title from "@/components/title";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "@/api/services/productService";
import Input from "@/components/input";

function ProductTable({ items, router, deleteItem }) {
  return (
    <Table>
      <TableHead>
        <TableHeadField className="text-center" minWidth="40px">
          #
        </TableHeadField>
        <TableHeadField className="text-left" minWidth="200px">
          Produkt
        </TableHeadField>
        <TableHeadField className="text-right" minWidth="350px">
          Preis
        </TableHeadField>
        <TableHeadField className="text-right" minWidth="400px">
          Aktionen
        </TableHeadField>
      </TableHead>
      <TableBody>
        {items &&
          items.map((item) => (
            <TableRow
              onClick={() => router.push(`/admin/products/${item.id}`)}
              key={item.id}
            >
              <TableBodyField className="text-center">{item.id}</TableBodyField>
              <TableBodyField>{item.name}</TableBodyField>
              <TableBodyField>{item.price}</TableBodyField>
              <TableBodyField>
                <Button
                  className="float-right ml-2 z-10"
                  border={false}
                  onClick={(event) => deleteItem(event, item.id)}
                >
                  <SVG src="/delete.svg" className="mr-2" />
                  Löschen
                </Button>
              </TableBodyField>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default function Products() {
  const [items, setItems] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const router = useRouter();

  const loadProducts = () => {
    getProducts()
      .then((response) => {
        setItems(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addItem = (name, price) => {
    if (name) {
      createProduct(name, price).then(() => {
        setProductName("");
        setProductPrice(0);
        loadProducts();
      });
    }
  };
  const deleteItem = (event, id) => {
    event.stopPropagation();
    deleteProduct(id).then(() => {
      loadProducts();
    });
  };

  useEffect(() => {
    loadProducts();
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
          <ProductTable items={items} router={router} deleteItem={deleteItem} />
        </div>
      )}
    </div>
  );
}
