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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* <Image
          alt="product_image"
          className="max-h-[300px] w-auto object-contain rounded-md"
          src={payload.imgSrc ? payload.imgSrc : "/avatar.png"}
          width={800}
          height={500}
        /> */}

        <Image
          alt="product_image"
          src={payload.imgSrc || "/avatar.png"}
          width={800}
          height={500}
          className="max-h-[300px] w-auto object-contain rounded-md"
        />

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
          <label className="block ml-1 font-bold">Product Name</label>
          <input
            type="text"
            className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
            value={payload.name}
            onChange={(e) => setPayload({...payload, name: e.target.value})}
            required
          />
        </div>

        {/* product category */}
        <div>
          <label className="block ml-1 font-bold">Product Category</label>
          <input
            type="text"
            className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
            value={payload.category}
            onChange={(e) => setPayload({...payload, category: e.target.value})}
            required
          />
        </div>

        {/* product price */}
        <div>
          <label className="block ml-1 font-bold">Product Price</label>
          <input
            type="text"
            className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
            value={payload.price}
            onChange={(e) => setPayload({...payload, price: e.target.value})}
            required
          />
        </div>

        <div className="flex justify-center">
          <button className="bg-pink text-white px-8 py-2 rounded-lg">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
