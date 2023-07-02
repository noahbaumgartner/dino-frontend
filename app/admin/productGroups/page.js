import Button from "@/components/button";
import SVG from "@/components/svg";
import Title from "@/components/title";

export default function ProductGroups() {
  return (
    <div>
      <Title>Produkt-Gruppen</Title>
      <table className="table-auto w-full border-none drop-shadow rounded-lg">
        <thead className="bg-gray-100 border-b-2 border-gray-200 text-left">
          <tr>
            <th className="p-3 rounded-tl-lg">Produkt-Gruppe</th>
            <th className="p-3 rounded-tr-lg text-right">Aktionen</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="px-3 pt-3">Speisen</td>
            <td className="px-3 pt-3">
              <Button className="float-right ml-2">
                <SVG src="/biggerThan.svg" className="mr-2" />
                Zur Gruppe
              </Button>
              <Button className="float-right ml-2">
                <SVG src="/delete.svg" className="mr-2" />
                Löschen
              </Button>
            </td>
          </tr>
          <tr>
            <td className="p-3 rounded-bl-lg">Alkoholische Getränke</td>
            <td className="p-3 rounded-br-lg">
              <Button className="float-right ml-2">
                <SVG src="/biggerThan.svg" className="mr-2" />
                Zur Gruppe
              </Button>
              <Button className="float-right ml-2">
                <SVG src="/delete.svg" className="mr-2" />
                Löschen
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
