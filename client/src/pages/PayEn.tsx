import {
  Home as HomeIcon,
  Settings,
  CreditCard,
  ShoppingCart,
  MoreHorizontal,
  MessageCircle,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function PayEn() {
  const [showChat, setShowChat] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePayment = () => {
    if (!phoneNumber || !amount) {
      alert("Please enter phone number and amount");
      return;
    }
    alert(`Processing payment: ${amount} KWD for number ${phoneNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24 ltr">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/en">
            <a className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200">
              EN
            </a>
          </Link>
          <h1 className="text-center flex-1 font-bold text-lg">
            Welcome Ooredoo User
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowChat(!showChat)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <MessageCircle className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black mb-2">Pay Bill</h2>
          <p className="text-sm text-gray-600">
            Pay your bill easily and quickly through multiple secure payment methods
          </p>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          {/* Phone Number Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your phone number without country code (e.g., 50000000)
            </p>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Amount (Kuwaiti Dinar)
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum: 0.5 KWD | Maximum: 500 KWD
            </p>
          </div>

          {/* Quick Amount Buttons */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-800 mb-3">
              Quick Amounts
            </p>
            <div className="grid grid-cols-4 gap-2">
              {["5", "10", "20", "50"].map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value)}
                  className="py-2 px-3 border border-gray-300 rounded-lg hover:border-red-600 hover:bg-red-50 font-semibold text-sm transition-colors"
                >
                  {value} د.ك
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-800 mb-3">
              Payment Method
            </p>
            <div className="space-y-2">
              {[
                { id: "card", label: "Credit/Debit Card" },
                { id: "wallet", label: "Digital Wallet" },
                { id: "bank", label: "Bank Transfer" },
              ].map((method) => (
                <label
                  key={method.id}
                  className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-red-600 cursor-pointer"
                  />
                  <span className="ml-3 text-gray-800 font-medium">
                    {method.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mb-3"
          >
            Continue Payment
          </button>

          {/* Cancel Button */}
          <Link href="/en">
            <a className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
              Cancel
            </a>
          </Link>
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ All transactions are protected with SSL encryption</li>
            <li>✓ Your card details are not stored</li>
            <li>✓ Payment process is safe and fast</li>
          </ul>
        </div>
      </main>

      {/* Chat Button */}
      {showChat && (
        <div className="fixed bottom-32 left-4 bg-white rounded-lg shadow-lg p-4 w-80 z-40">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">Customer Support</h3>
            <button
              onClick={() => setShowChat(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            How can we help you?
          </p>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">
              Payment Issues
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">
              General Inquiry
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">
              Complaint or Suggestion
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-24 left-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg z-30 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-20 z-50">
        <button className="flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 transition-colors">
          <MoreHorizontal className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600 mt-1">More</span>
        </button>
        <button className="flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 transition-colors">
          <Settings className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600 mt-1">Manage</span>
        </button>
        <Link href="/pay-en">
          <a className="flex flex-col items-center justify-center w-full h-full bg-yellow-100 border-t-2 border-yellow-400">
            <CreditCard className="w-6 h-6 text-yellow-600" />
            <span className="text-xs text-yellow-600 mt-1 font-semibold">Pay</span>
          </a>
        </Link>
        <button className="flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 transition-colors">
          <ShoppingCart className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600 mt-1">Shop</span>
        </button>
        <Link href="/en">
          <a className="flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 transition-colors">
            <HomeIcon className="w-6 h-6 text-gray-600" />
            <span className="text-xs text-gray-600 mt-1">Home</span>
          </a>
        </Link>
      </nav>
    </div>
  );
}
