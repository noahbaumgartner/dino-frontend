"use client";
import Button from "@/components/button";
import Loader from "@/components/loader";
import Title from "@/components/title";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SVG from "@/components/svg";
import Input from "@/components/input";
import {
  createAssignmentForProduct,
  createModifierForProduct,
  deleteAssignmentForProduct,
  deleteModifierForProduct,
  getAssignmentsForProduct,
  getModifiersForProduct,
  getProduct,
  putProduct,
} from "@/api/services/productService";
import { ItemTable } from "@/components/itemtable";
import { getModifierGroups } from "@/api/services/modifierGroupService";

export default function SingleProductGroup({ params }) {
  const [product, setProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [modifierGroups, setModifierGroups] = useState([]);
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

  const loadModifierGroups = () => {
    getModifierGroups(params.id).then(modifierGroups => {
      getAssignmentsForProduct(params.id).then(assignments => {
        modifierGroups.forEach(modifierGroup => {
          if (assignments.includes(product.id)) modifierGroup.setAssigned(true);
        });
        setModifierGroups(modifierGroups);
      });
    });
  };

  const assignItem = (id) => {
    createAssignmentForProduct(params.id, id).then(() => {
      loadProductAssignments();
    });
  };

  const unassignItem = (id) => {
    deleteAssignmentForProduct(params.id, id).then(() => {
      loadProductAssignments();
    });
  };

  useEffect(() => {
    loadProduct();
    loadModifierGroups();
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
          <ItemTable
            columns={["id", "name"]}
            columnNames={["#", "Modifier-Gruppe"]}
            columnClasses={["text-center", "text-left"]}
            columnWidths={["40px", "200px"]}
            assignItem={assignItem}
            unassignItem={unassignItem}
            items={modifierGroups}
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
