"use client";

import { useState } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { cn } from "@/utils/utils";
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
import { type SignUpForm, signUpForm } from "@/validations/auth";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
  const [passVisible, setPassVisible] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  });

  const { mutate: signUpMutation, isLoading } = useMutation(["signUp"], {
    mutationFn: async (payload: SignUpForm) => {
      await axios.post("/api/auth/signup", payload);
    },

    onSuccess: () => {
      toast({
        title: "Email sent",
        className: "text-primary",
      });

      router.refresh();
      reset();
    },

    onError: (err) => {
      console.error(err);
      if (err instanceof AxiosError) {
        toast({
          title: err.response?.status.toString(),
          description: err.response?.data,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong.",
          variant: "destructive",
        });
      }
      reset();
    },
  });

  return (
    <div className="m-auto flex max-w-full items-center justify-center md:min-h-screen">
      <Card className="m-auto h-screen w-screen space-y-4 rounded-none md:h-full md:w-[450px] md:rounded-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl md:text-2xl">
            Create an account
          </CardTitle>
          <CardDescription>SignUp to start your music journey</CardDescription>
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
        <form onSubmit={handleSubmit((formData) => signUpMutation(formData))}>
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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="paul"
                className="h-11 md:h-9"
                {...register("username")}
              />
              <span
                className={
                  errors.username?.message
                    ? cn("ml-2 text-xs text-destructive")
                    : cn("hidden")
                }
              >
                {errors.username?.message}
              </span>
            </div>
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
              disabled={isLoading}
              className="inline-flex w-full items-center gap-x-1.5 py-5 text-base md:py-4 md:text-sm"
              type="submit"
            >
              Create account
              {isLoading && <Loader2 size={19} className="animate-spin" />}
            </Button>
            <span className="text-sm">
              Already have an account?{" "}
              <Link className="underline" href="/login">
                Login here
              </Link>
            </span>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
