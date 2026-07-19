import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type Direction = "up" | "down";

/**
 * Moves one row up or down within a table ordered by `ordem`.
 *
 * The `ordem` values in these tables were never maintained by the admin, so
 * they are often all zero and their relative order comes from the secondary
 * sort. Rather than trusting them, this renumbers every row sequentially in
 * the order the admin currently displays, then swaps the target with its
 * neighbour. Lists here are small (tens of rows), so rewriting all of them is
 * cheaper than the bugs that partial renumbering would cause.
 */
export async function moveRow(
  table: "noticias" | "destaques" | "certificacoes",
  id: string,
  direction: Direction,
  secondarySort?: { column: string; ascending: boolean }
): Promise<void> {
  let query = supabaseAdmin.from(table).select("id").order("ordem", { ascending: true });
  if (secondarySort) {
    query = query.order(secondarySort.column, { ascending: secondarySort.ascending });
  }
  const { data, error } = await query;
  if (error) throw error;

  const ids = (data ?? []).map((row) => row.id as string);
  const from = ids.indexOf(id);
  if (from === -1) return;

  const to = direction === "up" ? from - 1 : from + 1;
  if (to < 0 || to >= ids.length) return;

  [ids[from], ids[to]] = [ids[to], ids[from]];

  const updates = ids.map((rowId, index) =>
    supabaseAdmin.from(table).update({ ordem: index + 1 }).eq("id", rowId)
  );
  const results = await Promise.all(updates);
  const failed = results.find((result) => result.error);
  if (failed?.error) throw failed.error;
}
