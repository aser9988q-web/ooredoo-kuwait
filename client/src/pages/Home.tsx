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
import { useState } from "react";

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-3 flex justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-black">Hello</span>
          <span className="text-xs text-gray-700">
            Ooredoo user?{" "}
            <button className="text-red-600 font-semibold hover:underline">
              Login
            </button>
          </span>
        </div>
        <div className="w-24 h-8 bg-red-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs">ooredoo</span>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-32 border-r border-gray-200 py-6 px-3 bg-white">
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
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-all ${
                  item.active
                    ? "bg-red-100 text-red-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 font-medium"
                }`}
              >
                <item.icon size={18} strokeWidth={1.5} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          {/* Upgrade Section */}
          <section className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-black mb-1 leading-tight">
                  UPGRADE
                  <br />
                  YOUR{" "}
                  <span className="text-red-600">WORLD</span>
                </h2>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border border-gray-400 text-gray-700 rounded-full px-5 py-1 text-xs font-medium hover:bg-gray-50"
                >
                  Add Existing Line
                </Button>
                <Button className="bg-black text-white rounded-full px-5 py-1 text-xs font-medium hover:bg-gray-900">
                  Join Us
                </Button>
              </div>
            </div>
          </section>

          {/* Shortcuts Section */}
          <section className="mb-6">
            <h3 className="text-lg font-bold text-black mb-4">Shortcuts</h3>
            <div className="grid grid-cols-4 gap-3">
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
                  icon: "/manus-storage/update_info_icon_5a4b1ad7.svg",
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
                  className="relative bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-sm transition-shadow cursor-pointer"
                >
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold rounded px-1.5 py-0.5">
                    {item.badge}
                  </div>
                  <div className="flex justify-center mb-2">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-6 h-6"
                    />
                  </div>
                  <p className="text-xs font-semibold text-black">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Samsung Banner */}
          <section className="mb-6">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-lg overflow-hidden h-40 flex items-center justify-center relative">
              <div className="text-white text-center">
                <p className="text-xs font-semibold opacity-75 mb-1">Galaxy S26 Series</p>
                <p className="text-2xl font-bold">Galaxy AI</p>
              </div>
            </div>
          </section>

          {/* Samsung AI Devices Section */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-black mb-1">
              SAMSUNG AI Devices.
            </h3>
            <p className="text-gray-600 text-xs mb-4 font-medium">
              AI powered 5G Smartphones at a special price
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
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
              ].map((product) => (
                <div
                  key={product.name}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="h-32 rounded-lg mb-3 flex items-center justify-center overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-black text-xs mb-1">
                    {product.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2 font-medium">
                    {product.series}
                  </p>
                  <p className="text-base font-bold text-black">
                    {product.price}
                    <span className="text-xs text-gray-500 ml-1 font-normal">
                      {product.period}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            {/* Red accent line */}
            <div className="h-0.5 bg-red-600 w-8 mt-4"></div>
          </section>

          {/* Explore Vouchers Section */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-black mb-1">
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
        className="fixed bottom-6 right-6 bg-red-600 text-white rounded-full p-3 shadow-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-1 font-semibold z-50"
      >
        {showChat ? (
          <X size={20} />
        ) : (
          <>
            <MessageCircle size={20} />
            <span className="text-xs">Chat with us</span>
          </>
        )}
      </button>

      {/* Chat Panel */}
      {showChat && (
        <div className="fixed bottom-24 right-6 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-72 z-50">
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
    </div>
  );
}
