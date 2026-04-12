import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  return (
    <div className="relative bg-hero">
      <div className="bg-hero px-4 pt-20 pb-15 space-y-4">
        <h1 className="text-h2 text-center -tracking-[0.05em] font-light">
          <span>Your</span>{" "}
          <span className="font-tenor-sans font-semibold opacity-100">
            Quality
          </span>{" "}
          <span>Fairly Used Products.</span>
        </h1>

        <div className="max-w-[450px] mx-auto">
          <Input
            placeholder="what are you looking for?"
            className="bg-white rounded-full h-11 px-4"
          />
        </div>
      </div>
    </div>
  );
}
