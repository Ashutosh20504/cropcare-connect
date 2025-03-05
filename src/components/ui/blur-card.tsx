
import { cn } from "@/lib/utils";
import React from "react";

interface BlurCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const BlurCard = React.forwardRef<HTMLDivElement, BlurCardProps>(
  ({ children, className, hoverEffect = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-2xl overflow-hidden blur-card",
          hoverEffect && "hover-lift",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BlurCard.displayName = "BlurCard";

export { BlurCard };
