"use client";
import {
  createAssignmentForProductGroup,
  deleteAssignmentForProductGroup,
  getAssignmentsForProductGroup,
  getProductGroup,
  putProductGroup,
} from "@/api/services/productGroupService";
import Button from "@/components/button";
import Loader from "@/components/loader";
import Title from "@/components/title";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SVG from "@/components/svg";
import Input from "@/components/input";
import { getProducts } from "@/api/services/productService";
import { ItemTable } from "@/components/itemtable";

export default function SingleProductGroup({ params }) {
  const [productGroup, setProductGroup] = useState(false);
  const [products, setProducts] = useState(false);
  const [productGroupName, setProductGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const loadProductGroup = () => {
    getProductGroup(params.id)
      .then((response) => {
        setProductGroup(response);
        setProductGroupName(response.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadProductAssignments = () => {
    getProducts().then((products) => {
      getAssignmentsForProductGroup(params.id).then((assignments) => {
        products.forEach((product) => {
          if (assignments.includes(product.id)) product.setAssigned(true);
        });
        setProducts(searchAssignments(searchTerm, products));
      });
    });
  };
  const changeName = (name) => {
    if (name) {
      putProductGroup(params.id, name).then(() => {
        loadProductGroup();
      });
    }
  };
  const assignItem = (id) => {
    createAssignmentForProductGroup(params.id, id).then(() => {
      loadProductAssignments();
    });
  };
  const unassignItem = (id) => {
    deleteAssignmentForProductGroup(params.id, id).then(() => {
      loadProductAssignments();
    });
  };
  const searchAssignments = (searchTerm, products) => {
    products.forEach((product) => {
      if (!searchTerm || product.name.includes(searchTerm))
        product.setHidden(false);
      else product.setHidden(true);
    });
    return products;
  };

  useEffect(() => {
    loadProductGroup();
    loadProductAssignments();
  }, []);

  return (
    <div>
      {!productGroup ? (
        <Loader />
      ) : (
        <div>
          <Title>Produkt-Gruppe: {productGroup.name}</Title>
          <div className="mb-4 md:flex">
            <Input
              type="text"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={productGroupName}
              onChange={(value) => {
                setProductGroupName(value.currentTarget.value);
              }}
            />
            <Button
              onClick={() => changeName(productGroupName)}
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
              setProducts(
                searchAssignments(value.currentTarget.value, products)
              );
            }}
          />
          <ItemTable
            columns={["id", "name"]}
            columnNames={["#", "Produkt"]}
            columnClasses={["text-center", "text-left"]}
            columnWidths={["40px", "200px"]}
            items={products}
            assignItem={assignItem}
            unassignItem={unassignItem}
            hiddenAttribute={true}
          />
        </div>
      )}
      <Button
        onClick={() => router.push("/admin/productGroups")}
        className="fixed left-4 bottom-4 drop-shadow z-20"
      >
        <SVG src="/back.svg" className="mr-2" />
        Zurück
      </Button>
    </div>
  );
}
