import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

export function AchievementBadge({ achievement, className }: { achievement: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-500",
        className
      )}
    >
      <Award className="h-3.5 w-3.5" />
      {achievement}
    </span>
  );
}
