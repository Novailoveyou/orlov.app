import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

export function Nav({ className, children, ...props }: ComponentProps<'nav'>) {
  return (
    <nav className={cn(className)} {...props}>
      {children}
    </nav>
  )
}
