import Country from "@/models/countryModels";
import connectDB from "@/libs/mongoose";
export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  try {
    const countries = await Country.find();
    return Response.json(countries);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch countries." }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const country = await Country.create(body);
    return new Response(JSON.stringify(country), { status: 201 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to create country." }),
      {
        status: 400,
      }
    );
  }
}
