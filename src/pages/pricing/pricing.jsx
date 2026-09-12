import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { API_URL } from "../../config";
import { Skeleton } from "../../components/common/Skeleton";
import "./pricing.css";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};



export default function Pricing() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState(null);

  const pricingCarouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [billingCycle, setBillingCycle] = useState("monthly");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${API_URL}subscription/plans`,
          { withCredentials: true }
        );

        setPlans(response.data?.message || []);
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
    const order = {
      free: 1,
      starter: 2,
      business: 3,
    };

    return [...plans].sort(
      (a, b) =>
        (order[a.slug] || 99) -
        (order[b.slug] || 99)
    );
  }, [plans]);

  // Only show the free plan plus whichever paid plans
  // match the selected billing cycle.
  const filteredPlans = useMemo(() => {
    return visiblePlans.filter(
      (plan) =>
        plan.billingPeriod === "free" ||
        plan.billingPeriod === billingCycle
    );
  }, [visiblePlans, billingCycle]);

  // Work out real savings for each yearly plan by
  // comparing it against its monthly counterpart.
  const yearlySavingsBySlug = useMemo(() => {
    const savings = {};

    visiblePlans.forEach((plan) => {
      if (plan.billingPeriod !== "yearly") return;

      const monthlyCounterpart = visiblePlans.find(
        (p) =>
          p.slug === plan.slug &&
          p.billingPeriod === "monthly"
      );

      if (!monthlyCounterpart) return;

      const yearlyCost = plan.amount || 0;
      const monthlyCostAnnualized =
        (monthlyCounterpart.amount || 0) * 12;

      if (monthlyCostAnnualized <= 0) return;

      const percent = Math.round(
        ((monthlyCostAnnualized - yearlyCost) /
          monthlyCostAnnualized) *
          100
      );

      if (percent > 0) {
        savings[plan.slug] = percent;
      }
    });

    return savings;
  }, [visiblePlans]);

  const maxYearlySavings = useMemo(() => {
    const values = Object.values(
      yearlySavingsBySlug
    );

    return values.length ? Math.max(...values) : 0;
  }, [yearlySavingsBySlug]);

  const handleSelectPlan = async (plan) => {
    try {
      setLoadingPlan(plan._id);

      if (plan.billingPeriod === "free") {
        await axios.post(
          `${API_URL}subscription/activate-free`,
          { planId: plan._id },
          { withCredentials: true }
        );

        toast.success("Free plan activated!");
        navigate("/admin");
        return;
      }

      const loaded = await loadRazorpay();

      if (!loaded) {
        toast.error(
          "Unable to load Razorpay. Please try again."
        );
        return;
      }

      const response = await axios.post(
        `${API_URL}subscription/create`,
        { planId: plan._id },
        { withCredentials: true }
      );

      const data = response.data.message;

      const options = {
        key: data.key,
        subscription_id: data.subscriptionId,
        name: "Nexgn",
        description: `${plan.name} ${
          plan.billingPeriod === "yearly"
            ? "Annual"
            : "Monthly"
        } Subscription`,
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
          color: "#FEDFDD",
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
              { withCredentials: true }
            );

            if (
              verifyResponse.data?.data?.verified
            ) {
              toast.success(
                "Payment successful! Your subscription is being activated."
              );

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
            toast.info("Payment window closed");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error(
          "Razorpay payment failed:",
          response.error
        );

        toast.error(
          response.error?.description ||
            "Payment failed"
        );

        setLoadingPlan(null);
      });

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

  useEffect(() => {
    setCurrentSlide(0);

    const carousel = pricingCarouselRef.current;

    if (carousel) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [billingCycle]);

  const handleDotClick = (index) => {
    const carousel = pricingCarouselRef.current;

    if (!carousel) return;

    const cards = carousel.querySelectorAll(
      ".pricingCard"
    );
    const card = cards[index];

    if (!card) return;

    setCurrentSlide(index);

    const targetLeft =
      card.offsetLeft -
      (carousel.clientWidth -
        card.offsetWidth) /
        2;

    carousel.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  };

  const handleScroll = (e) => {
    const carousel = e.currentTarget;

    const cards = carousel.querySelectorAll(
      ".pricingCard"
    );

    if (!cards.length) return;

    const carouselCenter =
      carousel.scrollLeft +
      carousel.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter =
        card.offsetLeft +
        card.offsetWidth / 2;

      const distance = Math.abs(
        carouselCenter - cardCenter
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentSlide(closestIndex);
  };

  const PricingCardSkeleton = () => (
    <div className="pricingCard pricingCard--skeleton">
      <div className="shadow">
        <div className="cardHeader">
          <Skeleton
            width="115px"
            height="32px"
            borderRadius="6px"
          />
          <Skeleton
            width="80px"
            height="24px"
            borderRadius="20px"
          />
        </div>

        <div className="cardDesc1 pricingSkeletonDesc">
          <Skeleton width="90%" height="12px" />
          <Skeleton width="72%" height="12px" />
        </div>

        <Skeleton
          width="100%"
          height="42px"
          borderRadius="12px"
        />
      </div>

      <ul className="featureList pricingSkeletonFeatures">
        {Array.from({ length: 5 }).map(
          (_, index) => (
            <li key={index}>
              <Skeleton
                width="12px"
                height="12px"
                borderRadius="50%"
              />
              <Skeleton
                width={`${70 + (index % 3) * 8}%`}
                height="12px"
              />
            </li>
          )
        )}
      </ul>
    </div>
  );

  return (
    <div className="pricing-page">

      <header className="pricing-header">
        <button
          type="button"
          className="pricing-logo"
          onClick={() =>
            (window.location.href = "https://nexgn.cloud")
          }
        >
                  <svg width="145" height="36" viewBox="0 0 180 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38.6523 0C42.489 0.000225655 45.5996 3.11055 45.5996 6.94727V38.6523C45.5996 38.7397 45.595 38.8265 45.5918 38.9131L34.1758 27.7461C32.8045 26.4047 30.5929 26.4164 29.2363 27.7725L26.6494 30.3604C25.2931 31.7169 25.3054 33.9037 26.6768 35.2451L37.2617 45.5996H7.50293L36.6445 17.0938C38.0155 15.7522 38.0272 13.5644 36.6709 12.208L34.084 9.62109C32.7276 8.2648 30.5159 8.25267 29.1445 9.59375L0 38.1035V8.29199L11.3721 19.416C12.7434 20.7574 14.955 20.7461 16.3115 19.3896L18.8984 16.8018C20.2543 15.4452 20.2422 13.2583 18.8711 11.917L6.69531 0.00585938C6.77894 0.00287788 6.86291 0 6.94727 0H38.6523Z" fill="#E22A2A"/>
        <path d="M68.26 31.336C67.2147 31.336 66.2907 31.1027 65.488 30.636C64.704 30.1507 64.088 29.4973 63.64 28.676C63.192 27.8547 62.968 26.9307 62.968 25.904V16.132C62.968 15.628 62.8467 15.1707 62.604 14.76C62.3613 14.3493 62.0347 14.0227 61.624 13.78C61.2133 13.5373 60.7653 13.416 60.28 13.416C59.7947 13.416 59.3467 13.5373 58.936 13.78C58.544 14.0227 58.2267 14.3493 57.984 14.76C57.76 15.1707 57.648 15.628 57.648 16.132V31H54.96V16.496C54.96 15.4693 55.184 14.5453 55.632 13.724C56.08 12.9027 56.7053 12.2587 57.508 11.792C58.3107 11.3067 59.2347 11.064 60.28 11.064C61.344 11.064 62.2773 11.3067 63.08 11.792C63.8827 12.2587 64.508 12.9027 64.956 13.724C65.404 14.5453 65.628 15.4693 65.628 16.496V26.268C65.628 26.772 65.7493 27.2293 65.992 27.64C66.2347 28.0507 66.552 28.3773 66.944 28.62C67.3547 28.8627 67.7933 28.984 68.26 28.984C68.7267 28.984 69.156 28.8627 69.548 28.62C69.94 28.3773 70.248 28.0507 70.472 27.64C70.7147 27.2293 70.836 26.772 70.836 26.268V11.4H73.524V25.904C73.524 26.9307 73.3 27.8547 72.852 28.676C72.404 29.4973 71.788 30.1507 71.004 30.636C70.22 31.1027 69.3053 31.336 68.26 31.336ZM84.7726 31C83.2046 31 81.8139 30.7107 80.6006 30.132C79.3872 29.5347 78.4352 28.704 77.7446 27.64C77.0726 26.5573 76.7366 25.2973 76.7366 23.86C76.7366 22.4413 77.0259 21.172 77.6046 20.052C78.1832 18.9133 78.9859 18.0173 80.0126 17.364C81.0392 16.7107 82.2339 16.384 83.5966 16.384C85.0712 16.384 86.2939 16.7013 87.2646 17.336C88.2539 17.9707 88.9912 18.8293 89.4766 19.912C89.9619 20.976 90.2046 22.1707 90.2046 23.496C90.2046 23.7013 90.1952 23.916 90.1766 24.14C90.1766 24.364 90.1579 24.56 90.1206 24.728H79.4806C79.5739 25.6053 79.8632 26.352 80.3486 26.968C80.8339 27.5653 81.4499 28.0227 82.1966 28.34C82.9619 28.6387 83.8019 28.788 84.7166 28.788H88.4406V31H84.7726ZM79.4526 22.908H87.6006C87.6006 22.5533 87.5632 22.18 87.4886 21.788C87.4139 21.3773 87.2832 20.9853 87.0966 20.612C86.9099 20.22 86.6579 19.8747 86.3406 19.576C86.0419 19.2587 85.6592 19.0067 85.1926 18.82C84.7446 18.6333 84.2126 18.54 83.5966 18.54C82.9432 18.54 82.3646 18.6707 81.8606 18.932C81.3752 19.1747 80.9552 19.5107 80.6006 19.94C80.2459 20.3507 79.9752 20.8173 79.7886 21.34C79.6019 21.8627 79.4899 22.3853 79.4526 22.908ZM92.6493 31L97.5493 24.42C96.672 24.1213 95.8973 23.692 95.2253 23.132C94.572 22.5533 94.0493 21.8813 93.6573 21.116C93.284 20.332 93.0973 19.5013 93.0973 18.624V16.72H95.7013V18.624C95.7013 19.3147 95.8786 19.9493 96.2333 20.528C96.588 21.1067 97.064 21.5733 97.6613 21.928C98.2586 22.2827 98.9026 22.5067 99.5933 22.6L103.905 16.72H106.761L102.113 23.02C103.084 23.3 103.915 23.7387 104.605 24.336C105.315 24.9147 105.865 25.6147 106.257 26.436C106.649 27.2387 106.845 28.116 106.845 29.068V31H104.269V29.068C104.269 28.3213 104.083 27.6493 103.709 27.052C103.336 26.436 102.832 25.9413 102.197 25.568C101.563 25.176 100.835 24.9427 100.013 24.868L95.5333 31H92.6493ZM112.434 36.684V34.472H119.434C120.125 34.472 120.657 34.2667 121.03 33.856C121.422 33.4453 121.618 32.904 121.618 32.232V28.312H121.562C121.208 28.8533 120.778 29.3387 120.274 29.768C119.77 30.1973 119.192 30.5427 118.538 30.804C117.885 31.0467 117.148 31.168 116.326 31.168C114.982 31.168 113.797 30.86 112.77 30.244C111.744 29.6093 110.941 28.7413 110.362 27.64C109.784 26.52 109.494 25.2413 109.494 23.804C109.494 22.404 109.784 21.144 110.362 20.024C110.941 18.904 111.772 18.0173 112.854 17.364C113.956 16.7107 115.281 16.384 116.83 16.384C118.324 16.384 119.621 16.7013 120.722 17.336C121.824 17.9707 122.673 18.8573 123.27 19.996C123.886 21.116 124.194 22.432 124.194 23.944V32.4C124.194 33.7067 123.812 34.7427 123.046 35.508C122.281 36.292 121.236 36.684 119.91 36.684H112.434ZM116.802 28.956C117.754 28.956 118.585 28.732 119.294 28.284C120.022 27.836 120.582 27.2293 120.974 26.464C121.385 25.68 121.59 24.8027 121.59 23.832C121.59 22.8427 121.394 21.956 121.002 21.172C120.61 20.388 120.06 19.772 119.35 19.324C118.641 18.8573 117.792 18.624 116.802 18.624C115.832 18.624 114.992 18.8573 114.282 19.324C113.592 19.772 113.05 20.3973 112.658 21.2C112.285 21.984 112.098 22.8707 112.098 23.86C112.098 24.7933 112.285 25.652 112.658 26.436C113.05 27.2013 113.592 27.8173 114.282 28.284C114.992 28.732 115.832 28.956 116.802 28.956ZM128.189 31V22.74C128.189 21.4707 128.469 20.36 129.029 19.408C129.607 18.456 130.401 17.7187 131.409 17.196C132.417 16.6547 133.565 16.384 134.853 16.384C136.159 16.384 137.307 16.6547 138.297 17.196C139.305 17.7187 140.089 18.456 140.649 19.408C141.227 20.36 141.517 21.4707 141.517 22.74V31H138.941V22.768C138.941 21.9093 138.745 21.172 138.353 20.556C137.979 19.9213 137.475 19.436 136.841 19.1C136.225 18.764 135.562 18.596 134.853 18.596C134.143 18.596 133.471 18.764 132.837 19.1C132.221 19.436 131.717 19.9213 131.325 20.556C130.951 21.172 130.765 21.9093 130.765 22.768V31H128.189Z" fill="#E22A2A"/>
        </svg>
        </button>

        <button
          type="button"
          className="pricing-login"
          onClick={() => navigate("/admin?tab=billing")}
        >
          Back to Billing
        </button>
      </header>

      <section className="pricing">

        <div className="newpricing">

          <div className="above">
            <span className="abovesub">
              Choose the plan that fits your
              document workflow and scale your
              business with Nexgn.
            </span>

            <h1>Simple Pricing .</h1>
          </div>

          <div className="billingToggleWrap">
            <div
              className="billingToggle"
              role="tablist"
              aria-label="Billing period"
            >
              <span
                className="billingToggleThumb"
                style={{
                  transform:
                    billingCycle === "yearly"
                      ? "translateX(100%)"
                      : "translateX(0)",
                }}
              />

              <button
                type="button"
                role="tab"
                aria-selected={
                  billingCycle === "monthly"
                }
                className={`billingToggleBtn ${
                  billingCycle === "monthly"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setBillingCycle("monthly")
                }
              >
                Monthly
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={
                  billingCycle === "yearly"
                }
                className={`billingToggleBtn ${
                  billingCycle === "yearly"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setBillingCycle("yearly")
                }
              >
                Yearly
                {maxYearlySavings > 0 && (
                  <span className="billingSaveBadge">
                    Save up to {maxYearlySavings}%
                  </span>
                )}
              </button>
            </div>
          </div>

          <div
            className="pricingCarousel"
            ref={pricingCarouselRef}
            onScroll={handleScroll}
          >
            {loading ? (
              <>
                <PricingCardSkeleton />
                <PricingCardSkeleton />
                <PricingCardSkeleton />
              </>
            ) : (
              filteredPlans.map(
                (plan, index) => {
                  const isFree =
                    plan.billingPeriod ===
                    "free";

                  const isStarter =
                    plan.slug ===
                    "starter";

                  const isLoading =
                    loadingPlan ===
                    plan._id;

                  return (
                    <div
                      key={plan._id || index}
                      className={[
                        "pricingCard",
                        isStarter
                          ? "popularCard"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <div className="shadow">

                        <div
                          className="cardHeader"
                          style={{
                            background:
                              plan.slug ===
                              "free"
                                ? "#FFCACA"
                                : plan.slug ===
                                  "starter"
                                ? "linear-gradient(116.65deg, #FFFFFF 7.01%, #FF0915 32.03%, #100000 66.82%), linear-gradient(225.1deg, rgba(249, 0, 0, 0.2) 35.5%, rgba(0, 0, 0, 0.2) 98.07%)"
                                : "#FE7474",
                            color:
                              plan.slug ===
                                "starter" ||
                              plan.slug ===
                                "business"
                                ? "#fff"
                                : "#000",
                          }}
                        >
                          <h3
                            key={`${plan._id}-${billingCycle}`}
                            className="price"
                            style={{
                              color:
                                plan.slug ===
                                  "starter" ||
                                plan.slug ===
                                  "business"
                                  ? "#fff"
                                  : "#000",
                            }}
                          >
                            ₹
                            {(
                              (plan.amount ||
                                0) / 100
                            ).toLocaleString(
                              "en-IN"
                            )}
                            <span>
                              /
                              {isFree
                                ? "month"
                                : plan.billingPeriod ===
                                  "yearly"
                                ? "year"
                                : "month"}
                            </span>
                          </h3>

                          {!isFree &&
                            plan.billingPeriod ===
                              "yearly" &&
                            yearlySavingsBySlug[
                              plan.slug
                            ] > 0 && (
                              <span className="savingsBadge">
                                Save{" "}
                                {
                                  yearlySavingsBySlug[
                                    plan.slug
                                  ]
                                }
                                % vs monthly
                              </span>
                            )}

                          {isStarter ? (
                            <div className="tagRow">
                              <span className="planTag">
                                {plan.name}
                              </span>

                              <span className="popularBadge">
                                Popular
                              </span>
                            </div>
                          ) : (
                            <span className="planTag">
                              {plan.name}
                            </span>
                          )}
                        </div>

                        <p className="cardDesc1">
                          {plan.description}
                        </p>

                        <button
                          type="button"
                          className="chooseBtn"
                          disabled={isLoading}
                          onClick={() =>
                            handleSelectPlan(
                              plan
                            )
                          }
                        >
                          {isLoading
                            ? "Processing..."
                            : `Choose ${
                                isFree
                                  ? "Free"
                                  : plan.name
                              }`}
                        </button>
                      </div>

                      <ul className="featureList">
                        {plan.features?.map(
                          (feature, idx) => (
                            <li
                              key={`${feature}-${idx}`}
                            >
                              <span className="check">
                                ✓
                              </span>
                              {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  );
                }
              )
            )}
          </div>

          <div className="above1">
            <h1>Powerful Signing.</h1>

            <div className="carouselDots">
              {filteredPlans.map(
                (_, index) => (
                  <button
                    key={index}
                    className={`dot ${
                      currentSlide === index
                        ? "dotActive"
                        : ""
                    }`}
                    onClick={() =>
                      handleDotClick(
                        index
                      )
                    }
                    aria-label={`Go to slide ${
                      index + 1
                    }`}
                    type="button"
                  />
                )
              )}
            </div>

            <span
              className="abovesub"
              style={{
                maxWidth: "750px",
              }}
            >
              We’re excited to share that
              very soon you’ll be able to
              build your own plan, choose the
              features you need, and get a
              custom price tailored just for
              you.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}