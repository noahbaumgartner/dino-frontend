"use client";
import Button from "@/components/button";
import SVG from "@/components/svg";
import Title from "@/components/title";
import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Input from "@/components/input";
import {
  createPrintTemplate,
  deletePrintTemplate,
  getPrintTemplates,
} from "@/api/services/printTemplateService";
import { ItemTable } from "@/components/itemtable";

export default function PrintTemplates() {
  const [items, setItems] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const loadItems = () => {
    getPrintTemplates()
      .then((response) => {
        setItems(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addItem = (name) => {
    if (name) {
      createPrintTemplate(name).then(() => {
        setTemplateName("");
        loadItems();
      });
    }
  };
  const deleteItem = (event, id) => {
    event.stopPropagation();
    deletePrintTemplate(id).then(() => {
      loadItems();
    });
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      {!items ? (
        <Loader />
      ) : (
        <div>
          <Title>Druckvorlagen</Title>
          <div className="mb-4 md:flex">
            <Input
              type="text"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={templateName}
              onChange={(value) => {
                setTemplateName(value.currentTarget.value);
              }}
            />
            <Button
              onClick={() => addItem(templateName)}
              className="drop-shadow"
            >
              <SVG src="/add.svg" className="mr-2" />
              Vorlage hinzufügen
            </Button>
          </div>
          <ItemTable
            columns={["id", "name"]}
            columnNames={["#", "Vorlage"]}
            columnClasses={["text-center", "text-left"]}
            columnWidths={["40px", "200px"]}
            items={items}
            onClickRoute="admin/printTemplates/"
            deleteItem={deleteItem}
          />
        </div>
      )}
    </div>
  );
}
