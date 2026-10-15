import { useState } from "react";
import { formatPrice } from "../data/courses";
import API from "../api/axios";
import { ShieldCheck, CreditCard, Zap, Loader2 } from "lucide-react";

export default function PaymentModal({ course, onClose, onSuccess, processing }) {
  const [paying, setPaying] = useState(false);
  const [method, setMethod] = useState("payu"); // "payu" | "direct"
  const [errorMsg, setErrorMsg] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");

  async function handleApplyCoupon() {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponMessage("Enter a coupon code first.");
      setAppliedCoupon(null);
      return;
    }
    setCouponLoading(true);
    setCouponMessage("");
    try {
      const { data } = await API.post("/coupons/validate", {
        code,
        amount: Number(course.price),
      });
      if (!data.success || !data.data) throw new Error(data.message || "Coupon could not be applied");
      setAppliedCoupon(data.data);
      setCouponCode(data.data.code || code);
      setCouponMessage(`✓ Coupon applied! You saved ${formatPrice(data.data.discountAmount)}.`);
    } catch (err) {
      setAppliedCoupon(null);
      setCouponMessage(err.response?.data?.message || err.message || "Invalid coupon code.");
    } finally {
      setCouponLoading(false);
    }
  }

  async function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponMessage("");
    setCouponCode("");
  }

  async function handlePayUCheckout(event) {
    event.preventDefault();
    setPaying(true);
    setErrorMsg("");

    if (method === "direct") {
      // Instant simulation / unlock for testing
      try {
        await onSuccess();
      } catch (err) {
        setErrorMsg("Purchase failed. Please try again.");
      } finally {
        setPaying(false);
      }
      return;
    }

    try {
      // 1. Request PayU hash and transaction params from Node backend
      const { data } = await API.post("/payment/payu/initiate", {
        courseId: course.id,
        couponCode: appliedCoupon?.code || "",
      });

      if (!data.success || !data.data) {
        throw new Error(data.message || "Failed to initialize PayU payment");
      }

      const { action, params } = data.data;

      // 2. Create and submit hidden HTML form to PayU gateway URL
      const form = document.createElement("form");
      form.method = "POST";
      form.action = action;

      Object.entries(params).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value || "";
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || err.message || "Failed to redirect to PayU. Please try again."
      );
      setPaying(false);
    }
  }

  const busy = paying || processing;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
        <div className="flex items-start justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-forest bg-mint px-2 py-0.5 rounded">
              Secure Checkout
            </span>
            <h2 className="mt-1 text-lg font-bold text-gray-900">{course.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        <div className="flex items-baseline justify-between bg-gray-50 p-4 rounded-xl">
          <span className="text-xs text-gray-500 font-medium">Total Payable Amount:</span>
          <div className="text-right">
            {appliedCoupon && (
              <div className="text-xs text-gray-400 line-through">{formatPrice(course.price)}</div>
            )}
            <span className="text-2xl font-extrabold text-forest">
              {formatPrice(appliedCoupon ? appliedCoupon.finalAmount : course.price)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-600 block">Have a coupon?</label>
          <div className="flex gap-2">
            <input
              value={couponCode}
              onChange={(event) => { setCouponCode(event.target.value.toUpperCase()); if (appliedCoupon) setAppliedCoupon(null); setCouponMessage(""); }}
              placeholder="Enter coupon code"
              disabled={busy || couponLoading || Boolean(appliedCoupon)}
              className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm uppercase outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20"
              aria-label="Coupon code"
            />
            {appliedCoupon ? (
              <button type="button" onClick={handleRemoveCoupon} disabled={busy} className="rounded-xl border border-gray-200 px-4 text-sm font-semibold text-gray-600 hover:bg-gray-50">Remove</button>
            ) : (
              <button type="button" onClick={handleApplyCoupon} disabled={busy || couponLoading} className="rounded-xl bg-forest px-4 text-sm font-semibold text-white transition hover:bg-leaf disabled:opacity-60">
                {couponLoading ? "Checking..." : "Apply"}
              </button>
            )}
          </div>
          {couponMessage && (
            <div className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-300 animate-[pulse_0.6s_ease-in-out_1] ${appliedCoupon ? "border border-green-200 bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`} role="status">
              {couponMessage}
            </div>
          )}
          {appliedCoupon && (
            <div className="flex items-center justify-between text-xs text-green-700">
              <span>Discount ({appliedCoupon.code})</span>
              <span className="font-bold">−{formatPrice(appliedCoupon.discountAmount)}</span>
            </div>
          )}
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Payment Method Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-600 block">Select Gateway:</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMethod("payu")}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition ${
                method === "payu"
                  ? "border-leaf bg-mint/50 text-forest ring-1 ring-leaf"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              PayU Gateway
            </button>

            <button
              type="button"
              onClick={() => setMethod("direct")}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition ${
                method === "direct"
                  ? "border-leaf bg-mint/50 text-forest ring-1 ring-leaf"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              Test Unlock
            </button>
          </div>
        </div>

        <form onSubmit={handlePayUCheckout} className="space-y-4 pt-2">
          <div className="text-[11px] text-gray-500 bg-gray-50 p-3 rounded-lg flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-leaf shrink-0" />
            <span>
              {method === "payu"
                ? "You will be securely redirected to PayU to pay via UPI (GPay, PhonePe, Paytm), Card, or NetBanking."
                : "Instant test unlock for development demonstration."}
            </span>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="btn-shine w-full rounded-full bg-leaf py-3 font-bold text-white hover:bg-forest disabled:opacity-70 transition text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            {busy ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Connecting Gateway...
              </>
            ) : method === "payu" ? (
              `Proceed to PayU (${formatPrice(appliedCoupon ? appliedCoupon.finalAmount : course.price)})`
            ) : (
              `Unlock Course Instantly (${formatPrice(appliedCoupon ? appliedCoupon.finalAmount : course.price)})`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
