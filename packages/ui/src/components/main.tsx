import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

export function Main({
  className,
  children,
  ...props
}: ComponentProps<'main'>) {
  return (
    <main className={cn(className)} {...props}>
      {children}
    </main>
  )
}
