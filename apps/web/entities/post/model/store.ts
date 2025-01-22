import { Post } from './types'
import { Slice } from '@/app/_store'

type PostState = {
  posts: Post[]
}

type PostActions = {
  setPosts: (posts: Post[]) => void
}

export type PostSlice = PostState & PostActions

export const createPostSlice: Slice<PostSlice> = set => ({
  posts: [],
  setPosts: posts =>
    set(state => {
      state.posts = posts
    })
})
