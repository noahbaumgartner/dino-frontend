import Button from "@/components/button";
import SVG from "@/components/svg";
import Table from "@/components/table";
import TableBody from "@/components/tablebody";
import TableBodyField from "@/components/tablebodyfield";
import TableHead from "@/components/tablehead";
import TableHeadField from "@/components/tableheadfield";
import TableRow from "@/components/tablerow";
import Title from "@/components/title";

function ProductTable() {
  return (
    <Table>
      <TableHead>
        <TableHeadField className="text-center" minWidth="40px">
          #
        </TableHeadField>
        <TableHeadField className="text-left" minWidth="200px">
          Produkt
        </TableHeadField>
        <TableHeadField className="text-right" minWidth="350px">
          Preis
        </TableHeadField>
        <TableHeadField className="text-right" minWidth="400px">
          Aktionen
        </TableHeadField>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableBodyField className="text-center">1</TableBodyField>
          <TableBodyField>Bier</TableBodyField>
          <TableBodyField className="text-right">5.00 CHF</TableBodyField>
          <TableBodyField>
            <Button className="float-right ml-2" border={false}>
              <SVG src="/biggerThan.svg" className="mr-2" />
              Zum Produkt
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

export default function Products() {
  return (
    <div>
      <Title>Produkte</Title>
      <ProductTable />
      <Button className="mt-4 drop-shadow">
        <SVG src="/add.svg" className="mr-2" />
        Produkt hinzufügen
      </Button>
    </div>
  );
}
