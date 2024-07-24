import Link from "next/link";
import { Github, Images } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Nav() {
  return (
    <header className="fixed z-20 top-0 w-full backdrop-blur-xl">
      <nav className="max-w-[1000px] mx-auto border-b border-accent h-[50px] flex items-center justify-between p-5">
        <Link href={"/"}>
          <Images color="red" />
        </Link>
        <Link target="_blank" href="https://github.com/nextui-org/nextui">
          <Button variant="ghost">
            <Github size={20} />
          </Button>
        </Link>
      </nav>
    </header>
  );
}
