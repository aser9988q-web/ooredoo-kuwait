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

export default function Pay() {
  const [showChat, setShowChat] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePayment = () => {
    if (!phoneNumber || !amount) {
      alert("الرجاء إدخال رقم الهاتف والمبلغ");
      return;
    }
    alert(`جاري معالجة الدفع: ${amount} دينار كويتي للرقم ${phoneNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24 rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowChat(!showChat)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <MessageCircle className="w-5 h-5 text-red-600" />
            </button>
          </div>
          <h1 className="text-center flex-1 font-bold text-lg">
            مرحبا مستخدم Ooredoo
          </h1>
          <Link href="/">
            <a className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200">
              AR
            </a>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black mb-2">دفع الفاتورة</h2>
          <p className="text-sm text-gray-600">
            ادفع فاتورتك بسهولة وسرعة عبر عدة طرق دفع آمنة
          </p>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          {/* Phone Number Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              رقم الهاتف
            </label>
            <input
              type="tel"
              placeholder="أدخل رقم الهاتف"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              أدخل رقم هاتفك بدون رمز الدولة (مثال: 50000000)
            </p>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              المبلغ (دينار كويتي)
            </label>
            <input
              type="number"
              placeholder="أدخل المبلغ"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              الحد الأدنى: 0.5 د.ك | الحد الأقصى: 500 د.ك
            </p>
          </div>

          {/* Quick Amount Buttons */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-800 mb-3">
              مبالغ سريعة
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
              طريقة الدفع
            </p>
            <div className="space-y-2">
              {[
                { id: "card", label: "بطاقة ائتمان/خصم" },
                { id: "wallet", label: "محفظة رقمية" },
                { id: "bank", label: "تحويل بنكي" },
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
                  <span className="mr-3 text-gray-800 font-medium">
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
            متابعة الدفع
          </button>

          {/* Cancel Button */}
          <Link href="/">
            <a className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
              إلغاء
            </a>
          </Link>
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">معلومات مهمة</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ جميع المعاملات محمية بتشفير SSL</li>
            <li>✓ لا يتم حفظ بيانات بطاقتك</li>
            <li>✓ عملية الدفع آمنة وسريعة</li>
          </ul>
        </div>
      </main>

      {/* Chat Button */}
      {showChat && (
        <div className="fixed bottom-32 right-4 bg-white rounded-lg shadow-lg p-4 w-80 z-40">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">دعم العملاء</h3>
            <button
              onClick={() => setShowChat(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            كيف يمكننا مساعدتك؟
          </p>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">
              مشاكل في الدفع
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">
              استفسار عام
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">
              شكوى أو اقتراح
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-24 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg z-30 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-20 z-50">
        <Link href="/">
          <a className="flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 transition-colors">
            <HomeIcon className="w-6 h-6 text-gray-600" />
            <span className="text-xs text-gray-600 mt-1">الرئيسية</span>
          </a>
        </Link>
        <button className="flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 transition-colors">
          <ShoppingCart className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600 mt-1">المنجر</span>
        </button>
        <Link href="/pay">
          <a className="flex flex-col items-center justify-center w-full h-full bg-yellow-100 border-t-2 border-yellow-400">
            <CreditCard className="w-6 h-6 text-yellow-600" />
            <span className="text-xs text-yellow-600 mt-1 font-semibold">دفع</span>
          </a>
        </Link>
        <button className="flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 transition-colors">
          <Settings className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600 mt-1">إدارة</span>
        </button>
        <button className="flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 transition-colors">
          <MoreHorizontal className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600 mt-1">المزيد</span>
        </button>
      </nav>
    </div>
  );
}
