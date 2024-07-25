import { Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type SliderProps = {
  originalImage: string | null;
  compressedImage: string | null;
};

export default function Slider({
  originalImage,
  compressedImage,
}: SliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <div className="w-full relative mt-6 font-light" onMouseUp={handleMouseUp}>
      <p className="flex justify-between items-center mb-2">
        <span className="text-sm rounded-md py-1 px-2 bg-orange-500 text-white">
          Before
        </span>
        <span className="w-full h-[1px] bg-accent"></span>
        <span className="text-sm rounded-md py-1 px-2 bg-green-500 text-white">
          After
        </span>
      </p>
      <div
        className="relative w-full aspect-[70/45] m-auto overflow-hidden select-none border border-accent rounded-md mt-4"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
      >
        {originalImage && (
          <Image
            src={originalImage}
            alt="Original image"
            draggable={false}
            priority
            fill
          />
        )}
        {compressedImage && (
          <div
            className="absolute w-full top-0 left-0 maspect-[70/45] m-auto overflow-hidden select-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0})` }}
          >
            <Image
              src={compressedImage}
              alt="Compressed image"
              draggable={false}
              priority
              fill
            />
          </div>
        )}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-gray-700 cursor-pointer shadow-md flex items-center"
          style={{ left: `calc(${sliderPosition}% - 1px)` }}
        >
          <div className="bg-gray-700 text-white absolute flex items-center justify-center rounded-full h-8 w-8 -left-4 top-[calc(50% - 5px)] cursor-pointer active:bg-red-500 shadow-md">
            <Eye size={16} strokeWidth={"1.5px"} />
          </div>
        </div>
      </div>
    </div>
  );
}
