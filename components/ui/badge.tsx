import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-blue-500/15 text-blue-300 border border-blue-500/20",
        secondary: "bg-white/5 text-white/60 border border-white/10",
        success: "bg-green-500/15 text-green-300 border border-green-500/20",
        warning: "bg-orange-500/15 text-orange-300 border border-orange-500/20",
        danger: "bg-red-500/15 text-red-300 border border-red-500/20",
        gold: "bg-yellow-500/15 text-yellow-300 border border-yellow-500/20",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
