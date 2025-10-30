"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import ContactBox from "./_components/contactbox";
import LicenseSearchModal from "./_components/search-modal";
import { useEffect } from "react";
import { vehicleSearchGuestAction } from "@/actions/landing-action";

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

  useEffect(() => {
    const handleLoad = () => {
      const welcomeContainer = document.getElementById("welcome-message");
      if (welcomeContainer && welcomeContainer.children.length === 0) {
        const welcomeDiv = document.createElement("div");
        welcomeDiv.className =
          "bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mt-4 animate-fade-in";
        welcomeDiv.innerHTML = `
          <p class="text-blue-300 text-sm "> ยินดีต้อนรับสู่ระบบของเรา! หน้าเว็บโหลดเสร็จแล้ว</p>
        `;
        welcomeContainer.appendChild(welcomeDiv);
      }

      // const statsContainer = document.getElementById("stats-container");
      // if (statsContainer && statsContainer.children.length === 0) {
      //   const statsDiv = document.createElement("div");
      //   statsDiv.className = "grid grid-cols-3 gap-4 mt-6";
      //   statsDiv.innerHTML = `
      //     <div class="bg-purple-500/20 rounded-lg p-4 text-center">
      //       <h3 class="text-2xl font-bold text-purple-300">10+</h3>
      //       <p class="text-sm text-gray-400">ปีประสบการณ์</p>
      //     </div>
      //     <div class="bg-green-500/20 rounded-lg p-4 text-center">
      //       <h3 class="text-2xl font-bold text-green-300">5000+</h3>
      //       <p class="text-sm text-gray-400">ลูกค้า</p>
      //     </div>
      //     <div class="bg-orange-500/20 rounded-lg p-4 text-center">
      //       <h3 class="text-2xl font-bold text-orange-300">7</h3>
      //       <p class="text-sm text-gray-400">บริษัทพันธมิตร</p>
      //     </div>
      //   `;
      //   statsContainer.appendChild(statsDiv);
      // }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  const handleMouseEnterTitle = () => {
    const titleElement = document.getElementById("main-title");
    if (titleElement) {
      titleElement.style.color = "#fbbf24";
      titleElement.style.transform = "scale(1.05)";
      titleElement.style.transition = "all 0.3s ease";
    }
  };

  const handleMouseLeaveTitle = () => {
    const titleElement = document.getElementById("main-title");
    if (titleElement) {
      titleElement.style.color = "";
      titleElement.style.transform = "scale(1)";
    }
  };

  const handleLogoClick = () => {
    const logoContainer = document.getElementById("logo-container");
    if (logoContainer) {
      logoContainer.style.transform = "rotate(360deg)";
      logoContainer.style.transition = "transform 1s ease";

      setTimeout(() => {
        if (logoContainer) {
          logoContainer.style.transform = "rotate(0deg)";
        }
      }, 1000);
    }
  };

  const getServiceDisplayText = (serviceType: string): string => {
    if (serviceType === "carInsurance") {
      return "ประกัน";
    } else if (serviceType === "C_M_I") {
      return "พรบ.";
    } else if (serviceType === "vehicleTax") {
      return "ภาษีรถยนต์";
    }
    return serviceType;
  };

  const formatThaiDate = (dateString: string): string => {
    const date = new Date(dateString);
    const thaiMonths = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];

    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543;

    return `${day} ${month} ${year}`;
  };

  const getDaysRemaining = (endDate: string): number => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // ฟังก์ชันกำหนดสีตามวันที่เหลือ
  const getStatusColor = (daysRemaining: number): string => {
    if (daysRemaining < 0) return "red"; // หมดอายุแล้ว
    if (daysRemaining <= 30) return "orange"; // ใกล้หมดอายุ
    if (daysRemaining <= 90) return "yellow"; // เตือน
    return "green"; // ปกติ
  };

  // จุดที่ 3: เพิ่มหรือซ่อน Elements โดย getElementById() เมื่อรับข้อมูลจาก Form
  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("search") as string;

    const resultElement = document.getElementById("search-result");

    if (resultElement) {
      if (searchValue && searchValue.trim() !== "") {
        // แสดง loading
        resultElement.style.display = "block";
        resultElement.style.opacity = "1";
        resultElement.innerHTML = `
          <div class="bg-blue-500/20 border border-blue-500/50 rounded-lg p-6 mt-4">
            <div class="flex items-center justify-center gap-3">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
              <p class="text-blue-300">กำลังค้นหาข้อมูลทะเบียน: <strong>${searchValue}</strong></p>
            </div>
          </div>
        `;

        try {
          // เรียกใช้ API
          const response = await vehicleSearchGuestAction(searchValue);

          if (response && response.data && response.data.length > 0) {
            const vehicleData = response.data[0];

            // สร้าง HTML สำหรับแสดงผล
            let servicesHTML = "";

            vehicleData.services.forEach(
              (service: {
                serviceType: string;
                startDate: string;
                endDate: string;
              }) => {
                const displayText = getServiceDisplayText(service.serviceType);
                const startDate = formatThaiDate(service.startDate);
                const endDate = formatThaiDate(service.endDate);
                const daysRemaining = getDaysRemaining(service.endDate);
                const statusColor = getStatusColor(daysRemaining);

                let statusText = "";
                let statusBg = "";

                if (daysRemaining < 0) {
                  statusText = `หมดอายุแล้ว ${Math.abs(daysRemaining)} วัน`;
                  statusBg = "bg-red-500/20 border-red-500";
                } else if (daysRemaining <= 30) {
                  statusText = `เหลืออีก ${daysRemaining} วัน`;
                  statusBg = "bg-orange-500/20 border-orange-500";
                } else if (daysRemaining <= 90) {
                  statusText = `เหลืออีก ${daysRemaining} วัน`;
                  statusBg = "bg-yellow-500/20 border-yellow-500";
                } else {
                  statusText = `เหลืออีก ${daysRemaining} วัน`;
                  statusBg = "bg-green-500/20 border-green-500";
                }

                servicesHTML += `
                <div class="${statusBg} border rounded-lg p-4 hover:scale-105 transition-transform duration-200">
                  <div class="flex items-center justify-between mb-3">
                    <h4 class="text-xl font-bold text-white">${displayText}</h4>
                    <span class="text-${statusColor}-300 text-sm font-semibold px-3 py-1 rounded-full bg-${statusColor}-500/30">
                      ${statusText}
                    </span>
                  </div>
                  <div class="space-y-2 text-sm">
                    <div class="flex items-center gap-2">
                      <span class="text-gray-400">🗓️ เริ่มต้น:</span>
                      <span class="text-white font-medium">${startDate}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-gray-400">📅 สิ้นสุด:</span>
                      <span class="text-white font-medium">${endDate}</span>
                    </div>
                  </div>
                </div>
              `;
              }
            );

            resultElement.innerHTML = `
              <div class="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/50 rounded-xl p-6 mt-4 backdrop-blur-sm">
                <div class="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                  <div class="bg-blue-500 rounded-full p-2">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white">ทะเบียน: ${vehicleData.vehicleNumber}</h3>
                    <p class="text-sm text-gray-400">พบข้อมูล ${vehicleData.services.length} รายการ</p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  ${servicesHTML}
                </div>
              </div>
            `;
          } else {
            // ไม่พบข้อมูล
            resultElement.innerHTML = `
              <div class="bg-red-500/20 border border-red-500/50 rounded-lg p-6 mt-4">
                <div class="flex items-center gap-3">
                  <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <p class="text-red-300 font-semibold">ไม่พบข้อมูลทะเบียน: ${searchValue}</p>
                    <p class="text-sm text-gray-400 mt-1">กรุณาตรวจสอบเลขทะเบียนและลองใหม่อีกครั้ง</p>
                  </div>
                </div>
              </div>
            `;
          }
        } catch (error) {
          resultElement.innerHTML = `
            <div class="bg-red-500/20 border border-red-500/50 rounded-lg p-6 mt-4">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <div>
                  <p class="text-red-300 font-semibold">เกิดข้อผิดพลาดในการค้นหา</p>
                  <p class="text-sm text-gray-400 mt-1">กรุณาลองใหม่อีกครั้งในภายหลัง</p>
                </div>
              </div>
            </div>
          `;
          console.error("Search error:", error);
        }
      } else {
        resultElement.style.opacity = "0";
        setTimeout(() => {
          if (resultElement) {
            resultElement.style.display = "none";
          }
        }, 300);
      }
    }
  };

  const handleClearSearch = () => {
    const resultElement = document.getElementById("search-result");
    const searchInput = document.getElementById(
      "search-input"
    ) as HTMLInputElement;

    if (resultElement) {
      resultElement.style.opacity = "0";
      setTimeout(() => {
        if (resultElement) {
          resultElement.style.display = "none";
        }
      }, 300);
    }

    if (searchInput) {
      searchInput.value = "";
    }
  };

  return (
    <div
      className="min-h-screen relative"
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
            <div
              id="logo-container"
              onClick={handleLogoClick}
              className="cursor-pointer inline-block"
            >
              <Image
                src="/assets/images/aimlogo.svg"
                alt="AIM Logo"
                width={300}
                height={100}
                className="mx-auto mb-6"
              />
            </div>

            <h1
              id="main-title"
              className="text-4xl font-bold mb-4 cursor-pointer"
              onMouseEnter={handleMouseEnterTitle}
              onMouseLeave={handleMouseLeaveTitle}
            >
              ร้านภาษี พรบ ประกันภัย จ๊อกกี้
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              บริการครบวงจรด้านภาษีและทะเบียนรถ ด้วยประสบการณ์กว่า 10 ปี
            </p>

            <div id="welcome-message"></div>

            {/* <div id="stats-container" className="max-w-2xl mx-auto"></div> */}

            <div className="flex flex-col items-center mt-8 max-w-4xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl">
                <div className="flex gap-2">
                  <input
                    id="search-input"
                    type="text"
                    name="search"
                    placeholder="กรอกเลขทะเบียนรถ (เช่น กก 1234 หรือ ฟน443)"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-semibold shadow-lg hover:shadow-blue-500/50"
                  >
                    ค้นหา
                  </button>
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-semibold shadow-lg hover:shadow-red-500/50"
                  >
                    ✕
                  </button>
                </div>
              </form>

              {/* จุดที่ 3: Element ที่จะถูกแสดง/ซ่อนตามข้อมูลจาก Form */}
              <div
                id="search-result"
                style={{ display: "none" }}
                className="w-full"
              ></div>
            </div>

            {/* <div className="flex justify-center mt-4">
              <LicenseSearchModal />
            </div> */}
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
                    className="relative group w-[200px] mr-8 h-[200px] overflow-hidden rounded-2xl shrink-0 hover:border-white/30 transition-all duration-300 hover:scale-105"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_HOST_URL}api/v1/file/authorized/file/${card.imgname}`}
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

// ฟังก์ชัน API (ต้อง import จากที่อื่นหรือประกาศที่นี่)
