"use client";
import { getProductGroup } from "@/api/services/productGroupService";
import Button from "@/components/button";
import Loader from "@/components/loader";
import Title from "@/components/title";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SVG from "@/components/svg";

export default function SingleProductGroup({ params }) {
  const [productGroup, setProductGroup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getProductGroup(params.id)
      .then((response) => {
        setProductGroup(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {!productGroup ? (
        <Loader />
      ) : (
        <div>
          <Title>Produkt-Gruppe: {productGroup.name}</Title>
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
