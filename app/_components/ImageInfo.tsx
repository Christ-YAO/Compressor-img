import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ImageComponent from "next/image";

interface ImageInfoProps {
  imageName: string;
  imageFormat: string;
  originalSize: number;
  originalImageSrc: string | null;
  compressionType: string;
  setCompressionType: (type: string) => void;
  handleCompress: () => void;
}

export default function ImageInfo({
  imageName,
  imageFormat,
  originalSize,
  originalImageSrc,
  compressionType,
  setCompressionType,
  handleCompress,
}: ImageInfoProps) {
  return (
    <Card className="max-w-[1000px] mx-auto w-full mt-6 p-5 text-sm md:text-base">
      <div className="p-3 w-full">
        <p className="">
          Nom du fichier : <b>{imageName}</b> <br />
          Format du fichier : <b>{imageFormat.toUpperCase()}</b> <br />
          Taille originale : <b>{(originalSize / 1024).toPrecision(3)} Ko</b>
        </p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Input
              type="radio"
              name="compressionType"
              id="lossy"
              value="lossy"
              checked={compressionType === "lossy"}
              onChange={() => setCompressionType("lossy")}
            />
            <label htmlFor="lossy">Lossy</label>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="radio"
              name="compressionType"
              id="lossless"
              value="lossless"
              checked={compressionType === "lossless"}
              onChange={() => setCompressionType("lossless")}
            />
            <label htmlFor="lossless">Lossless</label>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white font-light"
            onClick={handleCompress}
          >
            Compresser
          </Button>
        </div>
      </div>

      <ImageComponent
        src={originalImageSrc || ""}
        alt="Original Image"
        width={600}
        height={600}
        className="w-full block rounded border border-accent"
      />
    </Card>
  );
}
