import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório.").max(255),
    email: z.string().email("E-mail inválido."),
    phone: z
        .string()
        .min(10, "Mínimo 10 números.")
        .max(15, "Máximo 15 números.")
        .refine((value) => /^[0-9]+$/.test(value), {
                message: "Campo vazio ou apenas números."
        }),
    position: z.string().min(1, "Selecione um cargo."),
    github: z.string().url("URL inválida.").optional(),
    linkedin: z.string().url("URL inválida.").optional()
})