"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import ContactBox from "./_components/contactbox";
import LicenseSearchModal from "./_components/search-modal";

const cards = [
  {
    title: "กรุงเทพประกันภัย",
    imgname: "bkl.png",
  },
  {
    title: "MSIG ประกันภัย",
    imgname: "msig.png",
  },
  {
    title: "รู้ใจประกันภัย",
    imgname: "roojai.png",
  },
  {
    title: "ธนชาตประกันภัย",
    imgname: "tanapagun.png",
  },
  {
    title: "ไทยพิวัฒน์ประกันภัย",
    imgname: "thaipiwat.png",
  },
  {
    title: "ทิพยประกันภัย",
    imgname: "tippagun.png",
  },
  {
    title: "วิริยะประกันภัย",
    imgname: "weeraya.png",
  },
];

export default function LandingPage() {
  const repeatedCards = [...cards, ...cards];
  return (
    <div
      className="min-h-screen relative "
      onMouseMove={(e) => {
        document.documentElement.style.setProperty("--x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--y", `${e.clientY}px`);
      }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="aurora-bg"></div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="relative text-center min-h-screen mb-12 flex flex-col justify-center overflow-hidden">
          <div className="relative z-10">
            <Image
              src="/assets/images/aimlogo.svg"
              alt="AIM Logo"
              width={300}
              height={100}
              className="mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold mb-4">
              ร้านภาษี พรบ ประกันภัย จ๊อกกี้
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              บริการครบวงจรด้านภาษีและทะเบียนรถ ด้วยประสบการณ์กว่า 10 ปี
            </p>
            <div className="flex justify-center mt-4">
              <LicenseSearchModal />
            </div>
          </div>
          <div className="w-full p-6 mt-10">
            <Marquee
              speed={100}
              pauseOnHover={true}
              gradient={false}
              direction="left"
            >
              <div className="flex h-auto overflow-y-hidden">
                {repeatedCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="relative group  w-[200px] mr-8 h-[200px] overflow-hidden rounded-2xl shrink-0   hover:border-white/30 transition-all duration-300 hover:scale-105"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/file/authorized/file/${card.imgname}`}
                      alt={card.title}
                      fill
                      className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center px-4 rounded-2xl">
                      <h3 className="text-white text-lg font-semibold drop-shadow-md">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </div>
        <ContactBox />
      </div>
    </div>
  );
}
