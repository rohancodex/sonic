import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { FormInput, FormPassword } from "@/components/molecules/Form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

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
        <section className="lg:container flex justify-center lg:items-center lg:h-screen">
            <Card className="w-5/6 lg:p-8 lg:grid lg:grid-cols-2 shadow-[rgba(7,_65,_210,_0.1)_0px_10px_32px]">
                <CardHeader className="items-center lg:justify-center order-2">
                    <img
                        className="w-52 h-52 lg:w-[30rem] lg:h-[30rem]"
                        src={"/auth.png"}
                        alt="serene-header"
                    />
                </CardHeader>
                <CardContent className="my-2 order-1 w-5/6">
                    <h1 className="text-2xl text-gray-600 font-semibold py-6 text-left hidden lg:block">
                        Embark on the Journey: Sign Up Now!
                    </h1>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
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
                            {/* <Button className="bg-[#ea580c] rounded-lg w-full" type="submit">
                                Sign Up
                            </Button> */}
                            <Button className="rounded-lg w-full" type="submit">
                                Sign Up
                            </Button>
                        </form>
                    </Form>
                    <Separator orientation="horizontal" className="my-8" />
                    <Button className="w-full py-5" variant={"outline"}>
                        <img className="h-5 w-5 mx-4" src="/google.svg" alt="google" />
                        <p className="text-gray-700">Continue with Google</p>
                    </Button>
                    <CardFooter className="justify-center order-2 pt-6">
                        <h1 className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#186b66] font-medium">
                                Log In
                            </Link>
                        </h1>
                    </CardFooter>
                </CardContent>
            </Card>
        </section>
    );
}
