import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { API_URL, RAZORPAY_ID } from "../../config";
import "./pricing.css";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

export default function Pricing() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${API_URL}subscription/plans`,
          {
            withCredentials: true,
          }
        );

        setPlans(response.data.message|| []);
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Unable to load pricing plans"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const visiblePlans = useMemo(() => {
    return plans?.filter((plan) => {
      if (plan.billingPeriod === "free") {
        return true;
      }

      return plan.billingPeriod === billingPeriod;
    });
  }, [plans, billingPeriod]);

  const handleSelectPlan = async (plan) => {
    try {
      setLoadingPlan(plan._id);

      /*
       * FREE PLAN
       */
      if (plan.billingPeriod === "free") {
        await axios.post(
          `${API_URL}subscription/activate-free`,
          {
            planId: plan._id,
          },
          {
            withCredentials: true,
          }
        );

        toast.success("Free plan activated!");

        navigate("/admin");

        return;
      }

      /*
       * Load Razorpay Checkout
       */
      const loaded = await loadRazorpay();

      if (!loaded) {
        toast.error(
          "Unable to load Razorpay. Please try again."
        );

        return;
      }

      /*
       * Create Razorpay subscription
       * through YOUR backend.
       */
      const response = await axios.post(
        `${API_URL}subscription/create`,
        {
          planId: plan._id,
        },
        {
          withCredentials: true,
        }
      );

      const data = response.data.message;

      /*
       * Open Razorpay Checkout.
       */
      const options = {
        key: data.key,

        subscription_id: data.subscriptionId,

        name: "Nexgn",

        description: `${plan.name} ${
          plan.billingPeriod === "yearly"
            ? "Annual"
            : "Monthly"
        } Subscription`,

        image:
          "https://prod.nexgn.cloud/template/logo.png",

        prefill: {
          name: data.user?.name || "",
          email: data.user?.email || "",
          contact: data.user?.phone_no || "",
        },

        notes: {
          planId: plan._id,
          planName: plan.name,
          billingPeriod: plan.billingPeriod,
        },

        theme: {
          color: "#FF0915",
        },

        handler: async function (razorpayResponse) {
          try {
            const verifyResponse = await axios.post(
              `${API_URL}subscription/verify`,
              {
                razorpay_payment_id:
                  razorpayResponse.razorpay_payment_id,

                razorpay_subscription_id:
                  razorpayResponse.razorpay_subscription_id,

                razorpay_signature:
                  razorpayResponse.razorpay_signature,
              },
              {
                withCredentials: true,
              }
            );

            if (
              verifyResponse.data?.data?.verified
            ) {
              toast.success(
                "Payment successful! Your subscription is being activated."
              );

              /*
               * Do not assume active immediately.
               * Webhook updates the final state.
               */
              setTimeout(() => {
                navigate("/admin");
              }, 1200);
            }
          } catch (error) {
            console.error(
              "Verification error:",
              error
            );

            toast.error(
              error.response?.data?.message ||
                "Payment verification failed"
            );
          }
        },

        modal: {
          confirm_close: true,
          escape: true,
          backdropclose: false,

          ondismiss: () => {
            setLoadingPlan(null);

            toast.info(
              "Payment window closed"
            );
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        (response) => {
          console.error(
            "Razorpay payment failed:",
            response.error
          );

          toast.error(
            response.error?.description ||
              "Payment failed"
          );

          setLoadingPlan(null);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to start subscription"
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="pricing-page pricing-page--loading">
        <div className="pricing-loader" />
        <p>Loading plans...</p>
      </div>
    );
  }

//   const handleTestPayment = async () => {

//     try {

//         const loaded =
//             await loadRazorpay();

//         if (!loaded) {
//             toast.error(
//                 "Razorpay failed to load"
//             );
//             return;
//         }

//         /*
//          * ₹10 test payment
//          *
//          * 1000 paise = ₹10
//          */
//         const response =
//             await axios.post(
//                 `http://localhost:5000/api/create-order`,
//                 {
//                     amount: 200,
//                     currency: "INR",
//                     receipt:
//                         `test_${Date.now()}`
//                 },{withCredentials:true}
//             );

//         const order =
//             response.data.data;


//         console.log(
//             "Razorpay Order:",
//             order
//         );


//         const options = {

//             key:RAZORPAY_ID,

//             amount:
//                 order.amount,

//             currency:
//                 order.currency,

//             name: "Nexgn",

//             description:
//                 "Temporary Test Payment",

//             order_id:
//                 order.order_id,

//             handler:
//                 async function (
//                     paymentResponse
//                 ) {

//                     console.log(
//                         "Payment response:",
//                         paymentResponse
//                     );


//                     try {

//                         const verify =
//                             await axios.post(
//                                 `${API_URL}api/verify-payment`,
//                                 {
//                                     razorpay_order_id:
//                                         paymentResponse
//                                             .razorpay_order_id,

