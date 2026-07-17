// Ensures the single front-desk auth account exists.
// Safe to call publicly: it only creates one specific email if missing.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FRONTDESK_EMAIL = "frontdesk@skylightsuites.app";
const FRONTDESK_PASSWORD = "skylight2025";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    // Check if user exists via listUsers (paginated but small)
    const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (listErr) throw listErr;
    const existing = list.users.find((u) => u.email?.toLowerCase() === FRONTDESK_EMAIL);

    if (!existing) {
      const { error: createErr } = await admin.auth.admin.createUser({
        email: FRONTDESK_EMAIL,
        password: FRONTDESK_PASSWORD,
        email_confirm: true,
      });
      if (createErr) throw createErr;
      return new Response(JSON.stringify({ ok: true, created: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, created: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String((e as Error).message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
