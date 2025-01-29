import 'server-only'

import { Button } from '@repo/ui/button'
import { Container } from '@repo/ui/container'
import { Main } from '@repo/ui/main'
import { Section } from '@repo/ui/section'
import { ThemeToggle } from '@repo/ui/theme-toggle'
import { H1, P } from '@repo/ui/typography'

import { Breadcrumbs, createBreadcrumbs } from '@/features/breadcrumbs'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

const breadcrumbs = createBreadcrumbs([])

export async function HomeView() {
  return (
    <>
      <Header />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Main>
        <Section>
          <Container>
            <H1>Home</H1>
            <P>Content</P>
            <Button>Button</Button>
            <ThemeToggle />
          </Container>
        </Section>
      </Main>
      <Footer />
    </>
  )
}
