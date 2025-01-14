import { NextRequest } from "next/server";
import { getSupabaseReqresClient } from "./supabase-utils/reqResClient";

export async function middleware(request: NextRequest) {
  const { supabase, response } = getSupabaseReqresClient({ request });
  // we are just asking supabase here to retrieve the session,by only doing it will also refresh the session if expired.
  await supabase.auth.getSession();

  return response.value;
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};
