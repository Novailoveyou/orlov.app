import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

export function Header({
  className,
  children,
  ...props
}: ComponentProps<'header'>) {
  return (
    <header className={cn(className)} {...props}>
      {children}
    </header>
  )
}
