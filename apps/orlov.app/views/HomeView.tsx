import 'server-only'

import { Button } from '@repo/ui/button'
import { Container } from '@repo/ui/container'
import { Main } from '@repo/ui/main'
import { Section } from '@repo/ui/section'
import { ThemeToggle } from '@repo/ui/theme-toggle'
import { H1, P } from '@repo/ui/typography'
import { ComponentProps } from 'react'

import { Breadcrumbs } from '@/features/breadcrumbs'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

const BREADCRUMBS = [] as const satisfies ComponentProps<
  typeof Breadcrumbs
>['breadcrumbs']

export async function HomeView() {
  return (
    <>
      <Header />
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
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
