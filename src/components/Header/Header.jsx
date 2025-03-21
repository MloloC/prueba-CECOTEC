import Image from "next/image";
import LogoCecotec from "@/images/LogoCecotec.png";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="container mx-auto flex justify-between items-center p-4">
      <Image src={LogoCecotec} alt="logo" width={100} height={100} />
      <Button variant="outline">Iniciar sesión</Button>
    </header>
  );
};

export default Header;
