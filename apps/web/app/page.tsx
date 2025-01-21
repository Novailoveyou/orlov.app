import { Footer } from '@repo/ui/footer'
import { Header } from '@repo/ui/header'
import { Main } from '@repo/ui/main'
import { Article } from '@repo/ui/article'
import { Menu, createMenuItems } from '@repo/ui/menu'
import { Nav } from '@repo/ui/nav'
import { Section } from '@repo/ui/section'
import { Container } from '@repo/ui/container'
import { H1, H2, P } from '@repo/ui/typography'
import { Button } from '@repo/ui/button'
import { ThemeToggle } from '@repo/ui/theme-toggle'

const menuItems = createMenuItems([
  {
    key: 'acd41f12-6311-4d39-96bc-2bf9c1f2b01a',
    children: 'Menu item 1'
  },
  {
    key: 'a59617bc-e854-4b02-aaad-259461f6b3df',
    children: 'Menu Item 2'
  },
  {
    key: '2dffa233-5563-456a-89d6-be115aeb70db',
    children: 'Menu Item 3'
  }
])

export default function Home() {
  return (
    <>
      <Header>
        Header
        <Nav>
          <Menu items={menuItems} />
        </Nav>
      </Header>
      <Main>
        <Article>
          <Container>
            <H2 variant='h1'>Article</H2>
            <P>Content</P>
          </Container>
        </Article>
        <Section>
          <Container>
            <H1>Home</H1>
            <P>Content</P>
            <Button>Button</Button>
            <ThemeToggle />
          </Container>
        </Section>
      </Main>
      <Footer>Footer</Footer>
    </>
  )
}
