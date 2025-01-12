"use client";

import { LoginForm } from "@/components/login-form";
import React from "react";

type Params = Promise<{ magicLink: string }>;

export default function Home({ searchParams }: { searchParams: Params }) {
  const { magicLink } = React.use(searchParams);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm isPasswordLogin={magicLink !== "yes"} />
      </div>
    </div>
  );
}
