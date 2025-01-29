import 'server-only'

import { Header as _Header } from '@repo/ui/header'
import { createMenuItems, Menu } from '@repo/ui/menu'
import { Nav } from '@repo/ui/nav'
import { ThemeToggle } from '@repo/ui/theme-toggle'

const menuItems = createMenuItems([
  {
    key: 'acd41f12-6311-4d39-96bc-2bf9c1f2b01a',
    children: 'Menu item 1',
  },
  {
    key: 'a59617bc-e854-4b02-aaad-259461f6b3df',
    children: 'Menu Item 2',
  },
  {
    key: '2dffa233-5563-456a-89d6-be115aeb70db',
    children: 'Menu Item 3',
  },
])

export function Header() {
  return (
    <_Header>
      <Nav>
        <Menu items={menuItems} />
      </Nav>
      <ThemeToggle />
    </_Header>
  )
}
