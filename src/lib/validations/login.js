import * as z from 'zod'

export const userAuthLoginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(1, { message: 'Password is required' })
})