'use server'
import 'server-only'
import { handleErrorGracefully } from '@/lib/utils'
import axios from 'axios'
import { ROUTE } from '@/entities/post/model/constants'
import { Post } from '@/entities/post/model/types'

export const getPosts = async () =>
  (await axios.get<Post[]>(ROUTE).catch(handleErrorGracefully))?.data || []

export const getPost = async (postId: Post['id']) =>
  (await axios.get<Post>(`${ROUTE}/${postId}`).catch(handleErrorGracefully))
    ?.data || null

export const getPostFetcher = async ([, postId]: [typeof ROUTE, Post['id']]) =>
  await getPost(postId)

export const createPost = async (post: Omit<Post, 'id'>) =>
  (await axios.post<Post>(ROUTE, post).catch(handleErrorGracefully))?.data ||
  null

export const createPostFetcher = async ([post]: [Omit<Post, 'id'>]) =>
  await createPost(post)

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

export const deletePost = async (postId: Post['id']) =>
  !!(await axios.delete(`${ROUTE}/${postId}`).catch(handleErrorGracefully))
    ?.data

export const deletePostFetcher = async ([postId]: [Post['id']]) =>
  await deletePost(postId)
