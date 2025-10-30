"use server";

import { revalidatePath } from "next/cache";

export async function reserveConcert(concertId: number) {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations/1/${concertId}`,
    {
      method: "POST",
    },
  );
  revalidatePath("/user");
}

export async function cancelReservation(reservationId: number) {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations/cancel/${reservationId}`,
    {
      method: "POST",
    },
  );
  revalidatePath("/user");
}
