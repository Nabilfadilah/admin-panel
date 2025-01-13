import React from "react";

const Hero = () => {
  return (
    <div className="bg-[#E3EDF6]">
      <div className="container grid md:grid-cols-2 py-8">
        <div className="flex items-center">
          <div className="max-w-[450px] space-y-4">
            <p className="text-topHeadingSecondary">
              Dimulai dari <span className="font-bold">Rp 99.000</span>
            </p>

            <h1 className="text-topHeadingPrimary font-bold text-4xl md:text-5xl">
              Koleksi produk terbaik 2025
            </h1>

            <h3 className="text-xl font-['Oregano', cursive]">
              Penawaran eksklusif <span>diskon 10%</span> minggu ini
            </h3>

            <a
              className="inline-block bg-cyan-900 text-white font-semibold rounded-md px-6 py-3 hover:bg-white hover:text-black"
              href="#"
            >
              Belanja Sekarang
            </a>
          </div>
        </div>

        <div>
          <img
            className="ml-auto w-[390px] h-[390px]"
            src="/hero.png"
            alt="hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
