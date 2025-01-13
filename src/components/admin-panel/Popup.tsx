import {setLoading} from "@/redux/features/loadingSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {makeToast} from "@/utils/helper";
import axios from "axios";
import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {IoIosCloseCircleOutline} from "react-icons/io";

interface PropsType {
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
}

const Popup = ({setOpenPopup, setUpdateTable}: PropsType) => {
  const productData = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const [inputData, setInputData] = useState({
    name: productData.name,
    category: productData.category,
    price: productData.price,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    axios
      .put(`/api/edit_product/${productData._id}`, inputData)
      .then((res) => {
        makeToast("Product Update Successfully!");
        setUpdateTable((prevState) => !prevState);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setLoading(false));
        setOpenPopup(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl py-8 px-6 rounded-lg shadow-lg relative">
        {/* Close Icon */}
        <IoIosCloseCircleOutline
          className="absolute text-3xl text-gray-600 top-4 right-4 cursor-pointer hover:text-red-600"
          onClick={() => setOpenPopup(false)}
        />

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Product
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              className="border border-gray-300 rounded-md w-full px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              type="text"
              placeholder="Enter product name"
              value={inputData.name}
              onChange={(e) =>
                setInputData({...inputData, name: e.target.value})
              }
              required
            />
          </div>

          {/* Product Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              className="border border-gray-300 rounded-md w-full px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              type="text"
              placeholder="Enter product category"
              value={inputData.category}
              onChange={(e) =>
                setInputData({...inputData, category: e.target.value})
              }
              required
            />
          </div>

          {/* Product Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              className="border border-gray-300 rounded-md w-full px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              type="number"
              placeholder="Enter product price"
              value={inputData.price}
              onChange={(e) =>
                setInputData({...inputData, price: e.target.value})
              }
              required
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-cyan-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-600 transition duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
