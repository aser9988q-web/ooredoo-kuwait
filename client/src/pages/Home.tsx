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
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 text-center sticky top-0 z-30">
        <h1 className="text-2xl font-bold text-black mb-1">مرحبا</h1>
        <p className="text-sm text-gray-700">
          مستخدم Ooredoo؟{" "}
          <button className="text-red-600 font-semibold hover:underline">
            تسجيل الدخول
          </button>
        </p>
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
          <div className="grid grid-cols-4 gap-2">
            {[
              {
                icon: "/manus-storage/update_info_icon_b97bbe3a.svg",
                label: "حدّث بياناتي",
                badge: "51",
              },
              {
                icon: "/manus-storage/kuwait_51_icon_151e6caa.png",
                label: "Kuwait 51",
                badge: "51",
              },
              {
                icon: "/manus-storage/payment_icon_034f944b.svg",
                label: "دفع الفاتورة",
                badge: "51",
              },
              {
                icon: "/manus-storage/recharge_icon_127b65ef.svg",
                label: "إعادة التعبئة",
                badge: "51",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="relative flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                {/* Icon Box */}
                <div className="relative w-12 h-12 bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-8 h-8 object-contain"
                  />
                  {/* Badge */}
                  <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </div>
                </div>
                {/* Label */}
                <p className="text-xs font-semibold text-black text-center line-clamp-2 w-full">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Samsung Banner */}
        <section className="mb-4">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-xl overflow-hidden h-40 flex items-center justify-center relative">
            <img 
              src="/manus-storage/samsung_s26_series_banner_e38fcde5.jpg"
              alt="Galaxy S26 Series"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="text-white text-center relative z-10">
              <p className="text-xs font-semibold opacity-90 mb-1">Galaxy S26 Series</p>
              <p className="text-2xl font-bold">Galaxy AI</p>
            </div>
          </div>
        </section>

        {/* Samsung AI Devices Section */}
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <h3 className="text-base font-bold text-black mb-1 text-right">
            أجهزة SAMSUNG AI.
          </h3>
          <p className="text-gray-600 text-xs mb-4 font-medium text-right">
            هواتف ذكية 5G مدعومة بالذكاء الاصطناعي بسعر خاص
          </p>

          {/* Carousel Container */}
          <div className="relative -mx-5 px-5">
            <div
              ref={carouselRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
              style={{ scrollBehavior: "smooth" }}
            >
              {products.map((product) => (
                <div
                  key={product.name}
                  className="flex-shrink-0 w-36 bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="h-24 rounded-lg mb-2 flex items-center justify-center overflow-hidden bg-white">
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
          <div className="h-1 bg-red-600 w-10 mt-4 mr-0"></div>
        </section>

        {/* Discover Electronic Cards Section */}
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <h3 className="text-base font-bold text-black mb-1 text-right">
            اكتشف البطاقات الإلكترونية
          </h3>
          <p className="text-gray-600 text-xs mb-4 font-medium text-right">
            تمتع بتجربة رائعة مع البطاقات الإلكترونية حصرياً عبر التطبيق
          </p>
          <div className="h-40 rounded-lg overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <img 
              src="/manus-storage/xbox_card_hero_527fdede.png"
              alt="Electronic Cards"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Most Popular Section */}
        <section className="mb-4">
          <h3 className="text-base font-bold text-black mb-1 text-right px-0">
            الأكثر مبيعاً
          </h3>
          <p className="text-gray-600 text-xs mb-4 font-medium text-right px-0">
            من الطعام إلى الألعاب، نحن غطيناك بقسائم خاصة
          </p>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {[
              {
                label: "عرض الكل",
                image: "/manus-storage/show_all_icon_78ce6fdf.jpg",
                bgColor: "from-gray-800 to-gray-900",
              },
              {
                label: "Music",
                image: "/manus-storage/music_icon_88883df1.png",
                bgColor: "from-purple-600 to-pink-600",
              },
              {
                label: "Anghami",
                image: "/manus-storage/anghami_icon_ea2991df.png",
                bgColor: "from-yellow-400 to-green-500",
              },
              {
                label: "Xbox",
                image: "/manus-storage/xbox_card_hero_527fdede.png",
                bgColor: "from-green-600 to-emerald-700",
              },
              {
                label: "Amazon Prime",
                image: "/manus-storage/amazon_icon_54a7eb41.png",
                bgColor: "from-slate-700 to-slate-900",
              },
              {
                label: "Talabat",
                image: "/manus-storage/talabat_icon_17a7dce4.png",
                bgColor: "from-orange-500 to-red-600",
              },
              {
                label: "Starzplay",
                image: "/manus-storage/starzplay_icon_7d35e0c0.png",
                bgColor: "from-teal-600 to-cyan-700",
              },
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
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex items-center justify-center">
                  <p className="text-white text-xs font-bold text-center">
                    {service.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 flex justify-around items-center">
        {[
          { icon: HomeIcon, label: "الرئيسية", active: true },
          { icon: ShoppingCart, label: "المنجر", active: false },
          { icon: CreditCard, label: "دفع", active: false },
          { icon: Settings, label: "إدارة", active: false },
          { icon: MoreHorizontal, label: "المزيد", active: false },
        ].map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-0.5 py-2 px-2 transition-all text-xs ${
              item.active
                ? "text-red-600"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            <item.icon size={20} strokeWidth={1.5} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-20 right-4 bg-red-600 text-white rounded-full p-3 shadow-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-2 font-semibold z-40"
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
        <div className="fixed bottom-32 right-4 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-64 z-40">
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
