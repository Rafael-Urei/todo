import { z } from "zod";

export const Form = z.object({
    title: z.string().min(1, 'This field require at least 1 character!'),
    description: z.string(),
    type: z.array(z.object({
        id: z.number(),
        title: z.string()
    })).nonempty('Please select at least 1 type for this task'),
    date: z.string()
})

