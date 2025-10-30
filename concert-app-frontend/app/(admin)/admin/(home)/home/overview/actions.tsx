"use server";

import { revalidatePath } from "next/cache";

export async function deleteConcert(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete concert");
  }

  // Revalidate overview page to refresh data
  revalidatePath("/admin/home/overview");
}
