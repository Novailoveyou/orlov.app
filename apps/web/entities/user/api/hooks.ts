'use client'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { ROUTE } from '@/entities/user/config/constants'
import { User } from '@/entities/user/model/types'
import {
  createUserFetcher,
  deleteUserFetcher,
  getUserFetcher,
  getUsers,
  updateUserFetcher
} from '@/entities/user/api/actions'
import { useStore } from '@/app/_store'

export const useUsers = (fallbackData?: User[]) => {
  const setUsers = useStore.use.setUsers()

  const {
    data: users = [],
    isLoading: areUsersLoading,
    error: usersError,
    isValidating: isUsersValidating,
    mutate: mutateUsers
  } = useSWR(ROUTE, getUsers, {
    fallbackData,
    onSuccess: setUsers
  })

  return { users, areUsersLoading, usersError, isUsersValidating, mutateUsers }
}

export const useUser = (userId: User['id'], fallbackData?: User) => {
  const {
    data: user = null,
    isLoading: isUserLoading,
    error: userError,
    isValidating: isUserValidating,
    mutate: mutateUser
  } = useSWR(userId || userId === 0 ? [ROUTE, userId] : null, getUserFetcher, {
    fallbackData
  })

  return { user, isUserLoading, userError, isUserValidating, mutateUser }
}

export const useCreateUser = (user: Omit<User, 'id'>) => {
  const {
    data: createdUser = null,
    error: createUserError,
    isMutating: isUserCreating,
    reset: resetCreateUser,
    trigger: createUser
  } = useSWRMutation(user ? [user] : null, createUserFetcher, {
    optimisticData: user
  })

  return {
    createdUser,
    createUserError,
    isUserCreating,
    resetCreateUser,
    createUser
  }
}

export const useUpdateUser = (userId: User['id'], user: Omit<User, 'id'>) => {
  const {
    data: updatedUser = null,
    error: updateUserError,
    isMutating: isUserUpdating,
    reset: resetUpdateUser,
    trigger: updateUser
  } = useSWRMutation(
    (userId || userId === 0) && user ? [userId, user] : null,
    updateUserFetcher,
    {
      optimisticData: user
    }
  )

  return {
    updatedUser,
    updateUserError,
    isUserUpdating,
    resetUpdateUser,
    updateUser
  }
}

export const useDeleteUser = (userId: User['id']) => {
  const {
    data: deletedUser = null,
    error: deleteUserError,
    isMutating: isUserDeleting,
    reset: resetDeleteUser,
    trigger: deleteUser
  } = useSWRMutation(
    userId || userId === 0 ? [userId] : null,
    deleteUserFetcher,
    {
      optimisticData: null
    }
  )

  return {
    deletedUser,
    deleteUserError,
    isUserDeleting,
    resetDeleteUser,
    deleteUser
  }
}
