import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const keycapVariants = cva(
  'size-14 inline-flex items-center justify-center shrink-0 gap-1 border rounded-2xl text-xl font-bold whitespace-nowrap [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-neutral-300 text-neutral-950 transition-all duration-500 outline-2 outline-offset-4 outline-transparent group-hover:outline-lime-400 group-hover:translate-y-1',
        outline: 'border-neutral-300 bg-transparent text-neutral-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Keycap({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof keycapVariants>) {
  return (
    <div className={cn(keycapVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}

export { Keycap }
