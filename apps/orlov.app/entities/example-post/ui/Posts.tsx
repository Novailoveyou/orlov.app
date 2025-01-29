'use client'

import { Article } from '@repo/ui/article'
import { Container } from '@repo/ui/container'
import { H3, P } from '@repo/ui/typography'

import { usePosts } from '@/entities/example-post/api/hooks'
import { Post } from '@/entities/example-post/model/types'

type PostsProps = {
  posts: Post[]
}
export function Posts({ posts: _posts }: PostsProps) {
  const { posts } = usePosts(_posts)

  return posts.map(({ id, title, body }) => (
    <Article key={id}>
      <Container>
        <H3>{title}</H3>
        <P>{body}</P>
      </Container>
    </Article>
  ))
}
