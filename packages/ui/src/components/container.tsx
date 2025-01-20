import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

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
