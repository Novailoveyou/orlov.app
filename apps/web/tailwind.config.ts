// export * from '@repo/ui/tailwind.config'

import tailwindconfig, { TailwindConfig } from '@repo/ui/tailwind.config'

const config = {
  ...tailwindconfig,
  presets: [tailwindconfig]
} as const satisfies TailwindConfig

export default config
