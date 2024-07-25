import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImageUp } from "lucide-react";
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
    <Card className="max-w-[1000px] mx-auto w-full mt-6 p-5 text-sm md:text-base font-extralight">
      <div className="p-3 w-full">
        <p className="">
          File name : <b>{imageName}</b> <br />
          File format : <b>{imageFormat.toUpperCase()}</b> <br />
          Original size : <b>{(originalSize / 1024).toPrecision(3)} Ko</b>
        </p>
      </div>
      <div className="flex flex-col justify-between items-start md:flex-row md:items-center mb-4 gap-4">
        <div className="">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="compressionType"
                id="lossy"
                value="lossy"
                checked={compressionType === "lossy"}
                onChange={() => setCompressionType("lossy")}
                className="peer/draft"
              />
              <label
                htmlFor="lossy"
                className="cursor-pointer peer-checked/draft:text-sky-500"
              >
                Lossy
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="compressionType"
                id="lossless"
                value="lossless"
                checked={compressionType === "lossless"}
                onChange={() => setCompressionType("lossless")}
                className="peer/published"
              />
              <label
                htmlFor="lossless"
                className="cursor-pointer peer-checked/published:text-sky-500"
              >
                Lossless
              </label>
            </div>
          </div>
          {compressionType === "lossy" ? (
            <div className="text-sm text-muted-foreground">Plus efficace en termes de réduction de taille (Perte de qualité, Irréversible).</div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Moins efficace en termes de réduction de taille (Pas de perte de qualité, Réversible)
            </div>
          )}
        </div>
        <div className="flex space-x-4 w-full md:w-min">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white w-full md:w-min font-light active:scale-95 flex items-center gap-2 md:gap-1"
            onClick={handleCompress}
          >
            Compress <ImageUp size={16} strokeWidth={"1.5"} className="mt-[2px]" />
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
