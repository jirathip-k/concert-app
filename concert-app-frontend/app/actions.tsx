"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      role,
    }),
  });
  const user = await res.json();
  console.log(user);

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  // Redirect based on user role
  if (role === "admin") {
    redirect("/admin/home");
  } else {
    redirect(`/user/${user.id}`);
  }
}
