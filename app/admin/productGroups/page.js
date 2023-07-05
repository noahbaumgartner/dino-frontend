"use client";
import {
  getProductGroups,
  deleteProductGroup,
} from "@/api/services/productGroupService";
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

function ProductGroupTable({ items, router, deleteItem }) {
  return (
    <Table>
      <TableHead>
        <TableHeadField className="text-center" minWidth="40px">
          #
        </TableHeadField>
        <TableHeadField className="text-left" minWidth="200px">
          Produkt-Gruppe
        </TableHeadField>
        <TableHeadField className="text-right" minWidth="350px">
          Aktionen
        </TableHeadField>
      </TableHead>
      <TableBody>
        {items &&
          items.map((item) => (
            <TableRow
              onClick={() => router.push(`/admin/productGroups/${item.id}`)}
              key={item.id}
            >
              <TableBodyField className="text-center">{item.id}</TableBodyField>
              <TableBodyField>{item.name}</TableBodyField>
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

export default function ProductGroups() {
  const [items, setItems] = useState(false);
  const router = useRouter();

  const loadProductGroups = () => {
    getProductGroups()
      .then((response) => {
        setItems(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteItem = (event, id) => {
    event.stopPropagation();
    deleteProductGroup(id);
    loadProductGroups();
  };

  useEffect(() => {
    loadProductGroups();
  }, []);

  return (
    <div>
      {!items ? (
        <Loader />
      ) : (
        <div>
          <Title>Produkt-Gruppen</Title>
          <ProductGroupTable
            items={items}
            router={router}
            deleteItem={deleteItem}
          />
          <Button className="mt-4 drop-shadow">
            <SVG src="/add.svg" className="mr-2" />
            Gruppe hinzufügen
          </Button>
        </div>
      )}
    </div>
  );
}
