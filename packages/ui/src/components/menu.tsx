import { cn } from '@repo/ui/lib/utils'
import { ComponentProps } from 'react'

/**
 * @description Defines an unordered list
 */
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

/**
 * @description Defines a list item to be used as Menu child
 */
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

/**
 * @description Creates an array of static MenuItem's props
 */
export function createMenuItems(
  menuItems: ComponentProps<typeof Menu>['items']
) {
  return menuItems
}

/**
 * @description Callback function to be passed in in `.map` high order array function to render MenuItem
 */
function mapMenuItem({ key, ...menuItem }: ComponentProps<typeof MenuItem>) {
  return <MenuItem key={key} {...menuItem} />
}
