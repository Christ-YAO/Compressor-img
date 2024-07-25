import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import Slider from "./Slider";

interface CompressedImageProps {
  imageName: string;
  imageFormat: string;
  originalSize: number;
  compressedSize: number;
  originalImageSrc: string;
  compressedImageSrc: string;
  handleDownload: () => void;
}

export default function CompressedImage({
  imageName,
  imageFormat,
  originalSize,
  compressedSize,
  originalImageSrc,
  compressedImageSrc,
  handleDownload,
}: CompressedImageProps) {
  return (
    <Card className="max-w-[1000px] mx-auto w-full mt-6 p-5 text-sm md:text-base font-extralight">
      <div className="p-3 w-full">
        <p className="my-6">
          File name : <b>{imageName}</b> <br />
          File format : <b>{imageFormat.toUpperCase()}</b> <br />
          Original size : <b>{(originalSize / 1024).toPrecision(3)} Ko</b>{" "}
          <br />
          Size after compression :{" "}
          <b>{(compressedSize / 1024).toPrecision(3)} Ko</b>
        </p>
        <Button
          className="bg-red-500 hover:bg-red-600 text-white font-light active:scale-95"
          onClick={handleDownload}
        >
          Download image{" "}
          <Download size={16} strokeWidth={"1.5px"} className="ml-2" />
        </Button>
      </div>
      <Slider
        originalImage={originalImageSrc}
        compressedImage={compressedImageSrc}
      />
    </Card>
  );
}
