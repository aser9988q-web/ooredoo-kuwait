import { Button } from "@/components/ui/button";
import {
  Home as HomeIcon,
  Settings,
  CreditCard,
  ShoppingCart,
  MoreHorizontal,
  MessageCircle,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useRef } from "react";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320;
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
      image: "/manus-storage/samsung_s26_ultra_0c176c4d.jpg",
    },
    {
      name: "Samsung S26 Plus",
      series: "Galaxy S26 Series",
      price: "KD 26",
      period: "/month",
      image: "/manus-storage/samsung_s26_plus_721a6428.jpg",
    },
    {
      name: "Samsung Galaxy Z Fold 7",
      series: "The ultimate foldable powered by Galaxy AI",
      price: "KD 39",
      period: "/month",
      image: "/manus-storage/samsung_fold6_01266d50.jpg",
    },
    {
      name: "Samsung S26",
      series: "Galaxy S26 Series",
      price: "KD 24",
      period: "/month",
      image: "/manus-storage/samsung_s26_normal_5ab82e36.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 md:px-6 py-3 flex justify-between items-center bg-white">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-xs md:text-sm font-bold text-black">Hello</span>
          <span className="text-xs text-gray-700 hidden md:inline">
            Ooredoo user?{" "}
            <button className="text-red-600 font-semibold hover:underline">
              Login
            </button>
          </span>
        </div>
        <div className="w-20 md:w-24 h-7 md:h-8 bg-red-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs md:text-xs">ooredoo</span>
        </div>
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden ml-4 text-gray-700"
        >
          <Menu size={20} />
        </button>
      </header>

      <div className="flex flex-1 relative">
        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowMobileMenu(false)} />
        )}

        {/* Sidebar Navigation */}
        <aside className={`${
          showMobileMenu ? 'absolute left-0 top-0 z-50' : 'hidden md:block'
        } w-32 md:w-32 border-r border-gray-200 py-6 px-3 bg-white h-screen md:h-auto md:relative`}>
          <nav className="space-y-0">
            {[
              { icon: HomeIcon, label: "Home", active: true },
              { icon: Settings, label: "Manage", active: false },
              { icon: CreditCard, label: "Pay", active: false },
              { icon: ShoppingCart, label: "Shop", active: false },
              { icon: MoreHorizontal, label: "More", active: false },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setShowMobileMenu(false)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-all ${
                  item.active
                    ? "bg-red-100 text-red-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 font-medium"
                }`}
              >
                <item.icon size={18} strokeWidth={1.5} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-white">
          {/* Upgrade Section */}
          <section className="bg-white rounded-lg p-4 md:p-6 mb-4 md:mb-6 border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-black mb-1 leading-tight">
                  UPGRADE
                  <br />
                  YOUR{" "}
                  <span className="text-red-600">WORLD</span>
                </h2>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  className="border border-gray-400 text-gray-700 rounded-full px-3 md:px-5 py-1 text-xs font-medium hover:bg-gray-50 flex-1 md:flex-none"
                >
                  Add Existing Line
                </Button>
                <Button className="bg-black text-white rounded-full px-3 md:px-5 py-1 text-xs font-medium hover:bg-gray-900 flex-1 md:flex-none">
                  Join Us
                </Button>
              </div>
            </div>
          </section>

          {/* Shortcuts Section */}
          <section className="mb-4 md:mb-6">
            <h3 className="text-lg md:text-lg font-bold text-black mb-3 md:mb-4">Shortcuts</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {[
                {
                  icon: "/manus-storage/recharge_icon_4b9b5a6d.svg",
                  label: "Recharge",
                  badge: "51",
                },
                {
                  icon: "/manus-storage/payment_icon_1ed6a648.svg",
                  label: "Pay Bills",
                  badge: "51",
                },
                {
                  icon: "/manus-storage/kuwait_51_icon_2d59fe18.png",
                  label: "51 Kuwait",
                  badge: "51",
                },
                {
                  icon: "/manus-storage/update_info_icon_5a4b1ad7.svg",
                  label: "Update My Info",
                  badge: "51",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="relative bg-white border border-gray-200 rounded-lg p-3 md:p-4 text-center hover:shadow-sm transition-shadow cursor-pointer"
                >
                  <div className="absolute top-1.5 right-1.5 bg-red-600 text-white text-xs font-bold rounded px-1.5 py-0.5">
                    {item.badge}
                  </div>
                  <div className="flex justify-center mb-2">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  </div>
                  <p className="text-xs font-semibold text-black line-clamp-2">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Samsung Banner */}
          <section className="mb-4 md:mb-6">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-lg overflow-hidden h-32 md:h-40 flex items-center justify-center relative">
              <div className="text-white text-center">
                <p className="text-xs md:text-xs font-semibold opacity-75 mb-1">Galaxy S26 Series</p>
                <p className="text-xl md:text-2xl font-bold">Galaxy AI</p>
              </div>
            </div>
          </section>

          {/* Samsung AI Devices Section */}
          <section className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-lg font-bold text-black mb-1">
              SAMSUNG AI Devices.
            </h3>
            <p className="text-gray-600 text-xs mb-3 md:mb-4 font-medium">
              AI powered 5G Smartphones at a special price
            </p>

            {/* Carousel Container */}
            <div className="relative">
              <div
                ref={carouselRef}
                className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2"
                style={{ scrollBehavior: "smooth" }}
              >
                {products.map((product) => (
                  <div
                    key={product.name}
                    className="flex-shrink-0 w-40 md:w-48 bg-white border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="h-24 md:h-32 rounded-lg mb-2 md:mb-3 flex items-center justify-center overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-bold text-black text-xs md:text-xs mb-1 line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2 font-medium line-clamp-2">
                      {product.series}
                    </p>
                    <p className="text-sm md:text-base font-bold text-black">
                      {product.price}
                      <span className="text-xs text-gray-500 ml-1 font-normal">
                        {product.period}
                      </span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Carousel Navigation Buttons */}
              <button
                onClick={() => scrollCarousel("right")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 z-10 hidden md:flex items-center justify-center"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <button
                onClick={() => scrollCarousel("left")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 z-10 hidden md:flex items-center justify-center"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>
            </div>

            {/* Red accent line */}
            <div className="h-0.5 bg-red-600 w-8 mt-3 md:mt-4"></div>
          </section>

          {/* Explore Vouchers Section */}
          <section className="mb-8">
            <h3 className="text-lg md:text-lg font-bold text-black mb-1">
              Explore Vouchers
            </h3>
            <p className="text-gray-600 text-xs font-medium">
              Enjoy deals & Promos on other covered with special
            </p>
          </section>
        </main>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-4 md:right-6 bg-red-600 text-white rounded-full p-3 shadow-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-1 font-semibold z-40"
      >
        {showChat ? (
          <X size={20} />
        ) : (
          <>
            <MessageCircle size={20} />
            <span className="text-xs hidden sm:inline">Chat with us</span>
          </>
        )}
      </button>

      {/* Chat Panel */}
      {showChat && (
        <div className="fixed bottom-20 right-4 md:right-6 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-72 md:w-80 z-40">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-black text-sm">Having trouble?</h4>
            <button
              onClick={() => setShowChat(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            We're here to help! Send us a message and we'll respond as soon as possible.
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
