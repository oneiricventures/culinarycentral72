// Ensures the single front-desk auth account exists.
// The password is read from the FRONTDESK_PASSWORD secret — never hardcoded.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FRONTDESK_EMAIL = "frontdesk@skylightsuites.app";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const password = Deno.env.get("FRONTDESK_PASSWORD");
    if (!password) {
      return new Response(
        JSON.stringify({ ok: false, error: "FRONTDESK_PASSWORD secret not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (listErr) throw listErr;
    let user = list.users.find((u) => u.email?.toLowerCase() === FRONTDESK_EMAIL);

    let created = false;
    if (!user) {
      const { data: createRes, error: createErr } = await admin.auth.admin.createUser({
        email: FRONTDESK_EMAIL,
        password,
        email_confirm: true,
      });
      if (createErr) throw createErr;
      user = createRes.user;
      created = true;
    }

    // Ensure staff role is assigned so RLS policies grant access.
    if (user) {
      const { error: roleErr } = await admin
        .from("user_roles")
        .upsert({ user_id: user.id, role: "staff" }, { onConflict: "user_id,role" });
      if (roleErr) throw roleErr;
    }

    return new Response(JSON.stringify({ ok: true, created }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String((e as Error).message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
