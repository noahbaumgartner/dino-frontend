import Button from "@/components/button";
import SVG from "@/components/svg";
import Table from "@/components/table";
import TableBody from "@/components/tablebody";
import TableBodyField from "@/components/tablebodyfield";
import TableHead from "@/components/tablehead";
import TableHeadField from "@/components/tableheadfield";
import TableRow from "@/components/tablerow";
import Title from "@/components/title";

function ProductGroupTable() {
  return (
    <Table>
      <TableHead>
        <TableHeadField className="text-left" minWidth="200px">
          Produkt-Gruppe
        </TableHeadField>
        <TableHeadField className="text-right" minWidth="350px">
          Aktionen
        </TableHeadField>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableBodyField>Speisen</TableBodyField>
          <TableBodyField>
            <Button className="float-right ml-2" border={false}>
              <SVG src="/biggerThan.svg" className="mr-2" />
              Zur Gruppe
            </Button>
            <Button className="float-right ml-2" border={false}>
              <SVG src="/delete.svg" className="mr-2" />
              Löschen
            </Button>
          </TableBodyField>
        </TableRow>
        <TableRow>
          <TableBodyField>Alkoholische Getränke</TableBodyField>
          <TableBodyField>
            <Button className="float-right ml-2" border={false}>
              <SVG src="/biggerThan.svg" className="mr-2" />
              Zur Gruppe
            </Button>
            <Button className="float-right ml-2" border={false}>
              <SVG src="/delete.svg" className="mr-2" />
              Löschen
            </Button>
          </TableBodyField>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default function ProductGroups() {
  return (
    <div>
      <Title>Produkt-Gruppen</Title>
      <ProductGroupTable />
      <Button className="mt-4 drop-shadow">
        <SVG src="/add.svg" className="mr-2" />
        Gruppe hinzufügen
      </Button>
    </div>
  );
}
