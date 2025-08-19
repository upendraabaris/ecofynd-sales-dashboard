import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  count?: number;
  unit?: String;
  comparison_percent?: number;
  status?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  description,
  count,
  unit,
  comparison_percent,
  status,
  trend = "neutral",
  className
}: StatsCardProps) => {
  return (
    <Card className={cn("bg-gradient-card border-border", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn(
          "h-4 w-4",
          trend === "up" && "text-profit",
          trend === "down" && "text-loss",
          trend === "neutral" && "text-muted-foreground"
        )} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {count && (
          <p className="text-xs text-muted-foreground mt-1 font-bold">
            {unit}: {count}
          </p>
        )}
        {comparison_percent && (
          <p
            className={`text-xs mt-1 ${status === 'increase'
                ? 'text-green-600'
                : status === 'decrease'
                  ? 'text-red-600'
                  : 'text-gray-500'
              }`}
          >
            {comparison_percent}{' '}
            {status === 'increase'
              ? '% increase'
              : status === 'decrease'
                ? '% decrease'
                : '(no change)'}
          </p>
        )}

      </CardContent>
    </Card>
  );
};

export default StatsCard;