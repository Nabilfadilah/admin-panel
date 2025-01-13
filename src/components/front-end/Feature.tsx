import React from "react";
import {MdSupportAgent} from "react-icons/md";
import {RiRefund2Fill} from "react-icons/ri";
import {TbDiscount, TbTruckDelivery} from "react-icons/tb";
import FeatureCard from "./FeatureCard";

const data = [
  {
    icon: <TbTruckDelivery className="text-4xl" />,
    title: "Pengiriman Gratis",
    desc: "Pesan dari semua item",
  },
  {
    icon: <RiRefund2Fill className="text-4xl" />,
    title: "Pengembalian Dana",
    desc: "Jaminan uang kembali",
  },
  {
    icon: <TbDiscount className="text-4xl" />,
    title: "Diskon Member",
    desc: "Pesanan lebih dari Rp 99.000",
  },
  {
    icon: <MdSupportAgent className="text-4xl" />,
    title: "Respon Cepat",
    desc: "Hubungi kami",
  },
];

const Feature = () => {
  return (
    <div className="container grid gap-1 sm:grid-cols-2 lg:grid-cols-4 mt-8 text-white">
      {data.map((item) => (
        <FeatureCard
          key={item.title}
          icon={item.icon}
          title={item.title}
          desc={item.desc}
        />
      ))}
    </div>
  );
};

export default Feature;
