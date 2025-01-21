import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

/**
 * @description Defines navigation links
 */
export function Nav({ className, children, ...props }: ComponentProps<'nav'>) {
  return (
    <nav className={cn(className)} {...props}>
      {children}
    </nav>
  )
}
