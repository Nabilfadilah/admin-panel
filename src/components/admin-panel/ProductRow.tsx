import {IProduct} from "@/app/admin/dashboard/page";
import {setLoading} from "@/redux/features/loadingSlice";
import {setProduct} from "@/redux/features/productSlice";
import {useAppDispatch} from "@/redux/hooks";
import {makeToast} from "@/utils/helper";
import axios from "axios";
import Image from "next/image";
import {SetStateAction, Dispatch} from "react";
import {CiEdit} from "react-icons/ci";
import {RiDeleteBin5Fill} from "react-icons/ri";

interface PropsType {
  srNo: number;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
}

const ProductRow = ({
  srNo,
  setOpenPopup,
  setUpdateTable,
  product,
}: PropsType) => {
  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(setProduct(product));
    setOpenPopup(true);
  };

  const onDelete = () => {
    dispatch(setLoading(true));

    const payload = {
      fileKey: product.fileKey,
    };

    axios
      .delete("/api/uploadthing", {data: payload})
      .then((res) => {
        console.log(res.data);

        axios
          .delete(`/api/delete_product/${product._id}`)
          .then((res) => {
            console.log(res.data);
            makeToast("Product deleted Successfully");
            setUpdateTable((prevState) => !prevState);
          })
          .catch((err) => console.log(err))
          .finally(() => dispatch(setLoading(false)));
      })
      .catch((err) => console.log(err));
  };

  return (
    <tr className="hover:bg-gray-100 transition-colors">
      <td className="py-3 px-6 border-b border-gray-300">
        <div>{srNo}.</div>
      </td>
      <td className="py-3 px-6 border-b border-gray-300">
        <div>{product.name}</div>
      </td>
      <td className="py-3 px-6 border-b border-gray-300">$ {product.price}</td>
      <td className="py-3 px-6 border-b border-gray-300">
        <Image
          src={product.imgSrc || "/path/to/default_image.jpg"}
          width={40}
          height={40}
          alt="product_image"
          className="rounded-md border border-gray-200"
        />
      </td>
      <td className="py-3 px-6 border-b border-gray-300">
        <div className="text-xl flex items-center gap-4">
          <CiEdit
            className="cursor-pointer text-blue-600 hover:text-blue-800"
            onClick={onEdit}
          />
          <RiDeleteBin5Fill
            className="cursor-pointer text-red-600 hover:text-red-800"
            onClick={onDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
