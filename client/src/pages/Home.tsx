import { Button } from "@/components/ui/button";
import {
  Home as HomeIcon,
  Settings,
  CreditCard,
  ShoppingCart,
  MoreHorizontal,
  MessageCircle,
  X,
} from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "wouter";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      name: "Samsung S26 Ultra",
      series: "Galaxy S26 Series",
      price: "KD 33",
      period: "/شهر",
      image: "/manus-storage/samsung_s26_ultra_new_7ec387ff.jpg",
    },
    {
      name: "Samsung S26 Plus",
      series: "Galaxy S26 Series",
      price: "KD 26",
      period: "/شهر",
      image: "/manus-storage/samsung_s26_purple_69f443f8.jpg",
    },
    {
      name: "Samsung Galaxy Z Fold 7",
      series: "الهاتف الذكي القابل للطي الأقوى بتقنية Galaxy AI",
      price: "KD 39",
      period: "/شهر",
      image: "/manus-storage/samsung_fold7_new_d4ff44d4.png",
    },
    {
      name: "Samsung S26",
      series: "Galaxy S26 Series",
      price: "KD 24",
      period: "/شهر",
      image: "/manus-storage/samsung_s26_white_b27c32bc.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24 rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center sticky top-0 z-30">
        <Link href="/en" className="text-sm font-semibold text-red-600 hover:text-red-700 px-3 py-1 border border-red-600 rounded-full">
          EN
        </Link>
        <h1 className="text-2xl font-bold text-black flex-1 text-center">مرحبا مستخدم Ooredoo</h1>
        <div className="w-12"></div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-4 overflow-y-auto">
        {/* Upgrade Section */}
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-4 text-right leading-tight">
            ظهر عالمك
          </h2>
          <div className="flex flex-col gap-3">
            <Button className="bg-black text-white rounded-full w-full py-3 font-semibold hover:bg-gray-900 text-sm">
              انضم إلينا
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-400 text-gray-700 rounded-full w-full py-3 font-semibold hover:bg-gray-50 text-sm"
            >
              إضافة رقم حالي
            </Button>
          </div>
        </section>

        {/* Shortcuts Section */}
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <h3 className="text-base font-bold text-black mb-4 text-right">
            اختصارات
          </h3>
          <div className="flex justify-between gap-3">
            {[
              {
                icon: "/manus-storage/update_info_icon_b97bbe3a.svg",
                label: "حدّث بياناتي",
              },
              {
                icon: "/manus-storage/payment_icon_034f944b.svg",
                label: "دفع الفاتورة",
              },
              {
                icon: "/manus-storage/kuwait_51_icon_new_b68a3967.png",
                label: "Kuwait 51",
              },
              {
                icon: "/manus-storage/recharge_icon_127b65ef.svg",
                label: "إعادة التعبئة",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex-1 flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <img src={item.icon} alt={item.label} className="w-8 h-8" />
                <p className="text-xs font-medium text-gray-800 text-center">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Samsung Banner */}
        <section className="bg-white rounded-xl overflow-hidden mb-4 border border-gray-200">
          <img
            src="/manus-storage/2129_c5cfe522.jpg"
            alt="Samsung"
            className="w-full h-48 object-cover"
          />
        </section>

        {/* Products Section */}
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <div className="mb-4 text-right">
            <h2 className="text-xl font-bold text-black mb-1">أجهزة SAMSUNG AI بسلسلة Galaxy S26</h2>
            <p className="text-sm text-gray-600">هواتف ذكية بتقنية 5G موضوعة بالذاكرة الاصطناعية بسعر خاص</p>
          </div>
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          >
            {products.map((product) => (
              <div
                key={product.name}
                className="flex-shrink-0 w-40 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain bg-white"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-600 mb-2">{product.series}</p>
                  <p className="text-lg font-bold text-red-600">
                    {product.price}
                    <span className="text-xs font-normal">{product.period}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Digital Cards Section */}
        <section className="mb-4">
          <div className="mb-4 text-right">
            <h2 className="text-xl font-bold text-black mb-1">اكتشف البطاقات الالكترونية</h2>
            <p className="text-sm text-gray-600">تمتع بتجربة رائعة مع البطاقات الإلكترونية حصرياً عبر التطبيق</p>
          </div>
          <img
            src="/manus-storage/xbox_card_hero_e84c9825.png"
            alt="Digital Cards"
            className="w-full h-40 object-cover rounded-lg"
          />
        </section>

        {/* Most Sold Section */}
        <section className="mb-4">
          <div className="mb-4 text-right">
            <h2 className="text-xl font-bold text-black mb-1">الأكثر مبيعاً</h2>
            <p className="text-sm text-gray-600">من الخدمات والتطبيقات، تجربة حصرياً عبر بطاقاتنا الالكترونية</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {[
              { label: "عرض الكل", image: "/manus-storage/2141_0768970b.jpg", bgColor: "from-gray-800 to-gray-900" },
              { label: "Starzplay", image: "/manus-storage/2135_ff06bba5.png", bgColor: "from-green-600 to-green-800" },
              { label: "Talabat", image: "/manus-storage/2136_7a5c2dd0.png", bgColor: "from-orange-500 to-orange-700" },
              { label: "Kuwait 51", image: "/manus-storage/2134_2291f63d.png", bgColor: "from-gray-800 to-gray-900" },
              { label: "Amazon Prime", image: "/manus-storage/2137_8a2c8832.png", bgColor: "from-gray-800 to-gray-900" },
              { label: "Anghami", image: "/manus-storage/2138_e270ea4e.png", bgColor: "from-purple-600 to-purple-800" },
              { label: "Xbox", image: "/manus-storage/2139_1efd22fa.png", bgColor: "from-green-700 to-green-900" },
              { label: "Music", image: "/manus-storage/2140_99dafbc6.png", bgColor: "from-pink-500 to-pink-700" },
            ].map((service) => (
              <div
                key={service.label}
                className="flex-shrink-0 w-40 h-32 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:scale-105 relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor}`}></div>
                <img
                  src={service.image}
                  alt={service.label}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-20 z-20">
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
          <img src="/manus-storage/2156_f540f8ad.svg" alt="المزيد" className="w-6 h-6" />
          <span className="text-xs">المزيد</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
          <img src="/manus-storage/2159_24d0fb7a.svg" alt="إدارة" className="w-6 h-6" />
          <span className="text-xs">إدارة</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
          <img src="/manus-storage/2158_54f79e6a.svg" alt="دفع" className="w-6 h-6" />
          <span className="text-xs">دفع</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
          <img src="/manus-storage/2157_9447ae62.svg" alt="المنجر" className="w-6 h-6" />
          <span className="text-xs">المنجر</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-red-600 hover:text-red-700 transition-colors">
          <img src="/manus-storage/2160_1ff8ad26.svg" alt="الرئيسية" className="w-6 h-6" />
          <span className="text-xs">الرئيسية</span>
        </button>
      </nav>

      {/* Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-24 right-4 bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700 transition-colors z-10"
      >
        {showChat ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Panel */}
      {showChat && (
        <div className="fixed bottom-32 right-4 bg-white rounded-lg shadow-lg p-4 w-80 z-10">
          <p className="text-sm text-gray-700">تواجه مشكلة؟</p>
        </div>
      )}
    </div>
  );
}
