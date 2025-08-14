import { z } from 'zod'

const objectIdRegex = /^[0-9a-fA-F]{24}$/

const purchaseItemSchema = z.object({
  productId: z.string().refine(id => objectIdRegex.test(id), {
    message: 'El productId debe ser un ObjectId de MongoDB válido.'
  }),
  quantity: z.number().int().min(1, {
    message: 'La cantidad debe ser un número entero mayor a 0.'
  })
})

const purchaseSchema = z.object({
  userEmail: z.string().email({
    message: 'El userEmail debe ser una dirección de correo válida.'
  }),
  items: z.array(purchaseItemSchema).min(1, {
    message: 'La compra debe tener al menos un producto.'
  })
})

export const validationOrder = (data) => {
  const validate = purchaseSchema.safeParse(data)

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
