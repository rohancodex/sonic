import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";

import { FormInput, FormPassword } from "@/components/molecules/Form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { createUserSchema, ICreateUser, initialValues } from "./helper";

const CreateUserForm = ({
    onSubmit,
}: {
    onSubmit: (values: ICreateUser) => Promise<void>;
}) => {
    const form = useForm<ICreateUser>({
        resolver: zodResolver(createUserSchema),
        defaultValues: initialValues,
    });
    const { isSubmitting } = form.formState;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormInput
                    className="rounded-lg py-6"
                    name="full_name"
                    control={form.control}
                    icon={<User className="stroke-slate-400 h-5 w-5" />}
                    placeholder="Full Name"
                />
                <FormInput
                    className="rounded-lg py-6"
                    name="email"
                    control={form.control}
                    icon={<AtSign className="stroke-slate-400 h-5 w-5" />}
                    placeholder="Email"
                />
                <FormPassword
                    className="rounded-lg py-6"
                    name="password"
                    control={form.control}
                    icon={<Lock className="stroke-slate-400 h-5 w-5" />}
                    placeholder="Password"
                />
                <Button
                    isLoading={isSubmitting}
                    className="rounded-lg w-full"
                    type="submit"
                >
                    Sign Up
                </Button>
            </form>
        </Form>
    );
};

export default CreateUserForm;
