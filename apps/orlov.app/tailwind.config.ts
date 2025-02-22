// export * from '@repo/ui/tailwind.config'

import tailwindconfig, { TailwindConfig } from '@repo/ui/tailwind.config'

const config = {
  ...tailwindconfig,
  presets: [tailwindconfig],
  theme: {
    ...tailwindconfig.theme,
    extend: {
      ...tailwindconfig.theme.extend,
      colors: {
        ...tailwindconfig.theme.extend.colors,
      },
    },
  },
} as const satisfies TailwindConfig

export default config
