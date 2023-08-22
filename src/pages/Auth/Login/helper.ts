import * as z from "zod";

export const loginUserSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const initialValues = {
    email: "",
    password: "",
};

export type ILoginUser = z.infer<typeof loginUserSchema>;
