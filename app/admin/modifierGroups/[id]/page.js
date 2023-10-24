"use client";
import {
  createAssignmentForProductGroup,
  deleteAssignmentForProductGroup,
  getAssignmentsForProductGroup,
  getProductGroup,
  putProductGroup,
} from "@/api/services/productGroupService";
import Button from "@/components/admin/button";
import Loader from "@/components/loader";
import Title from "@/components/admin/title";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SVG from "@/components/svg";
import Input from "@/components/admin/input";
import { ItemTable } from "@/components/admin/itemtable";
import { createModifierForModifierGroup, deleteModifierForModifierGroup, getModifierGroup, getModifiersForModifierGroup, putModifierGroup } from "@/api/services/modifierGroupService";

export default function SingleProductGroup({ params }) {
  const [modifierGroup, setModifierGroup] = useState(false);
  const [modifierGroupName, setModifierGroupName] = useState("");
  const [modifiers, setModifiers] = useState([]);
  const [modifierName, setModifierName] = useState("");
  const [modifierPriceDiff, setModifierPriceDiff] = useState(0);
  const router = useRouter();

  const loadModifierGroup = () => {
    getModifierGroup(params.id)
      .then((response) => {
        setModifierGroup(response);
        setModifierGroupName(response.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadModifiers = () => {
    getModifiersForModifierGroup(params.id)
      .then(response => {
        setModifiers(response);
      })
  };

  const changeName = (name) => {
    if (name) {
      putModifierGroup(params.id, name).then(() => {
        loadModifierGroup();
      });
    }
  };

  const addItem = (name, priceDiff) => {
    if (name) {
      createModifierForModifierGroup(params.id, name, priceDiff).then(() => {
        setModifierName("");
        setModifierPriceDiff(0);
        loadModifiers();
      });
    }
  };

  const deleteItem = (event, id) => {
    event.stopPropagation();
    deleteModifierForModifierGroup(params.id, id).then(() => {
      loadModifiers();
    });
  };

  useEffect(() => {
    loadModifierGroup();
    loadModifiers();
  }, []);

  return (
    <div>
      {!modifierGroup ? (
        <Loader />
      ) : (
        <div>
          <Title>Modifier-Gruppe: {modifierGroup.name}</Title>
          <div className="mb-4 md:flex">
            <Input
              type="text"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={modifierGroupName}
              onChange={(value) => {
                setModifierGroupName(value.currentTarget.value);
              }}
            />
            <Button
              onClick={() => changeName(modifierGroupName)}
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
              onClick={() => addItem(modifierName, modifierPriceDiff)}
              className="drop-shadow"
            >
              <SVG src="/add.svg" className="mr-2" />
              Modifier hinzufügen
            </Button>
          </div>
          <ItemTable
            columns={["name", "priceDiff"]}
            columnNames={["Modifier", "Preis-Differenz"]}
            columnClasses={["text-left", "text-right"]}
            columnWidths={["200px", "350px"]}
            items={modifiers}
            deleteItem={deleteItem}
          />
        </div>
      )}
      <Button
        onClick={() => router.push("/admin/modifierGroups")}
        className="fixed left-4 bottom-4 drop-shadow z-20"
      >
        <SVG src="/back.svg" className="mr-2" />
        Zurück
      </Button>
    </div>
  );
}
