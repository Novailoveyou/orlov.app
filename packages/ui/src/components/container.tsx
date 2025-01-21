import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

/**
 * @description Defines a div container
 */
export function Container({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div className={cn('container', className)} {...props}>
      {children}
    </div>
  )
}
