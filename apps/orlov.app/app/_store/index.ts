/* eslint-disable @typescript-eslint/no-unused-vars -- we need this for TS reference */
import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand'
import { combine, createJSONStorage } from 'zustand/middleware'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { createPostSlice, PostSlice } from '@/entities/example-post/model/store'
import { createUserSlice, UserSlice } from '@/entities/example-user/model/store'
import { version } from '@/package.json'

type Slices = PostSlice & UserSlice

export type Slice<T> = StateCreator<
  Slices,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  T
>

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    ;(store.use as Record<string, () => void>)[k] = () =>
      store((s) => s[k as keyof typeof s])
  }

  return store
}

const useStoreBase = create(
  devtools(
    persist(
      immer<Slices>((...props) => ({
        ...createPostSlice(...props),
        ...createUserSlice(...props),
      })),
      {
        name: 'store',
        storage: createJSONStorage(() => sessionStorage),
        // partialize: state =>
        //   Object.fromEntries(
        //     Object.entries(state).filter(([key]) =>
        //       ['posts', 'users'].includes(key)
        //     )
        //   ),
        version: Number(version),
      },
    ),
  ),
)

export const useStore = createSelectors(useStoreBase)

export type Store = ReturnType<(typeof useStore)['getState']>
