'use client'

import { H3, P } from '@repo/ui/typography'
import { Article } from '@repo/ui/article'
import { Container } from '@repo/ui/container'
import { Post } from '@/entities/post/model/types'
import { usePosts } from '@/entities/post/api/hooks'

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
