import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

export function Article({
  className,
  children,
  ...props
}: ComponentProps<'article'>) {
  return (
    <article className={cn(className)} {...props}>
      {children}
    </article>
  )
}
