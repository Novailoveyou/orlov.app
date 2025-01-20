import { Section } from '@repo/ui/section'
import { Container } from '@repo/ui/container'
import { H1 } from '@repo/ui/typography'
import { Button } from '@repo/ui/button'
import { ThemeToggle } from '@repo/ui/theme-toggle'

export default function Home() {
  return (
    <Section>
      <Container>
        <H1>Home</H1>
        <Button>Button</Button>
        <ThemeToggle />
      </Container>
    </Section>
  )
}
