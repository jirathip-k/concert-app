import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, concertId, action } = await req.json();
  // const formData = await req.formData();
  // const userId = formData.get("userId")?.toString();
  // const concertId = formData.get("concertId")?.toString();

  if (!userId || !concertId) {
    return NextResponse.json(
      { error: "Missing userId or concertId" },
      { status: 400 },
    );
  }

  try {
    // Make the fetch request to the external API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          concertId,
          action,
        }),
      },
    );

    // Check if the external API request was successful
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error response from external API:", errorMessage);
      return NextResponse.json(
        { error: "Failed to reserve concert" },
        { status: 500 },
      );
    }

    // Optional: Log the external API response body to debug
    const responseBody = await response.json();
    console.log("External API Response:", responseBody);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error during fetch:", error);
    return NextResponse.json(
      { error: "Server error while processing reservation" },
      { status: 500 },
    );
  }
}
