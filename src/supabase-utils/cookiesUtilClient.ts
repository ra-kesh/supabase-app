import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const getSupabaseCookiesUtilClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANNON_KEY as string,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToset) {
          try {
            cookiesToset.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            console.error("failed to set cookies", error);
          }
        },
      },
    }
  );
};
