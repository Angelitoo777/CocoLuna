import { z } from 'zod'

const validateUser = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(16),
  password: z.string().min(6),
  role: z.string().optional()
})

export function validationUser (data) {
  return validateUser.safeParse(data)
}

export function validateParcialUser (data) {
  return validateUser.pick({
    username: true,
    password: true
  }).safeParse(data)
}
