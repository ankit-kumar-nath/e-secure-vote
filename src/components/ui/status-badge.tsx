import { cn } from "@/lib/utils";
import { CheckCircle, Clock, XCircle, AlertCircle, Loader2 } from "lucide-react";

type StatusType = "success" | "pending" | "error" | "warning" | "processing";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

const statusConfig = {
  success: {
    icon: CheckCircle,
    defaultLabel: "Approved",
    className: "status-success",
  },
  pending: {
    icon: Clock,
    defaultLabel: "Pending",
    className: "status-warning",
  },
  error: {
    icon: XCircle,
    defaultLabel: "Rejected",
    className: "status-error",
  },
  warning: {
    icon: AlertCircle,
    defaultLabel: "Action Required",
    className: "status-warning",
  },
  processing: {
    icon: Loader2,
    defaultLabel: "Processing",
    className: "status-info",
  },
};

export const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn("status-badge", config.className, className)}>
      <Icon className={cn("h-3.5 w-3.5 mr-1.5", status === "processing" && "animate-spin")} />
      <span>{label || config.defaultLabel}</span>
    </div>
  );
};
