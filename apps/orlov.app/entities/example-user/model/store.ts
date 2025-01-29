import { Slice } from '@/app/_store'

import { User } from './types'

type UserState = {
  users: User[]
}

type UserActions = {
  setUsers: (users: User[]) => void
}

export type UserSlice = UserState & UserActions

export const createUserSlice: Slice<UserSlice> = (set) => ({
  users: [],
  setUsers: (users) =>
    set((state) => {
      state.users = users
    }),
})
