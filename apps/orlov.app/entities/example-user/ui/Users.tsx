'use client'

import { Aside } from '@repo/ui/aside'
import { Container } from '@repo/ui/container'
import { H3, P } from '@repo/ui/typography'

import { useUsers } from '@/entities/example-user/api/hooks'
import { User } from '@/entities/example-user/model/types'

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
