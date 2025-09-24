import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Gradient border button with customizable inside background (transparent or theme background).
 * It has a "default", "gradient" variant for gradient borders, 
 * and "gradientTransparent" variant for transparent inner background.
 */
const buttonVariantz = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Gradient with transparent inner
        gradient: cn(
          "border border-transparent",
          // Transparent inside (so the parent background will show)
          "[background:transparent_padding-box,linear-gradient(90deg,theme(colors.fuchsia.500),theme(colors.cyan.400),theme(colors.emerald.400))_border-box]",
          "text-foreground hover:brightness-105 active:brightness-110",
          "shadow-xs"
        ),
        // Gradient with base theme background inside
        gradientTransparent: cn(
          "border border-transparent",
          // Base background inside (adjustable by theme)
          "[background:linear-gradient(theme(colors.background),theme(colors.background))_padding-box,linear-gradient(90deg,theme(colors.fuchsia.500),theme(colors.cyan.400),theme(colors.emerald.400))_border-box]",
          "text-foreground hover:brightness-105 active:brightness-110",
          "shadow-xs"
        ),
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "gradient", // Default is gradient button
      size: "default",
    },
  }
)

function Buttonz({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariantz> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariantz({ variant, size, className }))}
      {...props}
    />
  )
}

export { Buttonz, buttonVariantz }
