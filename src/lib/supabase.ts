import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !anonKey) {
  console.warn("Supabase non configuré : renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env");
}

export const supabase = createClient(url, anonKey);

// Helpers communs ------------------------------------------------------------
export async function fetchActive<T = any>(table: string, orderBy = "position"): Promise<T[]> {
  const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending: true });
  if (error) { console.error(`fetch ${table}`, error); return []; }
  return (data as T[]) || [];
}

export async function fetchContent(sectionKey: string): Promise<any | null> {
  const { data, error } = await supabase
    .from("site_content").select("content").eq("section_key", sectionKey).maybeSingle();
  if (error) { console.error(`content ${sectionKey}`, error); return null; }
  return data?.content ?? null;
}
