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
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const carouselRef = useRef<HTMLDivElement>(null);

  // Translations
  const translations = {
    ar: {
      header: "مرحبا مستخدم Ooredoo",
      upgradeTitle: "ظهر عالمك",
      joinUs: "انضم إلينا",
      addLine: "إضافة رقم حالي",
      shortcuts: "اختصارات",
      updateInfo: "حدّث بياناتي",
      kuwait51: "Kuwait 51",
      payBill: "دفع الفاتورة",
      recharge: "إعادة التعبئة",
      samsungTitle: "أجهزة SAMSUNG AI بسلسلة Galaxy S26",
      samsungDesc: "هواتف ذكية بتقنية 5G موضوعة بالذاكرة الاصطناعية بسعر خاص",
      discoverCards: "اكتشف البطاقات الالكترونية",
      cardsDesc: "تمتع بتجربة رائعة مع البطاقات الإلكترونية حصرياً عبر التطبيق",
      mostSold: "الأكثر مبيعاً",
      soldDesc: "من الخدمات والتطبيقات، تجربة حصرياً عبر بطاقاتنا الالكترونية",
      home: "الرئيسية",
      store: "المنجر",
      pay: "دفع",
      manage: "إدارة",
      more: "المزيد",
      haveProblem: "تواجه مشكلة؟",
      month: "/شهر",
      galaxySeries: "سلسلة Galaxy S26",
      galaxyAI: "Galaxy AI",
      foldable: "الهاتف الذكي القابل للطي الأقوى بتقنية Galaxy AI",
    },
    en: {
      header: "Hello Ooredoo User",
      upgradeTitle: "Upgrade Your World",
      joinUs: "Join Us",
      addLine: "Add Existing Line",
      shortcuts: "Shortcuts",
      updateInfo: "Update My Info",
      kuwait51: "Kuwait 51",
      payBill: "Pay Bill",
      recharge: "Recharge",
      samsungTitle: "SAMSUNG AI Devices Galaxy S26 Series",
      samsungDesc: "Smart phones with 5G technology powered by artificial intelligence at special prices",
      discoverCards: "Discover Digital Cards",
      cardsDesc: "Enjoy an amazing experience with digital cards exclusively through the app",
      mostSold: "Most Sold",
      soldDesc: "From services and applications, exclusively through our digital cards",
      home: "Home",
      store: "Store",
      pay: "Pay",
      manage: "Manage",
      more: "More",
      haveProblem: "Having a problem?",
      month: "/month",
      galaxySeries: "Galaxy S26 Series",
      galaxyAI: "Galaxy AI",
      foldable: "The most powerful foldable smartphone powered by Galaxy AI",
    },
  };

  const t = translations[language];

  const products = [
    {
      name: language === "ar" ? "Samsung S26 Ultra" : "Samsung S26 Ultra",
      series: t.galaxySeries,
      price: "KD 33",
      period: t.month,
      image: "/manus-storage/samsung_s26_ultra_new_7ec387ff.jpg",
    },
    {
      name: language === "ar" ? "Samsung S26 Plus" : "Samsung S26 Plus",
      series: t.galaxySeries,
      price: "KD 26",
      period: t.month,
      image: "/manus-storage/samsung_s26_purple_69f443f8.jpg",
    },
    {
      name: language === "ar" ? "Samsung Galaxy Z Fold 7" : "Samsung Galaxy Z Fold 7",
      series: t.foldable,
      price: "KD 39",
      period: t.month,
      image: "/manus-storage/samsung_fold7_new_d4ff44d4.png",
    },
    {
      name: language === "ar" ? "Samsung S26" : "Samsung S26",
      series: t.galaxySeries,
      price: "KD 24",
      period: t.month,
      image: "/manus-storage/samsung_s26_white_b27c32bc.jpg",
    },
  ];

  const shortcuts = [
    {
      icon: "/manus-storage/update_info_icon_b97bbe3a.svg",
      label: t.updateInfo,
    },
    {
      icon: "/manus-storage/payment_icon_034f944b.svg",
      label: t.payBill,
    },
    {
      icon: "/manus-storage/kuwait_51_icon_new_b68a3967.png",
      label: t.kuwait51,
    },
    {
      icon: "/manus-storage/recharge_icon_127b65ef.svg",
      label: t.recharge,
    },
  ];

  const services = [
    {
      label: "Starzplay",
      image: "/manus-storage/starzplay_icon_a1b2c3d4.png",
      bgColor: "from-green-600 to-green-800",
    },
    {
      label: "Talabat",
      image: "/manus-storage/talabat_icon_e5f6g7h8.png",
      bgColor: "from-orange-500 to-orange-700",
    },
    {
      label: "Amazon Prime",
      image: "/manus-storage/amazon_icon_i9j0k1l2.png",
      bgColor: "from-gray-800 to-gray-900",
    },
    {
      label: "Xbox",
      image: "/manus-storage/xbox_icon_m3n4o5p6.png",
      bgColor: "from-green-700 to-green-900",
    },
    {
      label: "Anghami",
      image: "/manus-storage/anghami_icon_q7r8s9t0.png",
      bgColor: "from-purple-600 to-purple-800",
    },
    {
      label: "Music",
      image: "/manus-storage/music_icon_u1v2w3x4.png",
      bgColor: "from-pink-500 to-pink-700",
    },
    {
      label: language === "ar" ? "عرض الكل" : "Show All",
      image: "/manus-storage/show_all_icon_78ce6fdf.jpg",
      bgColor: "from-gray-800 to-gray-900",
    },
  ];

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col pb-24 ${language === "ar" ? "rtl" : "ltr"}`}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center sticky top-0 z-30">
        <button
          onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
          className="text-sm font-semibold text-red-600 hover:text-red-700 px-3 py-1 border border-red-600 rounded-full"
        >
          {language === "ar" ? "EN" : "AR"}
        </button>
        <h1 className="text-2xl font-bold text-black flex-1 text-center">{t.header}</h1>
        <div className="w-12"></div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-4 overflow-y-auto">
        {/* Upgrade Section */}
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <h2 className={`text-2xl font-bold text-black mb-4 ${language === "ar" ? "text-right" : "text-left"} leading-tight`}>
            {t.upgradeTitle}
          </h2>
          <div className="flex flex-col gap-3">
            <Button className="bg-black text-white rounded-full w-full py-3 font-semibold hover:bg-gray-900 text-sm">
              {t.joinUs}
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-400 text-gray-700 rounded-full w-full py-3 font-semibold hover:bg-gray-50 text-sm"
            >
              {t.addLine}
            </Button>
          </div>
        </section>

        {/* Shortcuts Section */}
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <h3 className={`text-base font-bold text-black mb-4 ${language === "ar" ? "text-right" : "text-left"}`}>
            {t.shortcuts}
          </h3>
          <div className="flex justify-between gap-3">
            {shortcuts.map((item) => (
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
            src="/manus-storage/samsung_banner_xyz123.jpg"
            alt="Samsung"
            className="w-full h-40 object-cover"
          />
        </section>

        {/* Products Section */}
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <div className={`mb-4 ${language === "ar" ? "text-right" : "text-left"}`}>
            <h2 className="text-xl font-bold text-black mb-1">{t.samsungTitle}</h2>
            <p className="text-sm text-gray-600">{t.samsungDesc}</p>
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
                  className="w-full h-32 object-cover"
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
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <div className={`mb-4 ${language === "ar" ? "text-right" : "text-left"}`}>
            <h2 className="text-xl font-bold text-black mb-1">{t.discoverCards}</h2>
            <p className="text-sm text-gray-600">{t.cardsDesc}</p>
          </div>
          <img
            src="/manus-storage/xbox_banner_2144.png"
            alt="Digital Cards"
            className="w-full h-40 object-cover rounded-lg"
          />
        </section>

        {/* Most Sold Section */}
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <div className={`mb-4 ${language === "ar" ? "text-right" : "text-left"}`}>
            <h2 className="text-xl font-bold text-black mb-1">{t.mostSold}</h2>
            <p className="text-sm text-gray-600">{t.soldDesc}</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {services.map((service) => (
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
          <MoreHorizontal size={24} />
          <span className="text-xs">{t.more}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
          <Settings size={24} />
          <span className="text-xs">{t.manage}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
          <CreditCard size={24} />
          <span className="text-xs">{t.pay}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
          <ShoppingCart size={24} />
          <span className="text-xs">{t.store}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-red-600 hover:text-red-700 transition-colors">
          <HomeIcon size={24} />
          <span className="text-xs">{t.home}</span>
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
          <p className="text-sm text-gray-700">{t.haveProblem}</p>
        </div>
      )}
    </div>
  );
}
