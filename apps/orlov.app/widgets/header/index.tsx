import 'server-only'

import { Header as _Header } from '@repo/ui/header'
import { createMenuItems, Menu } from '@repo/ui/menu'
import { Nav } from '@repo/ui/nav'
import { ThemeToggle } from '@repo/ui/theme-toggle'
import { Text } from '@repo/ui/typography'

import { ImageLogo } from '@/shared/ui/images'

const menuItems = createMenuItems([
  {
    key: 'acd41f12-6311-4d39-96bc-2bf9c1f2b01a',
    children: 'Experience',
  },
  {
    key: 'a59617bc-e854-4b02-aaad-259461f6b3df',
    children: 'Skills',
  },
  {
    key: '2dffa233-5563-456a-89d6-be115aeb70db',
    children: 'Achievements',
  },
  {
    key: 'c6a6960b-d2cd-4741-a77f-45877f5f57cb',
    children: 'More',
  },
])

export function Header() {
  return (
    <_Header>
      <ImageLogo />
      <Text>Ilia Orlov</Text>
      <Nav>
        <Menu items={menuItems} />
      </Nav>
      <ThemeToggle />
    </_Header>
  )
}
