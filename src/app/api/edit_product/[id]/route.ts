import Product from "@/libs/models/Product";
import { connectMongoDB } from "@/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, URLParams: any) {
  try {

    const body = await request.json();
    const id = URLParams.params.id;
    const {name, category, price} = body;


    console.log("Connecting to MongoDB...");
    await connectMongoDB();

    console.log("Update products...");
    const data = await Product.findByIdAndUpdate(id, {
        name,
        category,
        price,
    });

    console.log("Products update fetched:", data);
    return NextResponse.json({msg: "Update Successfully", data});
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
