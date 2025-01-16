"use client";

import { getSupabaseBrowserClient } from "@/supabase-utils/browserClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Tickets = () => {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  return (
    <div>
      tickets
      <Link
        role="button"
        href="/logout"
        prefetch={false}
        onClick={(event) => {
          event.preventDefault();
          supabase.auth.signOut().then(() => {
            router.push("/");
          });
        }}
      >
        Log out
      </Link>
    </div>
  );
};

export default Tickets;

// this type of logout functionality should not be encouraged as incase of multiple logout we will have to multiple redirect

// there should be an client component that is avialable on all pages that can grab the logout event no matter the page

// basically it should subscribe to an event from supabase telling us that a logut has happened and you need to unscribe it
