'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * @description Defines a theme provider to be used in Next.js apps to have theme toggle
 * @see https://ui.shadcn.com/docs/dark-mode/next
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
      {...props}>
      {children}
    </NextThemesProvider>
  )
}
