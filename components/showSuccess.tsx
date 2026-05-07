import { toast } from "sonner";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const showSuccessToast = ({
  successMessage,
  successDetail,
}: {
  successMessage?: string;
  successDetail?: string;
}) => {
  toast.custom((id) => (
    <div
      className="flex w-full items-center justify-between rounded-lg border border-green-500/50 dark:bg-card px-4 py-2 shadow-lg bg-input"
      role="alert"
    >
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />

        {/* Text Content */}
        <div className="text-sm">
          {successMessage && (
            <h3 className="font-semibold">{successMessage}</h3>
          )}
          {successDetail && (
            <div className="text-muted-foreground">{successDetail}</div>
          )}
        </div>
      </div>

      {/* Close Button */}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => toast.dismiss(id)}
        className="shrink-0 rounded-md p-1"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  ));
};
