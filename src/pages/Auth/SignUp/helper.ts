import * as z from "zod";

export const createUserSchema = z.object({
    full_name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const initialValues = {
    full_name: "",
    email: "",
    password: "",
};

export type ICreateUser = z.infer<typeof createUserSchema>;
