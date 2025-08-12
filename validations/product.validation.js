import { z } from 'zod'

const productValidate = z.object({
  name: z.string().max(30),
  description: z.string().min(10),
  stock: z.number().int().min(0),
  category: z.array(
    z.string()
  ),
  imageUrl: z.string().url()
})

export const productValidation = (data) => {
  const validate = productValidate.safeParse(data)

  if (validate.success) {
    return { success: true, data: validate.data }
  } else {
    const errors = validate.error.issues.map(issue => ({
      path: issue.path.join('.'),
      message: issue.message
    }))
    return { success: false, errors }
  }
}

export const productParcialValidation = (data) => {
  const validate = productValidate.partial().safeParse(data)

  if (validate.success) {
    return { success: true, data: validate.data }
  }

  const errors = validate.error.issues.map(issue => ({
    path: issue.path.join('.'),
    message: issue.message
  }))

  return errors
}
