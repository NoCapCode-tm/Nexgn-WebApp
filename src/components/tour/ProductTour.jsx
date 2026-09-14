import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { TOUR_STEPS } from "./tourConfig";
import "./ProductTour.css";

const ProductTourContext =
  createContext(null);

export const useProductTour = () => {
  const context = useContext(
    ProductTourContext
  );

  if (!context) {
    throw new Error(
      "useProductTour must be used inside ProductTour"
    );
  }

  return context;
};

export default function ProductTour() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] =
    useState(false);

  const [currentStep, setCurrentStep] =
    useState(0);

  const [targetRect, setTargetRect] =
    useState(null);

  const [targetElement, setTargetElement] =
    useState(null);

  const currentTourStep =
    TOUR_STEPS[currentStep];


  const getStorageKey = useCallback(() => {
    const userId =
      localStorage.getItem(
        "nexgn_user_id"
      );

    return userId
      ? `nexgn_tour_completed_${userId}`
      : "nexgn_tour_completed";
  }, []);

  const hasCompletedTour = useCallback(() => {
    return (
      localStorage.getItem(
        getStorageKey()
      ) === "true"
    );
  }, [getStorageKey]);

  const markTourCompleted =
    useCallback(() => {
      localStorage.setItem(
        getStorageKey(),
        "true"
      );
    }, [getStorageKey]);


  const startTour = useCallback(
    (stepIndex = 0) => {
      const step =
        TOUR_STEPS[stepIndex];

      if (!step) return;

      setCurrentStep(stepIndex);
      setTargetRect(null);
      setTargetElement(null);
      setIsOpen(true);

      // If we're already on the correct route, trigger a re-render
      // by adding a small delay to ensure state updates properly
      if (
        location.pathname ===
        step.route
      ) {
        // Force a re-render by setting state again after a small delay
        setTimeout(() => {
          setTargetRect(null);
          setTargetElement(null);
        }, 50);
      } else {
        navigate(step.route);
      }
    },
    [location.pathname, navigate]
  );

  const restartTour = useCallback(() => {
    // Clear the completion flag to allow tour to run again
    localStorage.removeItem(getStorageKey());
    startTour(0);
  }, [getStorageKey, startTour]);

  const closeTour = useCallback(() => {
    markTourCompleted();

    setIsOpen(false);
    setTargetRect(null);
    setTargetElement(null);
    setCurrentStep(0);
  }, [markTourCompleted]);

  const finishTour = useCallback(() => {
    markTourCompleted();

    setIsOpen(false);
    setTargetRect(null);
    setTargetElement(null);
    setCurrentStep(0);
  }, [markTourCompleted]);

  const nextStep = useCallback(() => {
    const nextIndex =
      currentStep + 1;

    if (
      nextIndex >=
      TOUR_STEPS.length
    ) {
      finishTour();
      return;
    }

    const next =
      TOUR_STEPS[nextIndex];

    setCurrentStep(nextIndex);

    setTargetRect(null);
    setTargetElement(null);

    if (
      location.pathname !==
      next.route
    ) {
      navigate(next.route);
    }
  }, [
    currentStep,
    finishTour,
    location.pathname,
    navigate,
  ]);

  const previousStep =
    useCallback(() => {
      if (currentStep <= 0) return;

      const previousIndex =
        currentStep - 1;

      const previous =
        TOUR_STEPS[
          previousIndex
        ];

      setCurrentStep(previousIndex);

      setTargetRect(null);
      setTargetElement(null);

      if (
        location.pathname !==
        previous.route
      ) {
        navigate(previous.route);
      }
    }, [
      currentStep,
      location.pathname,
      navigate,
    ]);


  // Auto-start tour for first-time users
  useEffect(() => {
    if (
      location.pathname !==
      "/dashboard"
    ) {
      return;
    }

    if (hasCompletedTour()) {
      return;
    }

    const timer = setTimeout(() => {
      startTour(0);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [
    location.pathname,
    hasCompletedTour,
    startTour,
  ]);

  

useEffect(() => {
  if (!isOpen || !currentTourStep) {
    return;
  }

  let attempts = 0;
  let timer = null;

  const findTarget = () => {
    const elements = Array.from(
      document.querySelectorAll(
        currentTourStep.target
      )
    );

    const visibleElement = elements.find(
      (element) => {
        const rect =
          element.getBoundingClientRect();

        const style =
          window.getComputedStyle(element);

        return (
          rect.width > 0 &&
          rect.height > 0 &&
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          style.opacity !== "0"
        );
      }
    );

    /*
     * Target hasn't rendered yet.
     * Try again after the page finishes rendering.
     */
    if (!visibleElement) {
      attempts += 1;

      if (attempts < 50) {
        timer = setTimeout(
          findTarget,
          100
        );
      }

      return;
    }

    /*
     * Scroll the target into a comfortable
     * visible position.
     */
    visibleElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });

    /*
     * Wait for scroll animation to settle.
     */
    setTimeout(() => {
      const rect =
        visibleElement.getBoundingClientRect();

      setTargetElement(
        visibleElement
      );

      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }, 400);
  };

  findTarget();

  return () => {
    if (timer) {
      clearTimeout(timer);
    }
  };
}, [
  isOpen,
  currentStep,
  currentTourStep,
  location.pathname,
]);


  useEffect(() => {
    if (
      !isOpen ||
      !targetElement
    ) {
      return;
    }

    const updatePosition = () => {
      if (!document.body.contains(
        targetElement
      )) {
        return;
      }

      const rect =
        targetElement.getBoundingClientRect();

      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };

    window.addEventListener(
      "resize",
      updatePosition
    );

    window.addEventListener(
      "scroll",
      updatePosition,
      true
    );

    return () => {
      window.removeEventListener(
        "resize",
        updatePosition
      );

      window.removeEventListener(
        "scroll",
        updatePosition,
        true
      );
    };
  }, [
    isOpen,
    targetElement,
  ]);

  const contextValue = {
    startTour,
    restartTour,
    closeTour,
    finishTour,
    nextStep,
    previousStep,
    isOpen,
    currentStep,
    totalSteps:
      TOUR_STEPS.length,
  };

  return (
    <ProductTourContext.Provider
      value={contextValue}
    >
      <Outlet />

      {isOpen &&
        currentTourStep &&
        targetRect && (
          <TourOverlay
            step={currentTourStep}
            currentStep={
              currentStep
            }
            totalSteps={
              TOUR_STEPS.length
            }
            targetRect={targetRect}
            onNext={nextStep}
            onPrevious={
              previousStep
            }
            onSkip={closeTour}
          />
        )}
    </ProductTourContext.Provider>
  );
}

