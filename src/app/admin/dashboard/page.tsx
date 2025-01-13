"use client";

import Popup from "@/components/admin-panel/Popup";
import ProductRow from "@/components/admin-panel/ProductRow";
import {setLoading} from "@/redux/features/loadingSlice";
import {useAppDispatch} from "@/redux/hooks";
import axios from "axios";
import React, {useEffect, useState} from "react";

export interface IProduct {
  _id: string;
  imgSrc: string;
  fileKey: string;
  name: string;
  price: string;
  category: string;
}

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    axios
      .get("/api/get_products")
      .then((res) => {
        console.log(res.data); // Debug log
        setProducts(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  }, [updateTable]);
  console.log(products); // Debug data produk sebelum mapping

  return (
    <div className="bg-white h-[calc(100vh-96px)] rounded-lg p-4">
      <p className="text-xl from-neutral-900">All Products</p>

      <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
        <table className="min-w-full table-auto border border-gray-300 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm font-medium">
            <tr>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                No.
              </th>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                Name
              </th>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                Price
              </th>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                Picture
              </th>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {products.map((product: IProduct, index) => (
              <ProductRow
                key={product._id}
                srNo={index + 1}
                setOpenPopup={setOpenPopup}
                setUpdateTable={setUpdateTable}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>

      {openPopup && (
        <Popup setOpenPopup={setOpenPopup} setUpdateTable={setUpdateTable} />
      )}
    </div>
  );
};

export default Dashboard;
