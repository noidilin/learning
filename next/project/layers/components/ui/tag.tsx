import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const tagVariants = cva(
  'inline-flex gap-2 items-center border rounded-full px-3 py-1 text-lg font-medium uppercase w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        outline:
          'border-lime-400 bg-transparent text-lime-400 [a&]:hover:bg-lime-100/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Tag({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof tagVariants>) {
  return (
    <div className={cn(tagVariants({ variant }), className)} {...props}>
      <span>&#10038;</span>
      <span>{children}</span>
    </div>
  )
}

export { Tag }
