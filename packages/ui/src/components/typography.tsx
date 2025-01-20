import { cn } from '@repo/ui/lib/utils'
import { ComponentProps, JSX } from 'react'

const VARIANTS = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  p: 'leading-7',
  blockquote: 'mt-6 border-l-2 pl-6 italic',
  span: ''
} as const

type TypographyProps<Tag extends keyof JSX.IntrinsicElements> =
  ComponentProps<Tag> & {
    variant?: keyof typeof VARIANTS
  }

export const H1 = ({
  variant = 'h1',
  className,
  ...props
}: TypographyProps<'h1'>) => {
  return <h1 className={cn(VARIANTS[variant], className)} {...props} />
}

export const H2 = ({
  variant = 'h2',
  className,
  ...props
}: TypographyProps<'h2'>) => {
  return <h2 className={cn(VARIANTS[variant], className)} {...props} />
}

export const H3 = ({
  variant = 'h3',
  className,
  ...props
}: TypographyProps<'h3'>) => {
  return <h3 className={cn(VARIANTS[variant], className)} {...props} />
}

export const H4 = ({
  variant = 'h4',
  className,
  ...props
}: TypographyProps<'h4'>) => {
  return <h4 className={cn(VARIANTS[variant], className)} {...props} />
}

export const P = ({
  variant = 'p',
  className,
  ...props
}: TypographyProps<'p'>) => {
  return <p className={cn(VARIANTS[variant], className)} {...props} />
}

export const Blockquote = ({
  variant = 'blockquote',
  className,
  ...props
}: TypographyProps<'blockquote'>) => {
  return <blockquote className={cn(VARIANTS[variant], className)} {...props} />
}

export const Text = ({
  variant = 'span',
  className,
  ...props
}: TypographyProps<'span'>) => {
  return <span className={cn(VARIANTS[variant], className)} {...props} />
}
