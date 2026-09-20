import React, { useEffect, useState } from "react";
import axios from "axios";
import { CreditCard, Download, RefreshCw, AlertCircle } from "lucide-react";
import { API_URL } from "../../../config";
import { BillingSkeleton } from "../../../components/common/Skeleton";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Billing() {
  const [subscription, setSubscription] = useState({});
  const [receipt, setReceipt] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}subscription/mysubscription`,
          { withCredentials: true }
        );

        const data = response.data.message;
        setSubscription(data);
        setReceipt(
          `https://invoices.razorpay.com/v1/t/${response?.data?.message?.lastInvoiceId}`
        );
      } catch (error) {
        console.error(error.message);
        toast.error(
            error.response?.data?.message ||
            "Something Went Wrong"
          );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
  return <BillingSkeleton />;
}

  return (
    <>
      <div className="admin-settings-card admin-settings-card--billing">
        <h2 className="admin-settings-card__title">Billing</h2>
        <div className="admin-settings-card__divider" />

        <div className="admin-billing-section">
          <h3 className="admin-billing-section-title">Current Plan</h3>
          <div className="admin-billing-plan-card">
            <div className="admin-billing-plan-header">
              <div className="admin-billing-plan-info">
                <h4 className="admin-billing-plan-name">
                  {subscription?.planId?.name} Plan
                </h4>
                <p className="admin-billing-plan-billed">
                  Billed {subscription?.planId?.billingPeriod}
                </p>
              </div>

              <div className="admin-billing-plan-price">
                <span className="price-amount">
                  {subscription?.planId?.amount/100}
                </span>
                <span className="price-period">/month</span>
              </div>
            </div>

            <div className="admin-billing-plan-divider" />

            <ul className="admin-billing-plan-features">
              {subscription?.planId?.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <div className="admin-billing-plan-footer">
              <span className="admin-billing-next-date">
                Next billing date :
                {subscription?.currentPeriodEnd &&
                  new Date(subscription?.currentPeriodEnd).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
              </span>
              <button type="button" className="admin-billing-upgrade-btn" onClick={()=>{navigate("/pricing")}}>
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>

        <div className="admin-billing-section">
          <h3 className="admin-billing-section-title">Payment Method</h3>
          <div className="admin-billing-payment-card">
            <div className="admin-billing-card-info">
              <div className="admin-billing-card-icon-wrapper">
                <CreditCard size={16} color="#666" />
                <span className="admin-billing-card-brand">Visa</span>
              </div>
              <div className="admin-billing-card-details">
                <span className="card-number">Visa ending in 4242</span>
                <span className="card-expiry">Expired in 2028</span>
              </div>
            </div>
            <button type="button" className="admin-billing-edit-btn">
              Edit
            </button>
          </div>
        </div>

        <div className="admin-billing-section">
          <h3 className="admin-billing-section-title">Billing Address</h3>
          <div className="admin-billing-address-card">
            <div className="admin-billing-invoice-info">
              <span className="invoice-title">Invoice</span>
              <span className="invoice-date">
                {subscription?.startDate &&
                  new Date(subscription.startDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
              </span>
            </div>

            <div className="admin-billing-invoice-actions">
              <button type="button" className="icon-btn">
                <a href={receipt}>
                  <Download size={16} color="#666" />
                </a>
              </button>

              <div className="tooltip-container">
                <button type="button" className="icon-btn">
                  <RefreshCw size={16} color="#666" />
                </button>
                <div className="invoice-error-tooltip">
                  <AlertCircle size={14} color="#666" />
                  <span>Unable to download. Refresh and try again</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <LoadingScreen
          state="connecting"
          size={64}
          theme="dark"
          message="Signing Up"
        />
      )}
    </>
  );
}
