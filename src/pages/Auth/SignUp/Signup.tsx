import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormInput, FormPassword } from "@/components/molecules/Form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { createUserSchema, initialValues } from "./helper";

export default function Signup() {
    const form = useForm<z.infer<typeof createUserSchema>>({
        resolver: zodResolver(createUserSchema),
        defaultValues: initialValues,
    });

    const onSubmit = (values: z.infer<typeof createUserSchema>) => {
        console.log(values);
    };
    return (
        <section className="flex justify-center my-5 h-screen items-center">
            <Card className="shadow-[rgba(7,_65,_210,_0.1)_0px_10px_32px]">
                <CardHeader>
                    <div className="md:hidden flex items-center">
                        <img
                            className="h-[32px] w-[32px] mr-2"
                            src="/logo.svg"
                            alt="logo"
                        />
                        <h1 className="text-left text-xl font-semibold text-neutral-600">
                            sonic
                        </h1>
                    </div>
                    <img
                        className="md:hidden mix-blend-multiply w-52 h-52"
                        src={"/hero.jpg"}
                        alt="radio"
                    />
                </CardHeader>
                <CardTitle className="text-center text-slate-500">Sign Up</CardTitle>
                <CardContent className="my-4">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 "
                        >
                            <FormInput
                                name="full_name"
                                control={form.control}
                                icon={<User className="stroke-slate-400" />}
                                placeholder="Full Name"
                            />
                            <FormInput
                                name="email"
                                control={form.control}
                                placeholder="Email"
                            />
                            <FormPassword
                                name="password"
                                control={form.control}
                                placeholder="Password"
                            />
                            <Button className="rounded-full w-full" type="submit">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section>
    );
}
