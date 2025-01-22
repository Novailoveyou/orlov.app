/* eslint-disable @typescript-eslint/no-unused-vars -- we need this for TS reference */
import { create, StateCreator } from 'zustand'
import { combine, createJSONStorage } from 'zustand/middleware'
import { devtools, persist } from 'zustand/middleware'
import { version } from '@/package.json'
import { immer } from 'zustand/middleware/immer'
import { createPostSlice, PostSlice } from '@/entities/post/model/store'
import { createUserSlice, UserSlice } from '@/entities/user/model/store'

type Slices = PostSlice & UserSlice

export type Slice<T> = StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  T
>

export const useStore = create(
  devtools(
    persist(
      immer<Slices>((...props) => ({
        ...createPostSlice(...props),
        ...createUserSlice(...props)
      })),
      {
        name: 'catapulto-store',
        storage: createJSONStorage(() => sessionStorage),
        // partialize: state =>
        //   Object.fromEntries(
        //     Object.entries(state).filter(([key]) =>
        //       ['posts', 'users'].includes(key)
        //     )
        //   ),
        version: Number(version)
      }
    )
  )
)

export type Store = ReturnType<(typeof useStore)['getState']>
