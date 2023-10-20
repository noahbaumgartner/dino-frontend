"use client";
import Button from "@/components/button";
import Loader from "@/components/loader";
import Title from "@/components/title";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SVG from "@/components/svg";
import Input from "@/components/input";
import { ItemTable } from "@/components/itemtable";
import {
  createItemForMenuGroup,
  deleteItemForMenuGroup,
  getItemsForMenuGroup,
  getMenuGroup,
  putMenuGroup,
} from "@/api/services/menuGroupService";
import { getProducts } from "@/api/services/productService";

export default function SingleMenuGroup({ params }) {
  const [menuGroup, setMenuGroup] = useState(false);
  const [menuGroupItems, setMenuGroupItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [menuGroupName, setMenuGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const loadMenuGroup = () => {
    getMenuGroup(params.id)
      .then((response) => {
        setMenuGroup(response);
        setMenuGroupName(response.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadMenuGroupItems = () => {
    getItemsForMenuGroup(params.id)
      .then((response) => {
        setMenuGroupItems(response);
        loadProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadProducts = () => {
    getProducts()
      .then(products => {
        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeName = (name) => {
    if (name) {
      putMenuGroup(params.id, name).then(() => {
        loadMenuGroup();
      });
    }
  };

  const searchAssignments = (searchTerm, products) => {
    products.forEach(product => {
      product.setHidden((!searchTerm || product.name.includes(searchTerm)) && !menuGroupItem);
    });
    products = products.filter(product => !menuGroupItems.find(item => item.productId === product.id))
    return products;
  };

  const addMenuGroupItem = (product) => {
    createItemForMenuGroup(menuGroup.id, product.name, product.id).then(() => {
      loadMenuGroupItems();
    });
  };

  const deleteMenuGroupItem = (event, id) => {
    event.stopPropagation();
    deleteItemForMenuGroup(menuGroup.id, id).then(() => {
      loadMenuGroupItems();
    });
  };

  const pickColor = (id) => {

  }

  useEffect(() => {
    loadMenuGroup();
    loadMenuGroupItems();
  }, []);

  return (
    <div>
      {!menuGroup ? (
        <Loader />
      ) : (
        <div>
          <Title>Menü-Gruppe: {menuGroup.name}</Title>
          <div className="mb-4 md:flex">
            <Input
              type="text"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={menuGroupName}
              onChange={(value) => {
                setMenuGroupName(value.currentTarget.value);
              }}
            />
            <Button
              onClick={() => changeName(menuGroupName)}
              className="drop-shadow"
            >
              <SVG src="/change.svg" className="mr-2" />
              Ändern
            </Button>
          </div>
          <ItemTable
            className="mb-4"
            columns={["id", "name"]}
            columnNames={["#", "Menü-Gruppen-Position"]}
            columnClasses={["text-center", "text-left"]}
            columnWidths={["40px", "200px"]}
            items={menuGroupItems}
            pickColor={pickColor}
            deleteItem={deleteMenuGroupItem}
            hiddenAttribute={true}
          />
          <Input
            type="text"
            placeholder="Suchen"
            className="block md:flex-1 mb-4 w-full"
            value={searchTerm}
            onChange={(value) => {
              setSearchTerm(value.currentTarget.value);
              setProducts(searchAssignments(value.currentTarget.value, products));
            }}
          />
          <ItemTable
            columns={["id", "name"]}
            columnNames={["#", "Produkt"]}
            columnClasses={["text-center", "text-left"]}
            columnWidths={["40px", "200px"]}
            items={products}
            addItem={addMenuGroupItem}
            hiddenAttribute={true}
          />
        </div>
      )}
      <Button
        onClick={() => router.push("/admin/menuGroups")}
        className="fixed left-4 bottom-4 drop-shadow z-20"
      >
        <SVG src="/back.svg" className="mr-2" />
        Zurück
      </Button>
    </div>
  );
}
