import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

/**
 * @description Defines content aside from the page content
 */
export function Aside({
  className,
  children,
  ...props
}: ComponentProps<'aside'>) {
  return (
    <aside className={cn(className)} {...props}>
      {children}
    </aside>
  )
}
