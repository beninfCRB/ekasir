import { passwordHash } from '../src/utils/password.util'

export async function seedUser(prisma) {
  const data = [
    {
      username: 'Beni',
      email: 'bfauzi09@gmail.com',
      role: 'admin',
      password: await passwordHash('123', 10)
    },
  ]

  await prisma.user.create({
    data: data
  })
}