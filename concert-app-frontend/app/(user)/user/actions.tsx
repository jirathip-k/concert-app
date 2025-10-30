"use server";

import { revalidatePath } from "next/cache";

export async function reserveConcert(
  userId: number,
  concertId: number,
  action: string,
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      concertId,
      action,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text(); // or res.json() if the server sends a JSON error response
    throw new Error(`Failed to reserve concert: ${errorText}`);
  }

  // Revalidate overview page to refresh data
  revalidatePath("/user");
}
