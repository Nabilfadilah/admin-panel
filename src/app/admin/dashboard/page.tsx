"use client";

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
      <h2 className="text-3xl">All Products</h2>

      <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
        <table className="min-w-full border-collapse border border-gray-200 bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="py-3 px-4 border-b border-x border-gray-200 text-left">
                SR No.
              </th>
              <th className="py-3 px-4 border-b border-x border-gray-200 text-left">
                Name
              </th>
              <th className="py-3 px-4 border-b border-x border-gray-200 text-left">
                Price
              </th>
              <th className="py-3 px-4 border-b border-x border-gray-200 text-left">
                Picture
              </th>
              <th className="py-3 px-4 border-b border-x border-gray-200 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
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

      {/* {openPopup && (
        <Popup setOpenPopup={setOpenPopup} setUpdateTable={setUpdateTable} />
      )} */}
    </div>
  );
};

export default Dashboard;
