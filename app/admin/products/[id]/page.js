"use client";
import Button from "@/components/admin/button";
import Loader from "@/components/loader";
import Title from "@/components/admin/title";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SVG from "@/components/svg";
import Input from "@/components/admin/input";
import {
  createAssignmentForProduct,
  deleteAssignmentForProduct,
  getAssignmentsForProduct,
  getProduct,
  putProduct,
} from "@/api/services/productService";
import { ItemTable } from "@/components/admin/itemtable";
import { getModifierGroups } from "@/api/services/modifierGroupService";

export default function SingleProductGroup({ params }) {
  const [product, setProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
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
          if (assignments.includes(modifierGroup.id)) modifierGroup.setAssigned(true);
        });
        setModifierGroups(modifierGroups);
      });
    });
  };

  const searchAssignments = (searchTerm, modifierGroups) => {
    modifierGroups.forEach((modifierGroup) => {
      if (!searchTerm || modifierGroup.name.includes(searchTerm))
        modifierGroup.setHidden(false);
      else modifierGroup.setHidden(true);
    });
    return modifierGroups;
  };

  const assignItem = (id) => {
    createAssignmentForProduct(params.id, id).then(() => {
      loadModifierGroups();
    });
  };

  const unassignItem = (id) => {
    deleteAssignmentForProduct(params.id, id).then(() => {
      loadModifierGroups();
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
          <Input
            type="text"
            placeholder="Suchen"
            className="block md:flex-1 mb-4 w-full"
            value={searchTerm}
            onChange={(value) => {
              setSearchTerm(value.currentTarget.value);
              setModifierGroups(
                searchAssignments(value.currentTarget.value, modifierGroups)
              );
            }}
          />
          <ItemTable
            columns={["name"]}
            columnNames={["Modifier-Gruppe"]}
            columnClasses={["text-left"]}
            columnWidths={["200px"]}
            assignItem={assignItem}
            unassignItem={unassignItem}
            items={modifierGroups}
            hiddenAttribute={true}
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
