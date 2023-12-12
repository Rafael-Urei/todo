import { z } from "zod";

export const authSchema = z.object({
    email: z.string().min(1, 'This field require at least 1 character!'),
    password_hash: z.string().min(1, 'This field cannot be blank!'),
})

export type Auth = z.infer<typeof authSchema>