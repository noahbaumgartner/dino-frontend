import Paragraph from "@/components/Paragraph";
import Title from "@/components/title";

export default function About() {
  return (
    <div>
      <Title>Willkommen 🍴</Title>
      <Paragraph>
        Hier hast du die volle Kontrolle über unser Bestellsystem für Speisen
        und Getränke. Als Administrator kannst du verschiedene Funktionen
        nutzen, um das System zu verwalten und den reibungslosen Ablauf der
        Bestellungen zu gewährleisten.
      </Paragraph>
      <Paragraph>
        Um dich im Admin-Bereich zurechtzufinden, findest du die Navigation oben
        links. Dort stehen dir alle wichtigen Optionen zur Verfügung. Mit nur
        wenigen Klicks kannst du neue Gerichte und Getränke hinzufügen, Preise
        aktualisieren, Bestellungen verwalten und vieles mehr.
      </Paragraph>
    </div>
  );
}
