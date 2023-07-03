import Image from "next/image";

export default function SVG({ className, src }) {
  return (
    <Image className={className} src={src} width={20} height={20} alt="svg" />
  );
}
