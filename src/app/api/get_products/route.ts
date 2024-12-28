import Product from "@/libs/models/Product";
import { connectMongoDB } from "@/libs/MongoConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Connecting to MongoDB...");
    await connectMongoDB();

    console.log("Fetching products...");
    const data = await Product.find();

    console.log("Products fetched:", data);
    return NextResponse.json(data);
  } catch (error) {
    let errorMessage = "Unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error occurred:", errorMessage);
    return NextResponse.json(
      { error: errorMessage, msg: "Something Went Wrong" },
      { status: 400 }
    );
  }
}
