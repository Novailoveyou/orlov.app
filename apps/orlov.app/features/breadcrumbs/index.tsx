import 'server-only'

import { Button } from '@repo/ui/button'
import { Nav } from '@repo/ui/nav'
import { Text } from '@repo/ui/typography'
import Link from 'next/link'
import { ComponentProps } from 'react'

type LinkProps = ComponentProps<typeof Link>

type Breadcrumb = LinkProps & Pick<Required<LinkProps>, 'id' | 'children'>

type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[]
}

const HOME_BREADCRUMB = {
  id: '112ae98c-3fd6-4ffc-96a6-433be83038a2',
  href: '/',
  children: 'Главная',
} as const satisfies Breadcrumb

export const createBreadcrumbs = (breadcrumbs: Breadcrumb[]) => breadcrumbs

export function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  if (breadcrumbs.length === 0) return <></>

  return (
    <Nav>
      {[HOME_BREADCRUMB, ...breadcrumbs].map(
        ({ id, href, children, ...rest }) => (
          <Button key={id} asChild variant='ghost'>
            <Link href={href} {...rest}>
              <Text>{children}</Text>
            </Link>
          </Button>
        ),
      )}
    </Nav>
  )
}
