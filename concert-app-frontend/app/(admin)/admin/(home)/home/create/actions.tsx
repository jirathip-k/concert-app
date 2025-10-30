import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createConcert(formData: FormData) {
  "use server";

  const name = formData.get("concertName") as string;
  const description = formData.get("description") as string;
  const totalSeats = Number(formData.get("totalSeat"));

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      totalSeats,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create concert");
  }

  // Revalidate the overview page so it shows new data
  revalidatePath("/admin/home/overview");

  // Optionally redirect after creation
  redirect("/admin/home/overview");
}
