import Link from "next/link";
import { Github, Image, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Nav() {
  return (
    <header className="fixed z-20 top-0 w-full backdrop-blur-xl">
      <nav className="max-w-[1000px] mx-auto border-b border-accent h-[50px] flex items-center justify-between p-5">
        <Link href={"/"} className="group transition-all">
          <Images color="red" className="group-hover:hidden"/>
          <Image className="hidden group-hover:block dark:text-accent text-slate-300"/>
        </Link>
        <div className="space-x-2">
          <Link target="_blank" href="https://github.com/nextui-org/nextui">
            <Button variant="ghost" size="icon">
              <Github size={20} />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
