import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório."),
    email: z.string().email("E-mail inválido."),
    phone: z.string().min(10, "Mínimo 10 números.").max(15, "Máximo 15 números."),
    position: z.string().min(1, "Cargo é obrigatório."),
    github: z.string().url("A URL precisa ser válida.").optional(),
    linkedin: z.string().url("A URL precisa ser válida.").optional()
})