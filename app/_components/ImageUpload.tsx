import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUpload({ onChange }: ImageUploadProps) {
  return (
    <Card className="max-w-[1000px] mx-auto w-full mt-8 border border-dashed border-black p-6 rounded-lg text-center cursor-pointer hover:bg-accent/70 transition-all" onClick={() => document.querySelector<HTMLInputElement>('.file-inp')?.click()}>
      <Upload
        size="sm"
        strokeWidth="1.25"
        color="black"
        className="mx-auto h-12 w-12"
      />
      <p className="mt-4 text-xs font-light">Sélectionner un fichier</p>
      <Input type="file" accept="image/*" className="hidden file-inp" onChange={onChange} />
    </Card>
  );
}
