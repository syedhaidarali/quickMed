/** @format */

import * as React from "react";
import { cn } from "../../lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot='skeleton'
      className={cn(
        // visible fallback colors ensure skeleton always shows
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800",
        // if shadcn theme tokens exist, these will override gracefully
        "bg-muted/60 dark:bg-muted/30",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
