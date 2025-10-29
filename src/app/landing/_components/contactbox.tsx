import { Phone } from "lucide-react";

const LineIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-green-500"
  >
    <path d="M19.5 3h-15C3.12 3 2 4.12 2 5.5v13c0 1.38 1.12 2.5 2.5 2.5h15c1.38 0 2.5-1.12 2.5-2.5v-13C22 4.12 20.88 3 19.5 3zM8 14H6V9h2v5zm3 0h-2V9h2v5zm3 0h-2V9h2v5zm4.5 0H17V9h1.5v5z" />
  </svg>
);

export default function ContactBox() {
  return (
    <div
      className="relative max-w-5xl mx-auto p-6 md:p-10 rounded-3xl border border-white/20 backdrop-blur-lg shadow-lg
                 bg-white/10 text-gray-800"
    >
      {/* glow layer */}
      {/* <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-100/30 via-indigo-100/20 to-transparent blur-md"></div> */}

      {/* หัวข้อ */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mb-4 shadow-md">
          <Phone className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">ติดต่อฉัน</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
      </div>

      {/* Layout 2 คอลัมน์ */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* ซ้าย: เบอร์ + ไลน์ */}
        <div className="flex-1 space-y-6">
          {/* เบอร์หลัก */}
          <div className="group transition-transform duration-200 hover:scale-[1.02]">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/30 bg-white/30 backdrop-blur-md hover:border-blue-300/70 shadow-sm transition-all duration-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">เบอร์หลัก</p>
                <a
                  href="tel:0812345678"
                  className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  081-234-5678
                </a>
              </div>
            </div>
          </div>

          {/* เบอร์สำรอง */}
          <div className="group transition-transform duration-200 hover:scale-[1.02]">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/30 bg-white/30 backdrop-blur-md hover:border-blue-300/70 shadow-sm transition-all duration-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">เบอร์สำรอง</p>
                <a
                  href="tel:0899876543"
                  className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  089-987-6543
                </a>
              </div>
            </div>
          </div>

          {/* LINE */}
          <div className="group transition-transform duration-200 hover:scale-[1.02]">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/30 bg-white/30 backdrop-blur-md hover:border-green-300/60 shadow-sm transition-all duration-200">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                <LineIcon />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">LINE ID</p>
                <span className="text-lg font-semibold text-green-600">
                  tumgapkao
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ขวา: แผนที่ */}
        <div className="flex-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.235297293243!2d100.69702357492142!3d13.824904786574587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d637a195a0dc3%3A0x3363d9542a4cb583!2z4LiI4LmK4Lit4LiB4LiB4Li14LmJ!5e0!3m2!1sth!2sth!4v1760594853706!5m2!1sth!2sth"
            className="w-full h-80 md:h-full rounded-2xl border-0 shadow-md"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
