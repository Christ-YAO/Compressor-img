import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

export default function ImageUpload() {
  return (
    <Card className="max-w-[1000px] mx-auto w-full mt-8 border border-dashed border-black p-6 rounded-lg text-center cursor-pointer hover:bg-accent/70 transition-all">
      <Upload size="sm" strokeWidth="1.25" color="black" className="mx-auto h-12 w-12" />
      <p className="mt-4 text-xs font-light">Sélectionner un fichier</p>
      <Input type="file" accept="image/*" className="hidden file-inp" />
    </Card>
  );
}
