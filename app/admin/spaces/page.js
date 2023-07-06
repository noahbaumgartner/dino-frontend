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
  createSpace,
  deleteSpace,
  getSpaces,
} from "@/api/services/SpaceService";
import Input from "@/components/input";

function SpaceTable({ items, router, deleteItem }) {
  return (
    <Table>
      <TableHead>
        <TableHeadField className="text-center" minWidth="40px">
          #
        </TableHeadField>
        <TableHeadField className="text-left" minWidth="200px">
          Bereich
        </TableHeadField>
        <TableHeadField className="text-right" minWidth="400px">
          Aktionen
        </TableHeadField>
      </TableHead>
      <TableBody>
        {items &&
          items.map((item) => (
            <TableRow
              onClick={() => router.push(`/admin/spaces/${item.id}`)}
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

export default function Spaces() {
  const [items, setItems] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const [spacePlan, setSpacePlan] = useState(0);
  const router = useRouter();

  const loadSpaces = () => {
    getSpaces()
      .then((response) => {
        setItems(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addItem = (name) => {
    if (name) {
      createSpace(name, "").then(() => {
        setSpaceName("");
        setSpacePlan(0);
        loadSpaces();
      });
    }
  };
  const deleteItem = (event, id) => {
    event.stopPropagation();
    deleteSpace(id).then(() => {
      loadSpaces();
    });
  };

  useEffect(() => {
    loadSpaces();
  }, []);

  return (
    <div>
      {!items ? (
        <Loader />
      ) : (
        <div>
          <Title>Bereiche</Title>
          <div className="mb-4 md:flex">
            <Input
              type="text"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={spaceName}
              onChange={(value) => {
                setSpaceName(value.currentTarget.value);
              }}
            />
            <Button
              onClick={() => addItem(spaceName, spacePlan)}
              className="drop-shadow"
            >
              <SVG src="/add.svg" className="mr-2" />
              Bereich hinzufügen
            </Button>
          </div>
          <SpaceTable items={items} router={router} deleteItem={deleteItem} />
        </div>
      )}
    </div>
  );
}
