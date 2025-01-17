import { NextRequest, NextResponse } from "next/server";
import { getSupabaseReqresClient } from "./supabase-utils/reqResClient";

export async function middleware(request: NextRequest) {
  const { supabase, response } = getSupabaseReqresClient({ request });

  const session = await supabase.auth.getSession();
  const sessionUser = session?.data?.session?.user;
  const requestedPath = request.nextUrl.pathname;

  if (requestedPath.startsWith("/tickets")) {
    if (!sessionUser) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (requestedPath === "/") {
    if (sessionUser) {
      return NextResponse.redirect(new URL("/tickets", request.url));
    }
  }

  return response.value;
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};

// getSesssion() can be manipulated as it is not encrypted and parses data from the cookie ,so should not be trusted

//Although it can be used in middleware as it is just redirecting currently and it is much faster than getUser() that involves an addition api request
