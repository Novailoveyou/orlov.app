import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

/**
 * @description Defines an address
 */
export function Address({
  className,
  children,
  ...props
}: ComponentProps<'address'>) {
  return (
    <address className={cn(className)} {...props}>
      {children}
    </address>
  )
}
