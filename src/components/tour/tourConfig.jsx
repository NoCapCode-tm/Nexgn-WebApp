// src/components/tour/tourConfig.js

export const TOUR_STEPS = [
  {
    id: "dashboard",
    route: "/dashboard",
    target: '[data-tour="dashboard"]',
    title: "Your Dashboard",
    description:
      "This is your Nexgn workspace. Here you can see your document activity, pending signatures, signed documents, and recent activity.",
    placement: "right",
  },

  {
    id: "signers",
    route: "/sign-request",
    target: '[data-tour="signers"]',
    title: "Signers",
    description:
      "This is where you manage your signing workflow and work with documents that need signatures.",
    placement: "right",
  },

  {
    id: "documents",
    route: "/documents",
    target: '[data-tour="documents"]',
    title: "Documents",
    description:
      "Manage your documents from here. Upload, organize, track, and work with your documents in one place.",
    placement: "right",
  },

  {
    id: "contact-book",
    route: "/contact-book",
    target: '[data-tour="contact-book"]',
    title: "Contact Book",
    description:
      "Save and manage your frequently used contacts so sending documents becomes quicker.",
    placement: "right",
  },

  {
    id: "templates",
    route: "/templates",
    target: '[data-tour="templates"]',
    title: "Templates",
    description:
      "Create reusable document templates so you don't have to start from scratch every time.",
    placement: "right",
  },

  {
    id: "settings",
    route: "/settings",
    target: '[data-tour="settings"]',
    title: "Settings",
    description:
      "Manage your account, preferences, security, and other Nexgn settings.",
    placement: "right",
  },
];