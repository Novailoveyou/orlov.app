'use server'
import 'server-only'

import axios from 'axios'

import { ROUTE } from '@/entities/example-user/config/constants'
import { User } from '@/entities/example-user/model/types'
import { handleErrorGracefully } from '@/shared/lib/utils'

/**
 * @description Listing all resources
 */
export const getUsers = async () =>
  (await axios.get<User[]>(ROUTE).catch(handleErrorGracefully))?.data || []

/**
 * @description Getting a resource
 */
export const getUser = async (userId: User['id']) =>
  (await axios.get<User>(`${ROUTE}/${userId}`).catch(handleErrorGracefully))
    ?.data || null

export const getUserFetcher = async ([, userId]: [typeof ROUTE, User['id']]) =>
  await getUser(userId)

/**
 * @description Creating a resource
 */
export const createUser = async (user: Omit<User, 'id'>) =>
  (await axios.post<User>(ROUTE, user).catch(handleErrorGracefully))?.data ||
  null

export const createUserFetcher = async ([user]: [Omit<User, 'id'>]) =>
  await createUser(user)

/**
 * @description Updating a resource
 */
export const updateUser = async (userId: User['id'], user: Omit<User, 'id'>) =>
  (
    await axios
      .put<User>(`${ROUTE}/${userId}`, user)
      .catch(handleErrorGracefully)
  )?.data || null

export const updateUserFetcher = async ([userId, user]: [
  User['id'],
  Omit<User, 'id'>,
]) => await updateUser(userId, user)

/**
 * @description Deleting a resource
 */
export const deleteUser = async (userId: User['id']) =>
  !!(await axios.delete(`${ROUTE}/${userId}`).catch(handleErrorGracefully))
    ?.data

export const deleteUserFetcher = async ([userId]: [User['id']]) =>
  await deleteUser(userId)
