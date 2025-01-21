import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

/**
 * @description Defines an abbreviation or an acronym
 */
export function Abbr({
  className,
  children,
  ...props
}: ComponentProps<'abbr'>) {
  return (
    <abbr className={cn(className)} {...props}>
      {children}
    </abbr>
  )
}
