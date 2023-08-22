import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ENV } from "@/lib/env";

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
                        Continue listening! Just a step away
                    </h1>
                    <LoginUserForm onSubmit={onSubmit} />
                    <Separator orientation="horizontal" className="my-8" />
                    <Button
                        onClick={handleOAuth}
                        className="w-full py-5"
                        variant={"outline"}
                    >
                        <img className="h-5 w-5 mx-4" src="/google.svg" alt="google" />
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
