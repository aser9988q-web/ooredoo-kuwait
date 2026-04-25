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

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const products = [
    {
      name: "Samsung S26 Ultra",
      series: "Galaxy S26 Series",
      price: "KD 33",
      period: "/month",
      image: "/manus-storage/samsung_s26_ultra_new_7ec387ff.jpg",
    },
    {
      name: "Samsung S26 Plus",
      series: "Galaxy S26 Series",
      price: "KD 26",
      period: "/month",
      image: "/manus-storage/samsung_s26_purple_69f443f8.jpg",
    },
    {
      name: "Samsung Galaxy Z Fold 7",
      series: "The ultimate foldable powered by Galaxy AI",
      price: "KD 39",
      period: "/month",
      image: "/manus-storage/samsung_fold7_new_d4ff44d4.png",
    },
    {
      name: "Samsung S26",
      series: "Galaxy S26 Series",
      price: "KD 24",
      period: "/month",
      image: "/manus-storage/samsung_s26_white_b27c32bc.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 text-center">
        <h1 className="text-2xl font-bold text-black mb-1">مرحبا</h1>
        <p className="text-sm text-gray-700">
          مستخدم Ooredoo؟{" "}
          <button className="text-red-600 font-semibold hover:underline">
            تسجيل الدخول
          </button>
        </p>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-y-auto">
        {/* Upgrade Section */}
        <section className="bg-white rounded-lg p-6 mb-4 border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-4 text-right">
            ظهر عالمك
          </h2>
          <div className="flex flex-col gap-3">
            <Button className="bg-black text-white rounded-full w-full py-3 font-semibold hover:bg-gray-900">
              انضم إلينا
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-400 text-gray-700 rounded-full w-full py-3 font-semibold hover:bg-gray-50"
            >
              إضافة رقم حالي
            </Button>
          </div>
        </section>

        {/* Shortcuts Section */}
        <section className="bg-white rounded-lg p-6 mb-4 border border-gray-200">
          <h3 className="text-lg font-bold text-black mb-4 text-right">
            اختصارات
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: "📋",
                label: "حدّث بيانتي",
                badge: "51",
              },
              {
                icon: "🇰🇼",
                label: "Kuwait 51",
                badge: "51",
              },
              {
                icon: "📄",
                label: "دفع الفاتورة",
                badge: "51",
              },
              {
                icon: "🔄",
                label: "إعادة التعبئة",
                badge: "51",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:shadow-sm transition-shadow cursor-pointer"
              >
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold rounded px-2 py-0.5">
                  {item.badge}
                </div>
                <div className="flex justify-center mb-2 text-3xl">
                  {item.icon}
                </div>
                <p className="text-xs font-semibold text-black text-right">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Samsung Banner */}
        <section className="mb-4">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-lg overflow-hidden h-48 flex items-center justify-center relative">
            <img 
              src="/manus-storage/samsung_s26_series_banner_e38fcde5.jpg"
              alt="Galaxy S26 Series"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="text-white text-center relative z-10">
              <p className="text-sm font-semibold opacity-90 mb-2">Galaxy S26 Series</p>
              <p className="text-3xl font-bold">Galaxy AI</p>
            </div>
          </div>
        </section>

        {/* Samsung AI Devices Section */}
        <section className="bg-white rounded-lg p-6 mb-4 border border-gray-200">
          <h3 className="text-lg font-bold text-black mb-1 text-right">
            أجهزة SAMSUNG AI.
          </h3>
          <p className="text-gray-600 text-xs mb-4 font-medium text-right">
            هواتف ذكية 5G مدعومة بالذكاء الاصطناعي بسعر خاص
          </p>

          {/* Carousel Container */}
          <div className="relative">
            <div
              ref={carouselRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
              style={{ scrollBehavior: "smooth" }}
            >
              {products.map((product) => (
                <div
                  key={product.name}
                  className="flex-shrink-0 w-40 bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="h-28 rounded-lg mb-2 flex items-center justify-center overflow-hidden bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="font-bold text-black text-xs mb-1 line-clamp-2 text-right">
                    {product.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2 font-medium line-clamp-2 text-right">
                    {product.series}
                  </p>
                  <p className="text-sm font-bold text-black text-right">
                    {product.price}
                    <span className="text-xs text-gray-500 mr-1 font-normal">
                      {product.period}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Red accent line */}
          <div className="h-1 bg-red-600 w-12 mt-4 mr-0"></div>
        </section>

        {/* Explore Vouchers Section */}
        <section className="bg-white rounded-lg p-6 mb-20 border border-gray-200">
          <h3 className="text-lg font-bold text-black mb-4 text-right">
            استكشف القسائم
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                icon: "/manus-storage/51_kuwait_icon_f17b4363.png",
                label: "51 Kuwait",
              },
              {
                icon: "/manus-storage/starzplay_icon_7d35e0c0.png",
                label: "Starzplay",
              },
              {
                icon: "/manus-storage/talabat_icon_17a7dce4.png",
                label: "Talabat",
              },
              {
                icon: "/manus-storage/xbox_icon_f847d147.png",
                label: "Xbox",
              },
              {
                icon: "/manus-storage/anghami_icon_ea2991df.png",
                label: "Anghami",
              },
              {
                icon: "/manus-storage/amazon_icon_54a7eb41.png",
                label: "Amazon Prime",
              },
              {
                icon: "/manus-storage/music_icon_88883df1.png",
                label: "Music",
              },
              {
                icon: "/manus-storage/show_all_icon_78ce6fdf.jpg",
                label: "عرض الكل",
              },
            ].map((service) => (
              <div
                key={service.label}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={service.icon}
                    alt={service.label}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <p className="text-xs font-medium text-black text-center line-clamp-2">
                  {service.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center">
        {[
          { icon: HomeIcon, label: "الرئيسية", active: true },
          { icon: ShoppingCart, label: "المنجر", active: false },
          { icon: CreditCard, label: "دفع", active: false },
          { icon: Settings, label: "إدارة", active: false },
          { icon: MoreHorizontal, label: "المزيد", active: false },
        ].map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-1 py-2 px-3 transition-all ${
              item.active
                ? "text-red-600"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            <item.icon size={24} strokeWidth={1.5} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-24 right-4 bg-red-600 text-white rounded-full p-3 shadow-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-2 font-semibold z-40"
      >
        {showChat ? (
          <X size={20} />
        ) : (
          <>
            <MessageCircle size={20} />
            <span className="text-xs">تواجه مشكلة؟</span>
          </>
        )}
      </button>

      {/* Chat Panel */}
      {showChat && (
        <div className="fixed bottom-40 right-4 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-72 z-40">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={() => setShowChat(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
            <h4 className="font-bold text-black text-sm">الدردشة معنا</h4>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed text-right">
            نحن هنا لمساعدتك! أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.
          </p>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
