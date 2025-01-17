"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRef } from "react";
import { getSupabaseBrowserClient } from "@/supabase-utils/browserClient";
import { useRouter } from "next/navigation";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  isPasswordLogin?: boolean;
}

export function LoginForm({
  className,
  isPasswordLogin,
  ...props
}: LoginFormProps) {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              if (isPasswordLogin) {
                supabase.auth
                  .signInWithPassword({
                    email: emailInputRef.current?.value as string,
                    password: passwordInputRef.current?.value as string,
                  })
                  .then((result) => {
                    if (result?.data?.user) {
                      // alert(`${result?.data?.user.email} signed in`);
                      router.push("/tickets");
                    } else {
                      alert("could not signed in");
                    }
                  });
              }
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  ref={emailInputRef}
                  required
                />
              </div>
              {isPasswordLogin && (
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    ref={passwordInputRef}
                    required
                  />
                </div>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
              {isPasswordLogin ? (
                <Link href={{ pathname: "/", query: { magicLink: "yes" } }}>
                  {" "}
                  <Button variant="outline" className="w-full">
                    Prefer Magiclink ?
                  </Button>
                </Link>
              ) : (
                <Link href={{ pathname: "/", query: { magicLink: "no" } }}>
                  {" "}
                  <Button variant="outline" className="w-full">
                    Prefer Password ?
                  </Button>
                </Link>
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
