import z from "zod";

export const loginSchema = z.object({
    username : z.string().min(3, "Username Minimal 3 Karakter").max(50).regex(/^[a-zA-Z0-9_]+$/, "Hanya huruf, angka, dan underscore"),
    password: z.string().min(8, "Password Minimal 8 Karakter").max(100)
})

export type LoginInput = z.infer<typeof loginSchema>