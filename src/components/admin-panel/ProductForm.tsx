"use client";

import {setLoading} from "@/redux/features/loadingSlice";
import {useAppDispatch} from "@/redux/hooks";
import {makeToast} from "@/utils/helper";
import {UploadButton} from "@/utils/uploadthing";
import axios from "axios";
import {error} from "console";
import Image from "next/image";
import React, {FormEvent, use, useState} from "react";
import {useDispatch} from "react-redux";

interface IPayload {
  imgSrc: null | string;
  fileKey: null | string;
  name: string;
  category: string;
  price: string;
}

const ProductForm = () => {
  const [payload, setPayload] = useState<IPayload>({
    imgSrc: null,
    fileKey: null,
    name: "",
    category: "",
    price: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(setLoading(true));

    axios
      .post("/api/add_product", payload)
      .then((res) => {
        makeToast("Product added Successfully");
        setPayload({
          imgSrc: null,
          fileKey: null,
          name: "",
          category: "",
          price: "",
        });
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <div>
      <form
        className="bg-white shadow-lg rounded-lg p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-800 text-start">
          Add New Product
        </h2>

        {/* <Image
          alt="product_image"
          className="max-h-[300px] w-auto object-contain rounded-md"
          src={payload.imgSrc ? payload.imgSrc : "/avatar.png"}
          width={800}
          height={500}
        /> */}

        {/* Product Image */}
        <div className="text-start">
          <Image
            alt="product_image"
            src={payload.imgSrc || "/bgupload.jpg"}
            width={800}
            height={500}
            className="max-h-[300px] w-auto object-contain rounded-md"
          />
        </div>

        {/* Upload Button */}
        <div className="justify-items-start">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Upload result:", res);
              if (res && res.length > 0) {
                setPayload({
                  ...payload,
                  imgSrc: res[0]?.url,
                  fileKey: res[0]?.key,
                });
              } else {
                console.error("No files uploaded");
              }
            }}
            onUploadError={(error: Error) => {
              console.log(`Error! ${error}`);
            }}
          />
        </div>

        {/* <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        /> */}

        {/* <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log(res);
            setIsUploading(false);
            setPayload({
              ...payload,
              imgSrc: res[0]?.url,
              fileKey: res[0]?.key,
            });
          }}
          onUploadError={(error: Error) => {
            console.log(`Error! ${error}`);
            setIsUploading(false);
          }}
          onUploadProgress={() => setIsUploading(true)}
        /> */}

        {/* product name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            className="bg-gray-100 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={payload.name}
            onChange={(e) => setPayload({...payload, name: e.target.value})}
            placeholder="Enter product name"
            required
          />
        </div>

        {/* product category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Category
          </label>
          <input
            type="text"
            className="bg-gray-100 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={payload.category}
            onChange={(e) => setPayload({...payload, category: e.target.value})}
            placeholder="Enter product category"
            required
          />
        </div>

        {/* product price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Price
          </label>
          <input
            type="number"
            className="bg-gray-100 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={payload.price}
            onChange={(e) => setPayload({...payload, price: e.target.value})}
            placeholder="Enter product price"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-cyan-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-600 transition duration-200"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
