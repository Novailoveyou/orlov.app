import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

/**
 * @description Defines a header and related content
 */
export function HGroup({
  className,
  children,
  ...props
}: ComponentProps<'hgroup'>) {
  return (
    <hgroup className={cn(className)} {...props}>
      {children}
    </hgroup>
  )
}
