import Product from "@/libs/models/Product";
import {connectMongoDB} from "@/libs/MongoConnect";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {imgSrc, fileKey, name, category, price} = body;

    console.log("Connecting to MongoDB...");
    await connectMongoDB();

    console.log("Create products...");
    const data = await Product.create({
      imgSrc,
      fileKey,
      name,
      category,
      price,
    });

    console.log("Products add : ", data);
    return NextResponse.json({msg: "Product Added successfully", data});
  } catch (error) {
    let errorMessage = "Unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error occurred:", errorMessage);
    return NextResponse.json(
      {error: errorMessage, msg: "Something Went Wrong"},
      {status: 400}
    );
  }
}
