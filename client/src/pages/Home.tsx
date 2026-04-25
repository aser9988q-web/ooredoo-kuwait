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
import {
  RechargeIcon,
  PayBillsIcon,
  KuwaitIcon,
  UpdateInfoIcon,
} from "@/components/OoredooIcons";
import { useState } from "react";

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      {/* Header */}
      <header className="border-b border-gray-200 px-8 py-4 flex justify-between items-center bg-white">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-black">Hello</h1>
          <p className="text-sm text-gray-700">
            Ooredoo user?{" "}
            <button className="text-red-600 font-semibold hover:underline">
              Login
            </button>
          </p>
        </div>
        <div className="w-28 h-10 bg-red-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">ooredoo</span>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-48 border-r border-gray-200 py-8 px-4 bg-white">
          <nav className="space-y-1">
            {[
              { icon: HomeIcon, label: "Home", active: true },
              { icon: Settings, label: "Manage", active: false },
              { icon: CreditCard, label: "Pay", active: false },
              { icon: ShoppingCart, label: "Shop", active: false },
              { icon: MoreHorizontal, label: "More", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded transition-all duration-200 ${
                  item.active
                    ? "bg-red-100 text-red-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 font-medium"
                }`}
              >
                <item.icon size={22} strokeWidth={1.5} />
                <span className="text-base">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
          {/* Upgrade Section */}
          <section className="bg-white rounded-lg p-8 mb-8 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2 leading-tight">
                  UPGRADE
                  <br />
                  YOUR{" "}
                  <span className="text-red-600 font-black">WORLD</span>
                </h2>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-2 border-gray-400 text-gray-700 rounded-full px-8 py-2 font-semibold hover:bg-gray-50"
                >
                  Add Existing Line
                </Button>
                <Button className="bg-black text-white rounded-full px-8 py-2 font-semibold hover:bg-gray-900">
                  Join Us
                </Button>
              </div>
            </div>
          </section>

          {/* Shortcuts Section */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-black mb-6">Shortcuts</h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  icon: RechargeIcon,
                  label: "Recharge",
                  badge: "51",
                },
                {
                  icon: PayBillsIcon,
                  label: "Pay Bills",
                  badge: "51",
                },
                {
                  icon: KuwaitIcon,
                  label: "51 Kuwait",
                  badge: "51",
                },
                {
                  icon: UpdateInfoIcon,
                  label: "Update My Info",
                  badge: "51",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="relative bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold rounded px-2 py-1">
                    {item.badge}
                  </div>
                  <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">
                    <item.icon />
                  </div>
                  <p className="text-sm font-semibold text-black">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Samsung Banner */}
          <section className="mb-8">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-lg overflow-hidden h-56 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              </div>
              <div className="text-white text-center relative z-10">
                <p className="text-sm font-semibold opacity-80 mb-2">Galaxy S26 Series</p>
                <p className="text-4xl font-bold">Galaxy AI</p>
              </div>
            </div>
          </section>

          {/* Samsung AI Devices Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-black mb-2">
              SAMSUNG AI Devices.
            </h3>
            <p className="text-gray-600 text-sm mb-8 font-medium">
              AI powered 5G Smartphones at a special price
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  name: "Samsung S26 Ultra",
                  series: "Galaxy S26 Series",
                  price: "KD 33",
                  period: "/month",
                  image: "bg-gradient-to-br from-gray-400 to-gray-600",
                },
                {
                  name: "Samsung S26 Plus",
                  series: "Galaxy S26 Series",
                  price: "KD 26",
                  period: "/month",
                  image: "bg-gradient-to-br from-purple-400 to-purple-600",
                },
              ].map((product) => (
                <div
                  key={product.name}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className={`${product.image} h-40 rounded-lg mb-6 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <span className="text-white font-semibold opacity-0">
                      Product
                    </span>
                  </div>
                  <h4 className="font-bold text-black text-base mb-2">
                    {product.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-4 font-medium">
                    {product.series}
                  </p>
                  <p className="text-2xl font-bold text-black">
                    {product.price}
                    <span className="text-xs text-gray-500 ml-2 font-normal">
                      {product.period}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            {/* Red accent line */}
            <div className="h-1 bg-red-600 w-12 mt-8"></div>
          </section>

          {/* Explore Vouchers Section */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-black mb-2">
              Explore Vouchers
            </h3>
            <p className="text-gray-600 text-sm font-medium">
              Enjoy deals & Promos on other covered with special
            </p>
          </section>
        </main>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 right-8 bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-2 font-semibold z-50"
      >
        {showChat ? (
          <X size={24} />
        ) : (
          <>
            <MessageCircle size={24} />
            <span className="text-sm">Chat with us</span>
          </>
        )}
      </button>

      {/* Chat Panel */}
      {showChat && (
        <div className="fixed bottom-28 right-8 bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-80 z-50 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-black text-base">Having trouble?</h4>
            <button
              onClick={() => setShowChat(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            We're here to help! Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      )}
    </div>
  );
}
