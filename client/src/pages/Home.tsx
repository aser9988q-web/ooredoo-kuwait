import { useState } from "react";
import { Link } from "wouter";
import { Home as HomeIcon, CreditCard, ShoppingCart, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("5");
  const [activeNav, setActiveNav] = useState("home");

  const handleContinue = () => {
    if (mobileNumber && amount) {
      // Navigate to payment page
      window.location.href = `/unified-payment?phone=${mobileNumber}&amount=${amount}`;
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar Navigation */}
      <div className="w-24 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-8 gap-8">
        {/* Ooredoo Logo */}
        <div className="text-center">
          <div className="text-red-600 font-bold text-xl">ooredoo</div>
          <div className="text-xs text-gray-500">®</div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-6 w-full">
          <button
            onClick={() => setActiveNav("home")}
            className={`flex flex-col items-center gap-2 py-3 px-4 rounded-lg transition ${
              activeNav === "home"
                ? "bg-green-100 text-green-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <HomeIcon size={24} />
            <span className="text-xs font-medium">Home</span>
          </button>

          <Link href="/unified-payment">
            <button
              onClick={() => setActiveNav("pay")}
              className={`flex flex-col items-center gap-2 py-3 px-4 rounded-lg transition ${
                activeNav === "pay"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <CreditCard size={24} />
              <span className="text-xs font-medium">Pay</span>
            </button>
          </Link>

          <button
            onClick={() => setActiveNav("shop")}
            className={`flex flex-col items-center gap-2 py-3 px-4 rounded-lg transition ${
              activeNav === "shop"
                ? "bg-green-100 text-green-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ShoppingCart size={24} />
            <span className="text-xs font-medium">Shop</span>
          </button>

          <button
            onClick={() => setActiveNav("more")}
            className={`flex flex-col items-center gap-2 py-3 px-4 rounded-lg transition ${
              activeNav === "more"
                ? "bg-green-100 text-green-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <MoreHorizontal size={24} />
            <span className="text-xs font-medium">More</span>
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Pay</h1>
            <div className="flex gap-4">
              <button className="text-gray-600 hover:text-gray-800">عربي</button>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white mb-8 shadow-lg">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold inline-block mb-2">
                  UPGRADE TODAY
                </div>
                <h2 className="text-3xl font-bold mb-2">ENROLL & RENEW WITH SMART PAY!</h2>
                <p className="text-blue-100 text-sm">Now available on our Prepaid plans</p>
              </div>
              <div className="w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl">👨</div>
                  <p className="text-xs mt-2">Smart Pay</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            {/* Mobile Number Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MOBILE NUMBER
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter mobile number"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Amount Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AMOUNT
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="tel"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <span className="text-lg font-semibold text-gray-700">KD</span>
              </div>
            </div>

            {/* Pay for Another Number Button */}
            <button className="w-full py-3 border-2 border-yellow-400 text-yellow-500 font-bold rounded-full hover:bg-yellow-50 transition">
              PAY FOR ANOTHER NUMBER
            </button>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full py-3 bg-yellow-400 text-gray-800 font-bold rounded-full hover:bg-yellow-500 transition"
            >
              CONTINUE
            </button>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                <span className="text-red-600 text-lg">📱</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Bill payment / Recharge</p>
                <p className="text-sm text-gray-600">Total: KD 8.000</p>
              </div>
            </div>
            <button className="w-full py-3 border-2 border-yellow-300 text-gray-800 font-bold rounded-full hover:bg-yellow-50 transition">
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
