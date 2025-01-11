import { NextRequest } from "next/server";
import { getSupabaseReqresClient } from "./supabase-utils/reqResClient";

export async function middleware(request: NextRequest) {
  const { response } = getSupabaseReqresClient({ request });
  return response.value;
}
