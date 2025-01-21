'use client'

import useSWR from 'swr'
import { ROUTE } from './constants'
import { getPost, getPosts } from './actions'
import { Post } from './types'

export const usePosts = () => {
  const {
    data: posts,
    isLoading: arePostsLoading,
    error: postsError,
    isValidating: isPostsValidating,
    mutate: mutatePosts
  } = useSWR(ROUTE, getPosts)

  return { posts, arePostsLoading, postsError, isPostsValidating, mutatePosts }
}

export const usePost = (postId: Post['id']) => {
  const {
    data: post,
    isLoading: isPostLoading,
    error: postError,
    isValidating: isPostValidating,
    mutate: mutatePost
  } = useSWR(`${postId}`, getPost)

  return { post, isPostLoading, postError, isPostValidating, mutatePost }
}
