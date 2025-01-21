import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

/**
 * @description Defines a footer for a document or section
 */
export function Footer({
  className,
  children,
  ...props
}: ComponentProps<'footer'>) {
  return (
    <footer className={cn(className)} {...props}>
      {children}
    </footer>
  )
}
