'use client'

import { useStore } from './_store'

export function TestStore() {
  const posts = useStore(state => state.posts)
  const users = useStore(state => state.users)
  console.log('posts: ', posts)
  console.log('users: ', users)
  return <>test store</>
}
