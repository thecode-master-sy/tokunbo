import { toast } from "sonner";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const showItemAddedToCart = (message: string) => {
  toast.custom((id) => (
    <div
      className="flex w-full gap-2 items-center justify-between rounded-lg border border-hero/50 dark:bg-card px-4 py-2 shadow-lg bg-white"
      role="alert"
    >
      <div className="flex items-center gap-3">
        {/* Text Content */}
        <div className="text-sm">
          <h3 className="font-semibold">{message}</h3>
        </div>
      </div>

      {/* Close Button */}

      <Button
        size="sm"
        onClick={() => toast.dismiss(id)}
        className="shrink-0 rounded-md px-2 py-1 bg-banner text-foreground cursor-pointer"
      >
        <Link href="/cart" className="block w-full h-full">
          <span>View cart</span>
        </Link>
      </Button>
    </div>
  ));
};
