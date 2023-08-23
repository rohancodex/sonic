import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ENV } from "@/lib/env";
import { getURL } from "@/lib/utils";

import { ILoginUser } from "./helper";
import LoginUserForm from "./LoginUserForm";

const supabase = createClient(ENV.VITE_SUPABASE_APP_URL, ENV.VITE_SUPABASE_SECRET);

export default function Login() {
    const { toast } = useToast();
    const navigate = useNavigate();

    const onSubmit = async (values: ILoginUser) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        });

        if (error) {
            toast({
                title: "Whoops! Something went wrong",
                description: error.message,
            });
            return;
        }
        return navigate("/");
    };

    const handleOAuth = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: getURL(),
            },
        });
        if (error) {
            toast({
                title: "Whoops! Something went wrong",
                description: error.message,
            });
            return;
        }
        return navigate("/");
    };

    return (
        <section className="flex justify-center lg:container lg:items-center lg:h-screen">
            <Card className="w-5/6 lg:p-8 lg:grid lg:grid-cols-2 shadow-[rgba(7,_65,_210,_0.1)_0px_10px_32px]">
                <CardHeader className="items-center order-2 lg:justify-center">
                    <img
                        className="w-52 h-52 lg:w-[30rem] lg:h-[30rem]"
                        src={"/auth.png"}
                        alt="serene-header"
                    />
                </CardHeader>
                <CardContent className="order-1 w-5/6 mx-auto my-2">
                    <h1 className="py-6 text-2xl font-semibold text-left text-gray-600 lg:block">
                        Continue listening! Just a step away
                    </h1>
                    <LoginUserForm onSubmit={onSubmit} />
                    <Separator orientation="horizontal" className="my-8" />
                    <Button
                        onClick={handleOAuth}
                        className="w-full py-8"
                        variant={"outline"}
                    >
                        <img className="w-5 h-5 mx-4" src="/google.svg" alt="google" />
                        <p className="text-gray-700">Continue with Google</p>
                    </Button>
                    <CardFooter className="justify-center order-2 pt-6">
                        <h1 className="text-sm text-gray-600">
                            {"Don't have an account? "}
                            <Link to="/signup" className="text-[#186b66] font-medium">
                                Sign Up
                            </Link>
                        </h1>
                    </CardFooter>
                </CardContent>
            </Card>
        </section>
    );
}