//                                     razorpay_payment_id:
//                                         paymentResponse
//                                             .razorpay_payment_id,

//                                     razorpay_signature:
//                                         paymentResponse
//                                             .razorpay_signature
//                                 }
//                             );


//                         if (
//                             verify.data
//                                 .verified
//                         ) {

//                             toast.success(
//                                 "Test payment successful!"
//                             );

//                             console.log(
//                                 "VERIFIED:",
//                                 verify.data
//                             );

//                         }

//                     } catch (error) {

//                         toast.error(
//                             error.response
//                                 ?.data
//                                 ?.message ||
//                             "Payment verification failed"
//                         );
//                     }
//                 },


//             prefill: {
//                 name: "Mohammad Ziya",
//                 email: "test@nexgn.cloud"
//             },


//             theme: {
//                 color: "#FF0915"
//             },


//             modal: {

//                 ondismiss: () => {

//                     toast.info(
//                         "Payment cancelled"
//                     );

//                 }

//             }
//         };


//         const razorpay =
//             new window.Razorpay(
//                 options
//             );


//         razorpay.on(
//             "payment.failed",
//             (response) => {

//                 console.error(
//                     "Payment failed:",
//                     response.error
//                 );

//                 toast.error(
//                     response.error
//                         ?.description ||
//                     "Payment failed"
//                 );
//             }
//         );


//         razorpay.open();

//     } catch (error) {

//         console.error(
//             "Payment error:",
//             error
//         );

//         toast.error(
//             error.response
//                 ?.data
//                 ?.message ||
//             "Unable to start payment"
//         );
//     }
// };

  return (
    <div className="pricing-page">
      {/* HEADER */}

      {/* <button onClick={handleTestPayment}>
    Test Razorpay Payment
</button> */}

      <header className="pricing-header">
        <button
          type="button"
          className="pricing-logo"
          onClick={() => navigate("/")}
        >
          Nexgn
        </button>

        <button
          type="button"
          className="pricing-login"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </header>

      {/* HERO */}

      <section className="pricing-hero">
        <span className="pricing-eyebrow">
          NEXGN PRICING
        </span>

        <h1>
          Simple pricing.
          <br />
          Powerful signing.
        </h1>

        <p>
          Choose the plan that fits your
          document workflow and scale your
          business with Nexgn.
        </p>

        {/* MONTHLY / ANNUAL */}

        <div className="pricing-toggle">
          <button
            type="button"
            className={
              billingPeriod === "monthly"
                ? "active"
                : ""
            }
            onClick={() =>
              setBillingPeriod("monthly")
            }
          >
            Monthly
          </button>

          <button
            type="button"
            className={
              billingPeriod === "yearly"
                ? "active"
                : ""
            }
            onClick={() =>
              setBillingPeriod("yearly")
            }
          >
            Annual
          </button>
        </div>
      </section>

      {/* PLANS */}

      <section className="pricing-grid">
        {visiblePlans.map((plan) => {
          const isFree =
            plan.billingPeriod === "free";

          const isStarter =
            plan.slug === "starter";

          const isBusiness =
            plan.slug === "business";

          const isLoading =
            loadingPlan === plan._id;

          return (
            <article
              key={plan._id}
              className={[
                "pricing-card",
                isStarter
                  ? "pricing-card--starter"
                  : "",
                isBusiness
                  ? "pricing-card--business"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* TOP */}

              <div className="pricing-card-top">
                <div className="pricing-card-price">
                  <span className="pricing-currency">
                    ₹
                  </span>

                  <span className="pricing-amount">
                    {(plan.amount / 100).toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span className="pricing-duration">
                    /
                    {isFree
                      ? "month"
                      : plan.billingPeriod ===
                        "yearly"
                      ? "year"
                      : "month"}
                  </span>
                </div>

                <div className="pricing-card-badges">
                  <span className="pricing-plan-badge">
                    {plan.name}
                  </span>

                  {isStarter && (
                    <span className="pricing-popular">
                      Popular
                    </span>
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}

              <p className="pricing-description">
                {plan.description}
              </p>

              {/* BUTTON */}

              <button
                type="button"
                className="pricing-select-button"
                disabled={isLoading}
                onClick={() =>
                  handleSelectPlan(plan)
                }
              >
                {isLoading
                  ? "Processing..."
                  : isFree
                  ? "Choose Free"
                  : `Choose ${plan.name}`}
              </button>

              {/* FEATURES */}

              <div className="pricing-features">
                {plan.features?.map(
                  (feature) => (
                    <div
                      className="pricing-feature"
                      key={feature}
                    >
                      <span className="pricing-check">
                        ✓
                      </span>

                      <span>
                        {feature}
                      </span>
                    </div>
                  )
                )}
              </div>
            </article>
          );
        })}
      </section>

      {/* FOOTER */}

      <footer className="pricing-footer">
        <p>
          Secure payments powered by Razorpay
        </p>

        <p>
          © {new Date().getFullYear()} Nexgn.
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}