function TourOverlay({
  step,
  currentStep,
  totalSteps,
  targetRect,
  onNext,
  onPrevious,
  onSkip,
}) {
  const [cardPosition, setCardPosition] =
    useState(null);

  /*
   * Calculate tooltip position based
   * on target position.
   */
  useEffect(() => {
    if (!targetRect) return;

    const cardWidth = 370;
    const cardHeight = 240;
    const gap = 16;
    const screenPadding = 16;

    let position = step.placement;

    let top;
    let left;

    /*
     * Default: below target
     */
    if (position === "bottom") {
      top =
        targetRect.top +
        targetRect.height +
        gap;

      left = targetRect.left;
    }

    /*
     * Above target
     */
    if (position === "top") {
      top =
        targetRect.top -
        cardHeight -
        gap;

      left = targetRect.left;
    }

    /*
     * Right
     */
    if (position === "right") {
      top =
        targetRect.top +
        targetRect.height / 2 -
        cardHeight / 2;

      left =
        targetRect.left +
        targetRect.width +
        gap;
    }

    /*
     * Left
     */
    if (position === "left") {
      top =
        targetRect.top +
        targetRect.height / 2 -
        cardHeight / 2;

      left =
        targetRect.left -
        cardWidth -
        gap;
    }
    if (
      top +
        cardHeight >
      window.innerHeight -
        screenPadding
    ) {
      top =
        targetRect.top -
        cardHeight -
        gap;
    }

  
    if (top < screenPadding) {
      top =
        targetRect.top +
        targetRect.height +
        gap;
    }

    
    if (
      left + cardWidth >
      window.innerWidth -
        screenPadding
    ) {
      left =
        window.innerWidth -
        cardWidth -
        screenPadding;
    }

    if (left < screenPadding) {
      left = screenPadding;
    }

  
    if (
      top + cardHeight >
      window.innerHeight -
        screenPadding
    ) {
      top =
        window.innerHeight -
        cardHeight -
        screenPadding;
    }

    if (top < screenPadding) {
      top = screenPadding;
    }

    setCardPosition({
      top,
      left,
    });
  }, [
    targetRect,
    step.placement,
  ]);

  if (!cardPosition) {
    return null;
  }

  return (
    <>
      {/* ONLY the target highlight */}
      <div
        className="tour-target-highlight"
        style={{
          top:
            targetRect.top - 6,
          left:
            targetRect.left - 6,
          width:
            targetRect.width + 12,
          height:
            targetRect.height + 12,
        }}
      />

      {/* Tooltip */}
      <div
        className="tour-card"
        style={{
          top: cardPosition.top,
          left: cardPosition.left,
        }}
      >
        <div className="tour-card__top">
          <span className="tour-step">
            Step {currentStep + 1} of{" "}
            {totalSteps}
          </span>

          <button
            type="button"
            className="tour-close"
            onClick={onSkip}
            aria-label="Close tour"
          >
            ×
          </button>
        </div>

        <h3>{step.title}</h3>

        <p>{step.description}</p>

        <div className="tour-progress">
          {Array.from({
            length: totalSteps,
          }).map(
            (_, index) => (
              <span
                key={index}
                className={
                  index <=
                  currentStep
                    ? "active"
                    : ""
                }
              />
            )
          )}
        </div>

        <div className="tour-actions">
          <button
            type="button"
            className="tour-skip"
            onClick={onSkip}
          >
            Skip Tour
          </button>

          <div className="tour-navigation">
            {currentStep > 0 && (
              <button
                type="button"
                className="tour-back"
                onClick={onPrevious}
              >
                Back
              </button>
            )}

            <button
              type="button"
              className="tour-next"
              onClick={onNext}
            >
              {currentStep ===
              totalSteps - 1
                ? "Finish"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}