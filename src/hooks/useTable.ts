import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

// Hook générique de CRUD sur une table, avec rechargement.
export function useTable<T = any>(table: string, orderBy = "position") {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending: true });
    if (error) console.error(`load ${table}`, error);
    setRows((data as T[]) || []);
    setLoading(false);
  }, [table, orderBy]);

  useEffect(() => { reload(); }, [reload]);

  const insert = async (vals: any) => { const { error } = await supabase.from(table).insert(vals); if (error) { console.error(error); return false; } await reload(); return true; };
  const update = async (id: string, vals: any) => { const { error } = await supabase.from(table).update(vals).eq("id", id); if (error) { console.error(error); return false; } await reload(); return true; };
  const remove = async (id: string) => { const { error } = await supabase.from(table).delete().eq("id", id); if (error) { console.error(error); return false; } await reload(); return true; };

  return { rows, loading, reload, insert, update, remove };
}
