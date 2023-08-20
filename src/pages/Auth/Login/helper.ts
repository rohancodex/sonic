import * as z from "zod";

export const loginUserSchema = z
    .object({
        full_name: z.string().min(1, "Full name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirm_password: z.string().min(8, "Password must be at least 8 characters"),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Password doesn't match",
        path: ["confirm_password"],
    });

export const initialValues = {
    email: "",
    password: "",
};
