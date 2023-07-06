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
import { getProducts } from "@/api/services/productService";

function ProductAssignmentTable({ products, assignItem, unassignItem }) {
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
        {products &&
          products.map((product) =>
            !product.hidden ? (
              <TableRow key={product.id}>
                <TableBodyField className="text-center">
                  {product.id}
                </TableBodyField>
                <TableBodyField>{product.name}</TableBodyField>
                <TableBodyField>
                  {product.assigned ? (
                    <Button
                      className="float-right ml-2 z-10"
                      border={false}
                      onClick={() => unassignItem(product.id)}
                    >
                      <SVG src="/x-mark.svg" className="mr-2" />
                      Zuweisung entfernen
                    </Button>
                  ) : (
                    <Button
                      className="float-right ml-2 z-10"
                      border={false}
                      onClick={() => assignItem(product.id)}
                    >
                      <SVG src="/check.svg" className="mr-2" />
                      Zuweisen
                    </Button>
                  )}
                </TableBodyField>
              </TableRow>
            ) : null
          )}
      </TableBody>
    </Table>
  );
}

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
          <ProductAssignmentTable
            products={products}
            assignItem={assignItem}
            unassignItem={unassignItem}
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
