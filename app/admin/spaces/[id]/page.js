"use client";
import Button from "@/components/button";
import Loader from "@/components/loader";
import Title from "@/components/title";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SVG from "@/components/svg";
import Input from "@/components/input";
import {
  getSpace,
  patchSpaceName,
  patchSpacePlan,
} from "@/api/services/SpaceService";
import PlanTable from "@/components/plantable";

export default function SingleSpace({ params }) {
  const [space, setSpace] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const [spacePlan, setSpacePlan] = useState([]);
  const [selector, setSelector] = useState(0);
  const [selectorIndex, setSelectorIndex] = useState(-1);

  const router = useRouter();
  const Selector = {
    Column: 0,
    Row: 1,
  };

  const loadSpace = () => {
    getSpace(params.id)
      .then((response) => {
        setSpace(response);
        setSpaceName(response.name);
        console.log(response.plan);

        if (response.plan) setSpacePlan(response.getPlanAsArray());
        else setSpacePlan([[""]]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changeSpaceName = (name) => {
    if (name) {
      patchSpaceName(params.id, name).then(() => {
        loadSpace();
      });
    }
  };
  const changeSpacePlan = (plan) => {
    if (plan) {
      patchSpacePlan(params.id, JSON.stringify(plan)).then(() => {
        loadSpace();
      });
    }
  };
  const addColumn = () => {
    for (let i = 0; i < spacePlan.length; i++) {
      spacePlan[i].push("");
    }
    changeSpacePlan(spacePlan);
  };
  const addRow = () => {
    const emptyRow = Array(spacePlan[0].length).fill("");
    spacePlan.push(emptyRow);
    changeSpacePlan(spacePlan);
  };
  const setFieldValue = (event, columnIndex, rowIndex) => {
    spacePlan[rowIndex][columnIndex] = event.target.value;
    changeSpacePlan(spacePlan);
  };
  const selectColumn = (index) => {
    setSelector(Selector.Column);
    setSelectorIndex(index);
  };
  const selectRow = (index) => {
    setSelector(Selector.Row);
    setSelectorIndex(index);
  };
  const deleteSelected = () => {
    if (selectorIndex != -1) {
      if (selector == Selector.Row) spacePlan.splice(selectorIndex, 1);
      if (selector == Selector.Column) {
        for (let i = 0; i < spacePlan.length; i++) {
          spacePlan[i].splice(selectorIndex, 1);
        }
      }

      setSelectorIndex(-1);
      changeSpacePlan(spacePlan);
    }
  };
  const setDividerForSelected = () => {
    if (selectorIndex != -1) {
      if (selector == Selector.Row) {
        for (let i = 0; i < spacePlan[0].length; i++) {
          spacePlan[selectorIndex][i] = "X";
        }
      }
      if (selector == Selector.Column) {
        for (let i = 0; i < spacePlan.length; i++) {
          spacePlan[i][selectorIndex] = "X";
        }
      }

      setSelectorIndex(-1);
      changeSpacePlan(spacePlan);
    }
  };

  useEffect(() => {
    loadSpace();
  }, []);

  return (
    <div>
      {!space ? (
        <Loader />
      ) : (
        <div>
          <Title>Bereich: {space.name}</Title>
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
              onClick={() => changeSpaceName(spaceName)}
              className="drop-shadow"
            >
              <SVG src="/change.svg" className="mr-2" />
              Ändern
            </Button>
          </div>
          <PlanTable
            state={spacePlan}
            plan={spacePlan}
            addColumn={addColumn}
            addRow={addRow}
            setFieldValue={setFieldValue}
            selectColumn={selectColumn}
            selectRow={selectRow}
            selector={selector}
            selectorIndex={selectorIndex}
            deleteSelected={deleteSelected}
            setDividerForSelected={setDividerForSelected}
          />
        </div>
      )}
      <Button
        onClick={() => router.push("/admin/spaces")}
        className="fixed left-4 bottom-4 drop-shadow z-20"
      >
        <SVG src="/back.svg" className="mr-2" />
        Zurück
      </Button>
    </div>
  );
}
