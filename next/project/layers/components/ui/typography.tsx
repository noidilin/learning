import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type TypographyProps = {
  children: ReactNode
  className?: string
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className,
      )}
    >
      {children}
    </h1>
  )
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </h2>
  )
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </h3>
  )
}

export function H4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </h4>
  )
}

export function Paragraph({ children, className }: TypographyProps) {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </p>
  )
}

export function Lead({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>
  )
}

export function Large({ children, className }: TypographyProps) {
  return <p className={cn('text-lg font-semibold', className)}>{children}</p>
}

export function Small({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-sm leading-none font-medium', className)}>
      {children}
    </p>
  )
}

export function Muted({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
  )
}

export function Blockquote({ children, className }: TypographyProps) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  )
}

export function List({ children, className }: TypographyProps) {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}>
      {children}
    </ul>
  )
}
