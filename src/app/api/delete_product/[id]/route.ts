import Product from "@/libs/models/Product";
import { connectMongoDB } from "@/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, URLParams: any) {
  try {

    const id = URLParams.params.id;

    console.log("Connecting to MongoDB...");
    await connectMongoDB();

    await Product.findByIdAndDelete(id);

    return NextResponse.json({msg: "Product Deleted Successfully"});
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
