import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

/**
 * @description Defines a specific time (or datetime)
 */
export function Time({
  className,
  children,
  ...props
}: ComponentProps<'time'>) {
  return (
    <time className={cn(className)} {...props}>
      {children}
    </time>
  )
}
