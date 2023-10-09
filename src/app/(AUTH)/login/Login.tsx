"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Loader2 } from "lucide-react";
import { EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignInForm, signInForm } from "@/validations/auth";
import { Spinner } from "@/components/extras/Loadings";
import { cn } from "@/utils/utils";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const [passVisible, setPassVisible] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });

  const onSubmit = async (formData: SignInForm) => {
    try {
      const res = await signIn("credentials", {
        ...formData,
        redirect: false,
      });

      if (!res?.error) router.push("/");

      if (res?.error) {
        toast({
          variant: "destructive",
          title: "Invalid credentials",
        });
      }

      router.refresh();
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="m-auto flex items-center justify-center md:min-h-screen">
      <Card className="m-auto h-screen w-screen space-y-4 rounded-none md:h-full md:w-[450px] md:rounded-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl md:text-2xl">
            Login to Melodify
          </CardTitle>
          <CardDescription>SignIn to continue</CardDescription>
        </CardHeader>
        <CardContent className="w-full py-0">
          <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            variant="outline"
            className="h-11 w-full text-lg md:h-9 md:text-base"
          >
            <i className="ri-google-line mr-2 inline-flex h-4 w-4 items-center justify-center text-xl font-extrabold md:text-lg" />
            Google
          </Button>
        </CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <section className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </section>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="paul@example.com"
                className="h-11 md:h-9"
                {...register("email")}
              />
              <span
                className={
                  errors.email?.message
                    ? cn("ml-2 text-xs text-destructive")
                    : cn("hidden")
                }
              >
                {errors.email?.message}
              </span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <span className="relative flex items-center">
                <Input
                  id="password"
                  type={passVisible ? "text" : "password"}
                  className="h-11 md:h-9"
                  {...register("password")}
                />
                {!passVisible ? (
                  <Eye
                    size={20}
                    className="absolute right-3 cursor-pointer"
                    onClick={() => setPassVisible(!passVisible)}
                  />
                ) : (
                  <EyeOff
                    size={20}
                    className="absolute right-3 cursor-pointer"
                    onClick={() => setPassVisible(!passVisible)}
                  />
                )}
              </span>
              <span
                className={
                  errors.password?.message
                    ? cn("ml-2 text-xs text-destructive")
                    : cn("hidden")
                }
              >
                {errors.password?.message}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-y-4">
            <Button
              disabled={isSubmitting}
              className="inline-flex w-full items-center gap-x-1.5 py-5 text-base md:py-4 md:text-sm"
              type="submit"
            >
              Login
              {isSubmitting && <Loader2 size={19} className="animate-spin" />}
            </Button>
            <span className="text-sm">
              Don&apos;t have an account?{" "}
              <Link className="underline" href="/signup">
                SignUp
              </Link>
            </span>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
