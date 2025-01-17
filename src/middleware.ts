import { NextRequest, NextResponse } from "next/server";
import { getSupabaseReqresClient } from "./supabase-utils/reqResClient";

export async function middleware(request: NextRequest) {
  const { supabase, response } = getSupabaseReqresClient({ request });

  const session = await supabase.auth.getSession();
  const sessionUser = session?.data?.session?.user;
  const requestedPath = request.nextUrl.pathname;

  const [tenant, ...restofPath] = requestedPath.substring(1).split("/");
  const applicationPath = "/" + restofPath.join("/");

  if (!/[a-z0-9-_]+/.test(tenant)) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  if (requestedPath.startsWith("/tickets")) {
    if (!sessionUser) {
      return NextResponse.redirect(new URL(`/${tenant}`, request.url));
    }
  } else if (applicationPath === "/") {
    if (sessionUser) {
      return NextResponse.redirect(new URL(`/${tenant}/tickets`, request.url));
    }
  }

  return response.value;
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};

// getSesssion() can be manipulated as it is not encrypted and parses data from the cookie ,so should not be trusted

//Although it can be used in middleware as it is just redirecting currently and it is much faster than getUser() that involves an addition api request
