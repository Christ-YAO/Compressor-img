"use client";

import { useEffect, useState } from "react";
import ImageUpload from "./_components/ImageUpload";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import Loader from "@/components/ui/loader";
import ImageInfo from "./_components/ImageInfo";
import CompressedImage from "./_components/CompressedImage";

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

  const handleCompress = () => {
    if (!originalImageSrc) {
      return;
    }
    setLoading(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const MAX_WIDTH = 1920;
      const MAX_HEIGHT = 1080;
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = width / height;
        if (width > MAX_WIDTH) {
          width = MAX_WIDTH;
          height = width / ratio;
        }
        if (height > MAX_HEIGHT) {
          height = MAX_HEIGHT;
          width = height * ratio;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      let mimeType = "";
      let quality = 0.8;

      if (imageFormat === "jpeg") {
        mimeType = "image/jpeg";
      } else if (imageFormat === "png") {
        mimeType = "image/png";
      } else if (imageFormat === "webp") {
        mimeType = "image/webp";
      } else if (imageFormat === "avif") {
        mimeType = "image/avif";
      } else if (imageFormat === "gif") {
        mimeType = "image/gif";
      } else {
        mimeType = "image/jpg";
      }

      const compressedImage = (quality: number) => {
        if (compressionType === "lossless") {
          return canvas.toDataURL(mimeType);
        } else {
          return canvas.toDataURL(mimeType, quality);
        }
      };

      let compressedDataUrl = compressedImage(quality);
      let compressedBlob = dataURLtoBlob(compressedDataUrl);
      let compressedBlobSise = compressedBlob.size;

      while (compressedBlobSise >= originalSize && quality > 0.1) {
        quality -= 0.1;
        compressedDataUrl = compressedImage(quality);
        compressedBlob = dataURLtoBlob(compressedDataUrl);
        compressedBlobSise = compressedBlob.size;
      }

      setCompressedImageSrc(compressedDataUrl);
      setCompressedSize(compressedBlobSise);
      setLoading(false);
    };

    img.src = originalImageSrc;
  };

  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(",");
    const mine = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mine });
  };

  const handleReset = () => {
    setOriginalImageSrc(null);
    setCompressedImageSrc(null);
    setOriginalSize(0);
    setCompressedSize(null);
    setImageName("");
    setImageFormat("jpeg");
    setCompressionType("lossy");
  };

  const handleDownload = () => {
    if (!compressedImageSrc) {
      return;
    }
    const a = document.createElement("a");
    a.href = compressedImageSrc;
    a.download = `${imageName}_compressed.${imageFormat}`;
    a.click();
  };

  return (
    <main className="flex min-h-screen flex-col items-center pt-36 pb-20 px-4 sm:px-10 md:px-24 overflow-hidden relative font-sans">
      <h2 className="text-2xl md:text-4xl lg:text-8xl uppercase font-black text-center">
        <span className="text-red-500">Rapid</span>Img
      </h2>
      <Button
        className="absolute top-16 right-8 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-full text-white transition-all p-[6px] active:scale-95"
        onClick={handleReset}
      >
        <RotateCcw strokeWidth={"1.4px"} />{" "}
      </Button>
      <p className="text-sm text-center font-light text-muted-foreground">
        Compress your images (JPG, JPEG, PNG, WEBP, SVG)
      </p>
      {loading && <Loader />}
      {!loading && compressedSize === null && (
        <>
          {originalImageSrc === null && (
            <ImageUpload onChange={handleFileChange} />
          )}
          {(originalImageSrc !== null || compressedImageSrc !== null) && (
            <ImageInfo
              imageName={imageName}
              imageFormat={imageFormat}
              originalSize={originalSize}
              originalImageSrc={originalImageSrc as string}
              compressionType={compressionType}
              setCompressionType={setCompressionType}
              handleCompress={handleCompress}
            />
          )}
        </>
      )}

      {!loading && compressedSize !== null && (
        <CompressedImage
          imageName={imageName}
          imageFormat={imageFormat}
          originalSize={originalSize}
          compressedSize={compressedSize}
          originalImageSrc={originalImageSrc as string}
          compressedImageSrc={compressedImageSrc as string}
          handleDownload={handleDownload}
        />
      )}
    </main>
  );
}
