import 'server-only'

import { Article } from '@repo/ui/article'
import { Button } from '@repo/ui/button'
import { Container } from '@repo/ui/container'
import { Main } from '@repo/ui/main'
import { Section } from '@repo/ui/section'
import { H1, H2, P } from '@repo/ui/typography'
import Image from 'next/image'

import { getPosts } from '@/entities/example-post/api/actions'
import { Posts } from '@/entities/example-post/ui/Posts'
import { getUsers } from '@/entities/example-user/api/actions'
import { Users } from '@/entities/example-user/ui/Users'
import { Breadcrumbs, createBreadcrumbs } from '@/features/breadcrumbs'
import { ImageBgGradientWithPortrait } from '@/shared/ui/images'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

const breadcrumbs = createBreadcrumbs([])

export async function ExampleView() {
  const posts = await getPosts()
  const users = await getUsers()

  return (
    <>
      <Header />
      <Main>
        <Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </Container>
        <Section>
          <Container>
            <H1>HELLO! my name is ILIA ORLOV</H1>
            <P>Full Stack Web Developer specializing in TypeScript</P>
            <Button>Hire me</Button>
            <ImageBgGradientWithPortrait />
          </Container>
        </Section>
        <Article>
          <Container>
            <H2 variant='h1'>Article</H2>
          </Container>
        </Article>
        <Section>
          <Container>
            <H2>Posts</H2>
            <Posts posts={posts} />
          </Container>
        </Section>
        <Section>
          <Container>
            <H2>Users</H2>
            <Users users={users} />
          </Container>
        </Section>
      </Main>
      <Footer />
    </>
  )
}
