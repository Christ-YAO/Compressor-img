import { cn } from "@/lib/utils";
import { Loader2, LucideProps } from "lucide-react";

export default function Loader() {
  return (
    <div className="absolute w-full h-screen top-0 left-0 bg-white bg-opacity-50 flex items-center justify-center">
        <div className="loader ease-linear rounded-full border-t-4 border-b-4 border-red-500 h-16 w-16 animate-spin "></div>
    </div>
  );
}
