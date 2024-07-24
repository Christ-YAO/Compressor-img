"use client";

import { useEffect, useState } from "react";
import ImageUpload from "./_components/ImageUpload";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import Loader from "@/components/ui/loader";

export default function Home() {
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [compressedImageSrc, setCompressedImageSrc] = useState<string | null>(
    null
  );
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [imageFormat, setImageFormat] = useState<string>("jpeg");
  const [compressionType, setCompressionType] = useState<string>("lossy");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setLoading(true);
    const img = new Image();
    img.onload = () => {
      setOriginalImageSrc(img.src);
      setCompressedImageSrc(null);
      setOriginalSize(file.size);
      setImageName(file.name);
      setLoading(false);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-36 px-4 sm:px-10 md:px-24 overflow-hidden relative">
      <h2 className="text-2xl md:text-4xl lg:text-8xl uppercase font-black text-center">
        <span className="text-red-500">Rapid</span>Img
      </h2>
      <Button className="absolute top-16 right-8 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-full text-white transition-all p-[6px]">
        <RotateCcw strokeWidth={"1.4px"} />{" "}
      </Button>
      <p className="text-sm text-center font-light text-muted-foreground">
        Compresser vos images (JPEG, PNG, WEBP, SVG)
      </p>
      {loading && <Loader />}
      {!loading && compressedSize === null && (
        <>
          {originalImageSrc === null && (
            <ImageUpload onChange={handleFileChange} />
          )}
        </>
      )}
    </main>
  );
}
