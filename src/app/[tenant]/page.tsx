import { LoginForm } from "@/components/login-form";
import { getSupabaseAdminClient } from "@/supabase-utils/adminClient";
import React from "react";
import { Tables } from "../../../supabase/supabase";

type SearchParams = { magicLink: string };
type Params = { tenant: Tables<"tenants"> };

export default async function Home({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: Params;
}) {
  const supabaseAdmin = getSupabaseAdminClient();

  const { tenant } = await params;

  const { data } = await supabaseAdmin
    .from("tenants")
    .select("*")
    .eq("id", tenant)
    .single();

  console.log({ data });

  const { magicLink } = await searchParams;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm isPasswordLogin={magicLink !== "yes"} />
      </div>
    </div>
  );
}
