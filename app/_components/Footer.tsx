import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" flex items-center justify-center gap-2 flex-col w-full p-5 border-t border-accent">
      <p className="text-sm text-center font-extralight">
        &copy;{" "}
        <Link
          href={"/"}
          className="text-accent-foreground hover:underline font-semibold transition-all"
        >
          Vercel
        </Link>{" "}
        | All rights reserved ~ 2024
      </p>
    </footer>
  );
}
