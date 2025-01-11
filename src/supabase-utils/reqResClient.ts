import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export const getSupabaseReqresClient = ({
  request,
}: {
  request: NextRequest;
}) => {
  const response = {
    value: NextResponse.next({ request: request }),
  };

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToset) {
          cookiesToset.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response.value = NextResponse.next({ request });

          cookiesToset.forEach(({ name, value, options }) => {
            response.value.cookies.set(name, value, options);
          });
        },
      },
    }
  );
  return { supabase, response };
};
