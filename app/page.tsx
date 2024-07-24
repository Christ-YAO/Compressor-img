"use client";

import { useState } from "react";

export default function Home() {
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [compressedImageSrc, setCompressedImageSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [imageFormat, setImageFormat] = useState<string>("jpeg");
  const [compressionType, setCompressionType] = useState<string>("lossy");

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      BODY
    </main>
  );
}
