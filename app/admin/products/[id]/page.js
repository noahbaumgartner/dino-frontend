"use client";
import Button from "@/components/button";
import Loader from "@/components/loader";
import Table from "@/components/table";
import TableBody from "@/components/tablebody";
import TableBodyField from "@/components/tablebodyfield";
import TableHead from "@/components/tablehead";
import TableHeadField from "@/components/tableheadfield";
import TableRow from "@/components/tablerow";
import Title from "@/components/title";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SVG from "@/components/svg";
import Input from "@/components/input";
import { getProduct, putProduct } from "@/api/services/productService";

function ProductAssignmentTable({ items }) {
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
          Aktionen
        </TableHeadField>
      </TableHead>
      <TableBody>
        {items &&
          items.map((item) => (
            <TableRow key={item.id}>
              <TableBodyField className="text-center">{item.id}</TableBodyField>
              <TableBodyField>{item.name}</TableBodyField>
              <TableBodyField>
                <Button
                  className="float-right ml-2 z-10"
                  border={false}
                  onClick={(event) => deleteItem(event, item.id)}
                >
                  <SVG src="/x-mark.svg" className="mr-2" />
                  Zuweisung entfernen
                </Button>
              </TableBodyField>
            </TableRow>
          ))}
        <TableRow
          onClick={() => router.push(`/admin/productGroups/${item.id}`)}
        >
          <TableBodyField className="text-center">3</TableBodyField>
          <TableBodyField>Hello</TableBodyField>
          <TableBodyField>
            <Button
              className="float-right ml-2 z-10"
              border={false}
              onClick={(event) => deleteItem(event, 1)}
            >
              <SVG src="/check.svg" className="mr-2" />
              Zuweisen
            </Button>
          </TableBodyField>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default function SingleProductGroup({ params }) {
  const [product, setProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const router = useRouter();

  const loadProduct = () => {
    getProduct(params.id)
      .then((response) => {
        setProduct(response);
        setProductName(response.name);
        setProductPrice(response.price);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const change = (name, price) => {
    if (name) {
      putProduct(params.id, name, price).then(() => {
        loadProduct();
      });
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div>
      {!product ? (
        <Loader />
      ) : (
        <div>
          <Title>
            Produkt: {product.name} - {product.price.toFixed(2)} CHF
          </Title>
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
              onClick={() => change(productName, productPrice)}
              className="drop-shadow"
            >
              <SVG src="/change.svg" className="mr-2" />
              Ändern
            </Button>
          </div>
        </div>
      )}
      <Button
        onClick={() => router.push("/admin/products")}
        className="fixed left-4 bottom-4 drop-shadow z-20"
      >
        <SVG src="/back.svg" className="mr-2" />
        Zurück
      </Button>
    </div>
  );
}
