import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const [location, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Default admin credentials
  const DEFAULT_USERNAME = "admin";
  const DEFAULT_PASSWORD = "admin123";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate credentials
      if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
        // Store admin session in localStorage
        localStorage.setItem("adminToken", "true");
        localStorage.setItem("adminUsername", username);
        
        // Redirect to admin dashboard
        setLocation("/admin");
      } else {
        setError("اسم المستخدم أو كلمة المرور غير صحيحة");
      }
    } catch (err) {
      setError("حدث خطأ أثناء محاولة تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">لوحة التحكم</h1>
          <p className="text-gray-600">Admin Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              اسم المستخدم
            </label>
            <Input
              type="text"
              placeholder="أدخل اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              كلمة المرور
            </label>
            <Input
              type="password"
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
          >
            {loading ? "جاري التحقق..." : "تسجيل الدخول"}
          </Button>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700 mb-2 font-semibold">بيانات الدخول الافتراضية:</p>
          <p className="text-sm text-gray-600">اسم المستخدم: <span className="font-mono">admin</span></p>
          <p className="text-sm text-gray-600">كلمة المرور: <span className="font-mono">admin123</span></p>
        </div>
      </div>
    </div>
  );
}
