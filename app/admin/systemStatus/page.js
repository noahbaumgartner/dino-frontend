import Button from "@/components/button";
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
      <Button className="drop-shadow mt-4">
        <SVG className="mr-2" src="/stop.svg" />
        Bestellperiode stoppen
      </Button>
      <Button className="drop-shadow mt-4">
        <SVG className="mr-2" src="/start.svg" />
        Bestellperiode starten
      </Button>
    </div>
  );
}
