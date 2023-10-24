"use client";
import { exportDatabase, importDatabase } from "@/api/services/databaseService";
import Button from "@/components/admin/button";
import SVG from "@/components/svg";
import Title from "@/components/admin/title";
import { useRef } from "react";

export default function Database() {
  const fileInputRef = useRef(false);
  const handleImportTriggered = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
    importDatabase(file);
  };
  return (
    <div>
      <Title>Datenbank</Title>
      <Button onClick={() => exportDatabase()} className="drop-shadow">
        <SVG src="/download.svg" className="mr-2" />
        DB exportieren
      </Button>
      <Button
        onClick={() => handleImportTriggered()}
        className="ml-4 drop-shadow"
      >
        <SVG src="/upload.svg" className="mr-2" />
        DB importieren
      </Button>

      <input
        type="file"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
    </div>
  );
}
