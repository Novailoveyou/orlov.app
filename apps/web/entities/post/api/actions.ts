'use server'
import 'server-only'
import axios from 'axios'
import { handleErrorGracefully } from '@/shared/lib/utils'
import { ROUTE } from '@/entities/post/config/constants'
import { Post } from '@/entities/post/model/types'

/**
 * @description Listing all resources
 */
export const getPosts = async () =>
  (await axios.get<Post[]>(ROUTE).catch(handleErrorGracefully))?.data || []

/**
 * @description Getting a resource
 */
export const getPost = async (postId: Post['id']) =>
  (await axios.get<Post>(`${ROUTE}/${postId}`).catch(handleErrorGracefully))
    ?.data || null

export const getPostFetcher = async ([, postId]: [typeof ROUTE, Post['id']]) =>
  await getPost(postId)

/**
 * @description Creating a resource
 */
export const createPost = async (post: Omit<Post, 'id'>) =>
  (await axios.post<Post>(ROUTE, post).catch(handleErrorGracefully))?.data ||
  null

export const createPostFetcher = async ([post]: [Omit<Post, 'id'>]) =>
  await createPost(post)

/**
 * @description Updating a resource
 */
export const updatePost = async (postId: Post['id'], post: Omit<Post, 'id'>) =>
  (
    await axios
      .put<Post>(`${ROUTE}/${postId}`, post)
      .catch(handleErrorGracefully)
  )?.data || null

export const updatePostFetcher = async ([postId, post]: [
  Post['id'],
  Omit<Post, 'id'>
]) => await updatePost(postId, post)

/**
 * @description Deleting a resource
 */
export const deletePost = async (postId: Post['id']) =>
  !!(await axios.delete(`${ROUTE}/${postId}`).catch(handleErrorGracefully))
    ?.data

export const deletePostFetcher = async ([postId]: [Post['id']]) =>
  await deletePost(postId)
