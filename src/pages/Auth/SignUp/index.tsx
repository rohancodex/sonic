import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ENV } from "@/lib/env";
import { getURL } from "@/lib/utils";

import CreateUserForm from "./CreateUserForm";
import { ICreateUser } from "./helper";

const supabase = createClient(ENV.VITE_SUPABASE_APP_URL, ENV.VITE_SUPABASE_SECRET);

export default function Signup() {
    const { toast } = useToast();
    const navigate = useNavigate();

    const onSubmit = async (values: ICreateUser) => {
        const { error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
                data: {
                    full_name: values.full_name,
                },
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
                        Embark on the musical Journey: Sign Up Now!
                    </h1>
                    <CreateUserForm onSubmit={onSubmit} />
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
                        <h4 className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/" className="text-[#186b66] font-medium">
                                Log In
                            </Link>
                        </h4>
                    </CardFooter>
                </CardContent>
            </Card>
        </section>
    );
}
