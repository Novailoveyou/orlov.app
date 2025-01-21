'use server'
import { handleErrorGracefully } from '@/lib/utils'
import axios from 'axios'
import 'server-only'
import { Post } from './types'
import { ROUTE } from './constants'

export const getPosts = async () =>
  (await axios.get<Post[]>(ROUTE).catch(handleErrorGracefully))?.data || []

export const getPost = async (postId: Post['id']) =>
  (await axios.get<Post>(`${ROUTE}/${postId}`).catch(handleErrorGracefully))
    ?.data || null

export const createPost = async (post: Omit<Post, 'id'>) =>
  (await axios.post<Post>(ROUTE, post).catch(handleErrorGracefully))?.data ||
  null

export const updatePost = async (postId: Post['id'], post: Omit<Post, 'id'>) =>
  (
    await axios
      .put<Post>(`${ROUTE}/${postId}`, post)
      .catch(handleErrorGracefully)
  )?.data || null

export const deletePost = async (postId: Post['id']) =>
  !!(await axios.delete(`${ROUTE}/${postId}`).catch(handleErrorGracefully))
    ?.data
