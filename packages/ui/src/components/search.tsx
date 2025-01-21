import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

/**
 * @description Defines a search section
 */
export function Search({
  className,
  children,
  ...props
}: ComponentProps<'search'>) {
  return (
    <search className={cn(className)} {...props}>
      {children}
    </search>
  )
}
