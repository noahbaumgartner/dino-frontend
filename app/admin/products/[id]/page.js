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
import {
  createModifierForProduct,
  deleteModifierForProduct,
  getModifiersForProduct,
  getProduct,
  putProduct,
} from "@/api/services/productService";

function ModifierTable({ modifiers, deleteItem }) {
  return (
    <Table>
      <TableHead>
        <TableHeadField className="text-center" minWidth="40px">
          #
        </TableHeadField>
        <TableHeadField className="text-left" minWidth="200px">
          Modifier
        </TableHeadField>
        <TableHeadField className="text-right" minWidth="350px">
          Preis-Differenz
        </TableHeadField>
        <TableHeadField className="text-right" minWidth="350px">
          Aktionen
        </TableHeadField>
      </TableHead>
      <TableBody>
        {modifiers &&
          modifiers.map((modifier) => (
            <TableRow key={modifier.id}>
              <TableBodyField className="text-center">
                {modifier.id}
              </TableBodyField>
              <TableBodyField>{modifier.name}</TableBodyField>
              <TableBodyField className="text-right">
                {modifier.priceDiff} CHF
              </TableBodyField>
              <TableBodyField>
                <Button
                  className="float-right ml-2 z-10"
                  border={false}
                  onClick={(event) => deleteItem(event, modifier.id)}
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

export default function SingleProductGroup({ params }) {
  const [product, setProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [modifierName, setModifierName] = useState("");
  const [modifierPriceDiff, setModifierPriceDiff] = useState(0);
  const [modifiers, setModifiers] = useState(false);
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
  const changeProduct = (name, price) => {
    if (name && price) {
      putProduct(params.id, name, price).then(() => {
        loadProduct();
      });
    }
  };
  const loadModifiers = () => {
    getModifiersForProduct(params.id).then((response) => {
      setModifiers(response);
    });
  };
  const addModifier = (name, priceDiff) => {
    if (name) {
      createModifierForProduct(name, priceDiff, params.id).then(() => {
        loadModifiers();
        setModifierName("");
        setModifierPriceDiff(0);
      });
    }
  };
  const deleteModifier = (event, id) => {
    event.stopPropagation();
    deleteModifierForProduct(id, params.id).then(() => {
      loadModifiers();
    });
  };

  useEffect(() => {
    loadProduct();
    loadModifiers();
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
              onClick={() => changeProduct(productName, productPrice)}
              className="drop-shadow"
            >
              <SVG src="/change.svg" className="mr-2" />
              Ändern
            </Button>
          </div>
          <div className="mb-4 md:flex">
            <Input
              type="text"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={modifierName}
              onChange={(value) => {
                setModifierName(value.currentTarget.value);
              }}
            />
            <Input
              type="number"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={modifierPriceDiff}
              onChange={(value) => {
                setModifierPriceDiff(value.currentTarget.value);
              }}
            />
            <Button
              onClick={() => addModifier(modifierName, modifierPriceDiff)}
              className="drop-shadow"
            >
              <SVG src="/add.svg" className="mr-2" />
              Modifier hinzufügen
            </Button>
          </div>
          <ModifierTable modifiers={modifiers} deleteItem={deleteModifier} />
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
