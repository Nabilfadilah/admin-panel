import {useAppSelector} from "@/redux/hooks";
import React, {Dispatch, SetStateAction} from "react";
import {RxCross1} from "react-icons/rx";
import CartProduct from "./CartProduct";
import {IoIosCloseCircleOutline} from "react-icons/io";
import {FaShoppingCart} from "react-icons/fa";
import {IoBagCheckOutline} from "react-icons/io5";

interface PropsType {
  setShowCart: Dispatch<SetStateAction<boolean>>;
}

const Cart = ({setShowCart}: any) => {
  const products = useAppSelector((state) => state.cartReducer);

  const getTotal = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const total = getTotal();

  return (
    <div className="bg-slate-900/50 w-full min-h-screen fixed left-0 top-0 z-20 overflow-y-scroll">
      <div className="max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6">
        <IoIosCloseCircleOutline
          className="absolute text-3xl text-gray-600 top-4 right-4 cursor-pointer hover:text-red-600"
          onClick={() => setShowCart(false)}
        />
        <h3 className="pt-6 text-lg font-medium text-gray-600 uppercase">
          Keranjang Anda
        </h3>

        <div className="mt-6 space-y-2">
          {products?.map((item: any) => (
            <CartProduct
              key={item.id}
              id={item.id}
              img={item.img}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>

        <div className="flex justify-between items-center font-medium text-xl py-4">
          <p>Total:</p>
          <p>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(Number(total))}
          </p>
        </div>

        <button className="bg-cyan-900 text-white font-semibold text-center w-full rounded-3xl py-2 hover:bg-cyan-800 mb-4 mt-4 flex items-center justify-center gap-2">
          <FaShoppingCart />
          <span>View Cart</span>
        </button>

        <button className="bg-cyan-900 text-white font-semibold text-center w-full rounded-3xl py-2 hover:bg-cyan-800 mb-4 mt-4 flex items-center justify-center gap-2">
          <IoBagCheckOutline />
          <span>CheckOut</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
