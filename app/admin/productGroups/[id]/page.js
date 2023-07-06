"use client";
import {
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
import ProductGroup from "@/api/models/productGroup.model";

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
  const [productGroup, setProductGroup] = useState(false);
  const [productGroupName, setProductGroupName] = useState("");
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
  const changeName = (name) => {
    if (name) {
      putProductGroup(params.id, name).then(() => {
        loadProductGroup();
      });
    }
  };

  useEffect(() => {
    loadProductGroup();
  }, []);

  let items = [new ProductGroup(1, "Test"), new ProductGroup(2, "Test 2")];
  items.push(new ProductGroup(2, "Test"));
  items.push(new ProductGroup(2, "Test"));
  items.push(new ProductGroup(2, "Test"));
  items.push(new ProductGroup(2, "Test"));
  items.push(new ProductGroup(2, "Test"));
  items.push(new ProductGroup(2, "Test"));
  items.push(new ProductGroup(2, "Test"));
  items.push(new ProductGroup(2, "Test"));
  items.push(new ProductGroup(2, "Test"));
  items.push(new ProductGroup(2, "Test"));

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
        </div>
      )}
      <ProductAssignmentTable items={items} />
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
