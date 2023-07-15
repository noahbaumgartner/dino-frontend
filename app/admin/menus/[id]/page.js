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
import {
  createMenuGroupaAssignment,
  deleteMenuGroupAssignment,
  getMenu,
  getMenuGroupAssignments,
  getMenus,
} from "@/api/services/menuService";
import { getMenuGroups, putMenuGroup } from "@/api/services/menuGroupService";

export default function SingleProductGroup({ params }) {
  const [menu, setMenu] = useState(false);
  const [menuGroups, setMenuGroups] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const loadMenu = () => {
    getMenu(params.id)
      .then((response) => {
        setMenu(response);
        setMenuName(response.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadMenuGroupAssignments = () => {
    getMenuGroups().then((menuGroups) => {
      getMenuGroupAssignments(params.id).then((assignments) => {
        menuGroups.forEach((menuGroup) => {
          if (assignments.includes(menuGroup.id)) menuGroup.setAssigned(true);
        });
        setMenuGroups(searchAssignments(searchTerm, menuGroups));
      });
    });
  };
  const changeName = (name) => {
    if (name) {
      putMenuGroup(params.id, name).then(() => {
        loadMenu();
      });
    }
  };
  const assignItem = (id) => {
    createMenuGroupaAssignment(params.id, id).then(() => {
      loadMenuGroupAssignments();
    });
  };
  const unassignItem = (id) => {
    deleteMenuGroupAssignment(params.id, id).then(() => {
      loadMenuGroupAssignments();
    });
  };
  const searchAssignments = (searchTerm, menuGroups) => {
    menuGroups.forEach((menuGroup) => {
      if (!searchTerm || menuGroup.name.includes(searchTerm))
        menuGroup.setHidden(false);
      else menuGroup.setHidden(true);
    });
    return menuGroups;
  };

  useEffect(() => {
    loadMenu();
    loadMenuGroupAssignments();
  }, []);

  return (
    <div>
      {!menu ? (
        <Loader />
      ) : (
        <div>
          <Title>Menu: {menu.name}</Title>
          <div className="mb-4 md:flex">
            <Input
              type="text"
              className="block md:flex-1 mr-4 mb-4 md:mb-0 w-full"
              value={menuName}
              onChange={(value) => {
                setMenuName(value.currentTarget.value);
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
              setMenuGroups(
                searchAssignments(value.currentTarget.value, menuGroups)
              );
            }}
          />
          <ItemTable
            columns={["id", "name"]}
            columnNames={["#", "Produkt"]}
            columnClasses={["text-center", "text-left"]}
            columnWidths={["40px", "200px"]}
            items={menuGroups}
            assignItem={assignItem}
            unassignItem={unassignItem}
            hiddenAttribute={true}
          />
        </div>
      )}
      <Button
        onClick={() => router.push("/admin/menus")}
        className="fixed left-4 bottom-4 drop-shadow z-20"
      >
        <SVG src="/back.svg" className="mr-2" />
        Zurück
      </Button>
    </div>
  );
}
