'use client'

import { H3, P } from '@repo/ui/typography'
import { Aside } from '@repo/ui/aside'
import { Container } from '@repo/ui/container'
import { User } from '@/entities/user/model/types'
import { useUsers } from '@/entities/user/api/hooks'

type UsersProps = {
  users: User[]
}
export function Users({ users: _users }: UsersProps) {
  const { users } = useUsers(_users)

  return users.map(({ id, name, username, email, phone, website }) => (
    <Aside key={id}>
      <Container>
        <H3>
          {name} ({username})
        </H3>
        <P>Email: {email}</P>
        <P>Phone: {phone}</P>
        <P>Website: {website}</P>
      </Container>
    </Aside>
  ))
}
