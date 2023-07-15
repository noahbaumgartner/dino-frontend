"use client";
import Button from "@/components/button";
import Loader from "@/components/loader";
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
import { ItemTable } from "@/components/itemtable";

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
          <ItemTable
            columns={["id", "name", "priceDiff"]}
            columnNames={["#", "Modifier", "Preis-Differenz"]}
            columnClasses={["text-center", "text-left", "text-right"]}
            columnWidths={["40px", "200px", "350px"]}
            items={modifiers}
            deleteItem={deleteModifier}
          />
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
