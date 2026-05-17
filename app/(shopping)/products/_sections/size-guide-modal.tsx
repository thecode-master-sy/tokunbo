import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function SizeGuideModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="link"
          className="ml-auto h-auto cursor-pointer p-0 text-hero underline underline-offset-4 hover:text-hero/80"
        >
          Size guide
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[92vw] rounded-md border-none bg-white p-0 shadow-xl sm:max-w-2xl">
        <div className="overflow-hidden rounded-2xl">
          <DialogHeader className="border-b px-5 py-4">
            <DialogTitle className="text-h4">
              How to measure your pot lid
            </DialogTitle>
          </DialogHeader>

          <div className="bg-white p-4">
            <div className="overflow-hidden rounded-xl bg-black">
              <video
                src="/videos/size-guide.mp4"
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full object-contain"
              />
            </div>

            <div className="mt-4 rounded-xl bg-category p-4 text-sm leading-relaxed text-gray-700">
              <p className="font-medium text-black">Measurement instruction</p>
              <p className="mt-1">
                Place the pot cover upside down, then measure across the widest
                part of the lid from one edge to the other.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
