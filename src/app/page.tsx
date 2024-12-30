"use client";

import Cart from "@/components/front-end/Cart";
import Feature from "@/components/front-end/Feature";
import Hero from "@/components/front-end/Hero";
import Navbar from "@/components/front-end/Navbar";
import {useState} from "react";

export default function Home() {
  const [showCart, setShowCart] = useState(false);

  return (
    <main>
      <Navbar setShowCart={setShowCart} />
      {showCart && <Cart setShowCart={setShowCart} />}
    </main>
  );
}
