import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white flex items-center justify-center gap-2 flex-col w-full p-5 border-t border-accent">
      <p className="text-sm text-center font-light">
        &copy;{" "}
        <Link
          href={"/"}
          className="text-black hover:underline font-semibold transition-all"
        >
          Vercel
        </Link>{" "}
        - Tous droits réservés - 2024
      </p>
    </footer>
  );
}
