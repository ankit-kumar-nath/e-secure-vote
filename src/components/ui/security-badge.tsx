import { Shield, Lock, Fingerprint, Eye, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type SecurityType = "blockchain" | "encrypted" | "biometric" | "verified" | "secure";

interface SecurityBadgeProps {
  type: SecurityType;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const securityConfig = {
  blockchain: {
    icon: Shield,
    label: "Blockchain Secured",
    color: "text-success bg-success/10",
  },
  encrypted: {
    icon: Lock,
    label: "End-to-End Encrypted",
    color: "text-info bg-info/10",
  },
  biometric: {
    icon: Fingerprint,
    label: "Biometric Verified",
    color: "text-primary bg-primary/10",
  },
  verified: {
    icon: CheckCircle,
    label: "Verified",
    color: "text-success bg-success/10",
  },
  secure: {
    icon: Eye,
    label: "Privacy Protected",
    color: "text-warning bg-warning/10",
  },
};

const sizeConfig = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

const iconSizeConfig = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export const SecurityBadge = ({ type, className, size = "md" }: SecurityBadgeProps) => {
  const config = securityConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        config.color,
        sizeConfig[size],
        className
      )}
    >
      <Icon className={iconSizeConfig[size]} />
      <span>{config.label}</span>
    </div>
  );
};
