import SVG from "@/components/svg";
import Title from "@/components/title";

export default function SystemStatus() {
  return (
    <div>
      <Title>Systemstatus</Title>
      <div className="text-left p-8 backdrop-blur-sm bg-white/30 border-2 border-gray-300 rounded-lg drop-shadow flex">
        <SVG src="/fire.svg" />
        <span className="flex-1 ml-8">
          Die Bestellperiode wurde am <b>03.07.23</b> um <b>11:00 Uhr</b>{" "}
          gestartet
        </span>
      </div>
      <div className="overflow-x-scroll">
        <table className="min-w-full whitespace-no-wrap">
          <thead>
            <tr>
              <th className="py-2 min-w-[200px]">Spalte 1</th>
              <th className="py-2 min-w-[200px]">Spalte 2</th>
              <th className="py-2 min-w-[200px]">Spalte 3</th>
              <th className="py-2">Spalte 4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 min-w-[200px]">Inhalt 1</td>
              <td className="py-2">Inhalt 2</td>
              <td className="py-2">Inhalt 3</td>
              <td className="py-2">Inhalt 4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
