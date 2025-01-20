import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

export function Section({
  className,
  children,
  ...props
}: ComponentProps<'section'>) {
  return (
    <section className={cn(className)} {...props}>
      {children}
    </section>
  )
}
