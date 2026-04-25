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

export default function HomeEn() {
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
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24 ltr">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="w-12"></div>
        <h1 className="text-2xl font-bold text-black flex-1 text-center">Hello Ooredoo User</h1>
        <Link href="/" className="text-sm font-semibold text-red-600 hover:text-red-700 px-3 py-1 border border-red-600 rounded-full">
          AR
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-4 overflow-y-auto">
        {/* Upgrade Section */}
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-4 text-left leading-tight">
            Upgrade Your World
          </h2>
          <div className="flex flex-col gap-3">
            <Button className="bg-black text-white rounded-full w-full py-3 font-semibold hover:bg-gray-900 text-sm">
              Join Us
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-400 text-gray-700 rounded-full w-full py-3 font-semibold hover:bg-gray-50 text-sm"
            >
              Add Existing Line
            </Button>
          </div>
        </section>

        {/* Shortcuts Section */}
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <h3 className="text-base font-bold text-black mb-4 text-left">
            Shortcuts
          </h3>
          <div className="flex justify-between gap-3">
            {[
              {
                icon: "/manus-storage/update_info_icon_b97bbe3a.svg",
                label: "Update My Info",
              },
              {
                icon: "/manus-storage/payment_icon_034f944b.svg",
                label: "Pay Bill",
              },
              {
                icon: "/manus-storage/kuwait_51_icon_new_b68a3967.png",
                label: "Kuwait 51",
              },
              {
                icon: "/manus-storage/recharge_icon_127b65ef.svg",
                label: "Recharge",
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
          <div className="mb-4 text-left">
            <h2 className="text-xl font-bold text-black mb-1">SAMSUNG AI Devices Galaxy S26 Series</h2>
            <p className="text-sm text-gray-600">Smart phones with 5G technology powered by artificial intelligence at special prices</p>
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
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <div className="mb-4 text-left">
            <h2 className="text-xl font-bold text-black mb-1">Discover Digital Cards</h2>
            <p className="text-sm text-gray-600">Enjoy an amazing experience with digital cards exclusively through the app</p>
          </div>
          <img
            src="/manus-storage/xbox_card_hero_e84c9825.png"
            alt="Digital Cards"
            className="w-full h-40 object-cover rounded-lg"
          />
        </section>

        {/* Most Sold Section */}
        <section className="bg-white rounded-xl p-5 mb-4 border border-gray-200">
          <div className="mb-4 text-left">
            <h2 className="text-xl font-bold text-black mb-1">Most Sold</h2>
            <p className="text-sm text-gray-600">From services and applications, exclusively through our digital cards</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {[
              { label: "Starzplay", image: "/manus-storage/2135_583169cf.png", bgColor: "from-green-600 to-green-800" },
              { label: "Talabat", image: "/manus-storage/2136_176bf7ba.png", bgColor: "from-orange-500 to-orange-700" },
              { label: "Amazon Prime", image: "/manus-storage/2137_f7b77acb.png", bgColor: "from-gray-800 to-gray-900" },
              { label: "Xbox", image: "/manus-storage/2139_a76ff4cd.png", bgColor: "from-green-700 to-green-900" },
              { label: "Anghami", image: "/manus-storage/2138_08e16cc7.png", bgColor: "from-purple-600 to-purple-800" },
              { label: "Music", image: "/manus-storage/2140_d27cba3e.png", bgColor: "from-pink-500 to-pink-700" },
              { label: "Show All", image: "/manus-storage/2141_68c6f933.jpg", bgColor: "from-gray-800 to-gray-900" },
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
          <MoreHorizontal size={24} />
          <span className="text-xs">More</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
          <Settings size={24} />
          <span className="text-xs">Manage</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
          <CreditCard size={24} />
          <span className="text-xs">Pay</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
          <ShoppingCart size={24} />
          <span className="text-xs">Store</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-red-600 hover:text-red-700 transition-colors">
          <HomeIcon size={24} />
          <span className="text-xs">Home</span>
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
          <p className="text-sm text-gray-700">Having a problem?</p>
        </div>
      )}
    </div>
  );
}
