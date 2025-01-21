import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

export function Menu({
  className,
  children,
  items,
  ...props
}: ComponentProps<'menu'> & {
  items: ComponentProps<typeof MenuItem>[]
}) {
  return (
    <menu className={cn(className)} {...props}>
      {items.map(mapMenuItem)}
      {children}
    </menu>
  )
}

function MenuItem({
  className,
  children,
  ...props
}: ComponentProps<'li'> & Pick<Required<ComponentProps<'li'>>, 'key'>) {
  return (
    <li className={cn(className)} {...props}>
      {children}
    </li>
  )
}

export function createMenuItems(
  menuItems: ComponentProps<typeof Menu>['items']
) {
  return menuItems
}

function mapMenuItem({ key, ...menuItem }: ComponentProps<typeof MenuItem>) {
  return <MenuItem key={key} {...menuItem} />
}
