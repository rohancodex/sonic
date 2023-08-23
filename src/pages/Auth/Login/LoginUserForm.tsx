import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Lock } from "lucide-react";
import { useForm } from "react-hook-form";

import { FormInput, FormPassword } from "@/components/molecules/Form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { ILoginUser, initialValues, loginUserSchema } from "./helper";

const LoginUserForm = ({
    onSubmit,
}: {
    onSubmit: (values: ILoginUser) => Promise<void>;
}) => {
    const form = useForm<ILoginUser>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: initialValues,
    });

    const { isSubmitting } = form.formState;
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormInput
                    className="py-6 rounded-lg"
                    name="email"
                    control={form.control}
                    icon={<AtSign className="w-5 h-5 stroke-slate-400" />}
                    placeholder="Email"
                />
                <FormPassword
                    className="py-6 rounded-lg"
                    name="password"
                    control={form.control}
                    icon={<Lock className="w-5 h-5 stroke-slate-400" />}
                    placeholder="Password"
                />

                <Button
                    isLoading={isSubmitting}
                    className="w-full rounded-lg"
                    type="submit"
                >
                    Sign In
                </Button>
            </form>
        </Form>
    );
};

export default LoginUserForm;
