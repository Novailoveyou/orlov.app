'use client'

import { useStore } from './_store'

export function TestStore() {
  const posts = useStore.use.posts()
  const users = useStore.use.users()
  console.log('posts: ', posts)
  console.log('users: ', users)
  return <>test store</>
}
