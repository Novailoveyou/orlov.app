'use client'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { ROUTE } from '@/entities/post/config/constants'
import { Post } from '@/entities/post/model/types'
import {
  createPostFetcher,
  deletePostFetcher,
  getPostFetcher,
  getPosts,
  updatePostFetcher
} from '@/entities/post/api/actions'
import { useStore } from '@/app/_store'

export const usePosts = (fallbackData?: Post[]) => {
  const setPosts = useStore(state => state.setPosts)

  const {
    data: posts = [],
    isLoading: arePostsLoading,
    error: postsError,
    isValidating: arePostsValidating,
    mutate: mutatePosts
  } = useSWR(ROUTE, getPosts, {
    fallbackData,
    onSuccess: setPosts
  })

  return { posts, arePostsLoading, postsError, arePostsValidating, mutatePosts }
}

export const usePost = (postId: Post['id'], fallbackData?: Post) => {
  const {
    data: post = null,
    isLoading: isPostLoading,
    error: postError,
    isValidating: isPostValidating,
    mutate: mutatePost
  } = useSWR(postId || postId === 0 ? [ROUTE, postId] : null, getPostFetcher, {
    fallbackData
  })

  return { post, isPostLoading, postError, isPostValidating, mutatePost }
}

export const useCreatePost = (post: Omit<Post, 'id'>) => {
  const {
    data: createdPost = null,
    error: createPostError,
    isMutating: isPostCreating,
    reset: resetCreatePost,
    trigger: createPost
  } = useSWRMutation(post ? [post] : null, createPostFetcher, {
    optimisticData: post
  })

  return {
    createdPost,
    createPostError,
    isPostCreating,
    resetCreatePost,
    createPost
  }
}

export const useUpdatePost = (postId: Post['id'], post: Omit<Post, 'id'>) => {
  const {
    data: updatedPost = null,
    error: updatePostError,
    isMutating: isPostUpdating,
    reset: resetUpdatePost,
    trigger: updatePost
  } = useSWRMutation(
    (postId || postId === 0) && post ? [postId, post] : null,
    updatePostFetcher,
    {
      optimisticData: post
    }
  )

  return {
    updatedPost,
    updatePostError,
    isPostUpdating,
    resetUpdatePost,
    updatePost
  }
}

export const useDeletePost = (postId: Post['id']) => {
  const {
    data: deletedPost = null,
    error: deletePostError,
    isMutating: isPostDeleting,
    reset: resetDeletePost,
    trigger: deletePost
  } = useSWRMutation(
    postId || postId === 0 ? [postId] : null,
    deletePostFetcher,
    {
      optimisticData: null
    }
  )

  return {
    deletedPost,
    deletePostError,
    isPostDeleting,
    resetDeletePost,
    deletePost
  }
}
