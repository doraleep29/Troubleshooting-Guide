// All content sourced from the real Carbinox model manuals + the live
// shopcarbinox.com/pages/carbinox-troubleshooting-guide page + confirmed
// Shopify product media. Edited by committing a code change here — this
// project has no database or admin UI by design (see README).

export type WatchCaseShape = "SQUARE" | "ROUND";

// A step can request one of these slots; the actual image comes from the
// selected watch's own manualVisuals (each model's manual looks different),
// so the same issue/step data stays shared across every model.
export type ManualVisualSlot =
  | "buttonLayout"
  | "chargingAlignment"
  | "pairingApp"
  | "restart"
  | "gestures"
  | "otaUpdate"
  | "bluetoothCalling";

export interface WatchModel {
  key: string;
  // URL-safe identifier used in /troubleshooting/[model]/... routes.
  slug: string;
  name: string;
  tagline: string;
  caseShape: WatchCaseShape;
  companionApp: string;
  buttonLayout: string;
  buttonCount: number;
  restartInstructions: string;
  waterGuidance: string;
  accentColor: string;
  imageUrl: string;
  // Groups color/case variants of the same physical model together in the
  // picker (Edge, Blaze) so customers pick by what their watch looks like
  // without the list showing near-duplicate entries. Standalone models
  // (Vortex, X-Ranger) are their own single-member group.
  groupKey: string;
  groupName: string;
  variantName: string;
  // Real diagrams cropped from this model's own manual, keyed by slot.
  // Populated incrementally as manuals are processed — a watch with no
  // entry for a slot falls back to an honest "not added yet" placeholder,
  // never a fabricated or borrowed diagram from another model.
  manualVisuals?: Partial<Record<ManualVisualSlot, string>>;
}

// Edge ships in two case colors — same specs/steps either way, shown as two
// selectable variants under one "Edge" group since customers pick by what
// their watch looks like.
const EDGE_SHARED = {
  tagline: "Square case · 4-button · Carbinox Max app",
  caseShape: "SQUARE" as const,
  companionApp: "Carbinox Max",
  buttonLayout: "4-button (UP / DOWN / SEL / BACK)",
  buttonCount: 4,
  restartInstructions: "Long-press SEL for 3 seconds to power the watch on or off.",
  waterGuidance:
    "Manual specifically warns against saunas, hot showers, high-pressure water (diving/water-skiing), corrosive liquids, and UV exposure.",
  accentColor: "#FF9F1C",
  groupKey: "edge",
  groupName: "Edge",
  // Cropped directly from the real Carbinox Edge manual — identical for
  // both color variants since the manual doesn't differ by color. Edge
  // documents its buttons via a labeled table rather than a separate
  // restart illustration, so "restart" reuses the same table crop as
  // "buttonLayout" (its SEL-button row is the restart instruction).
  manualVisuals: {
    buttonLayout: "/manuals/edge/button-layout.png",
    chargingAlignment: "/manuals/edge/charging-alignment.png",
    pairingApp: "/manuals/edge/pairing-app.png",
    restart: "/manuals/edge/restart.png",
    gestures: "/manuals/edge/gestures.png",
    bluetoothCalling: "/manuals/edge/bluetooth-calling.png",
    otaUpdate: "/manuals/edge/ota-update.png",
  },
};

// Blaze ships as two distinct case shapes (Type R round, Type S square) —
// same button count/app/steps, grouped the same way as Edge's color variants.
const BLAZE_SHARED = {
  companionApp: "Carbinox Pro",
  buttonLayout: "4-button (UP / DOWN / SEL / BACK)",
  buttonCount: 4,
  restartInstructions:
    "Long-press SEL 3s for power off/restart/SOS. Long-press SEL 12s to force a restart if unresponsive.",
  waterGuidance: "Wear carefully during swimming/diving. Avoid saunas or hot showers.",
  groupKey: "blaze",
  groupName: "Blaze",
};

export const WATCH_MODELS: WatchModel[] = [
  {
    key: "edge_phantom_black",
    slug: "edge-phantom-black",
    name: "Edge — Phantom Black",
    variantName: "Phantom Black",
    imageUrl: "/watches/edge-phantom-black.png",
    ...EDGE_SHARED,
  },
  {
    key: "edge_armor_silver",
    slug: "edge-armor-silver",
    name: "Edge — Armor Silver",
    variantName: "Armor Silver",
    imageUrl: "/watches/edge-armor-silver.png",
    ...EDGE_SHARED,
  },
  {
    key: "blaze_type_r",
    slug: "blaze-r",
    name: "Blaze Type R",
    tagline: "Round case · 4-button · Carbinox Pro app",
    caseShape: "ROUND",
    variantName: "Type R",
    accentColor: "#FF6A1A",
    imageUrl: "/watches/blaze-type-r.png",
    ...BLAZE_SHARED,
    // Cropped directly from the real Carbinox Blaze Type R manual.
    manualVisuals: {
      buttonLayout: "/manuals/blaze-r/button-layout.png",
      chargingAlignment: "/manuals/blaze-r/charging-alignment.png",
      pairingApp: "/manuals/blaze-r/pairing-app.png",
      restart: "/manuals/blaze-r/restart.png",
      gestures: "/manuals/blaze-r/gestures.png",
      otaUpdate: "/manuals/blaze-r/ota-update.png",
      bluetoothCalling: "/manuals/blaze-r/bluetooth-calling.png",
    },
  },
  {
    key: "blaze_type_s",
    slug: "blaze-s",
    name: "Blaze Type S",
    tagline: "Square case · 4-button · Carbinox Pro app",
    caseShape: "SQUARE",
    variantName: "Type S",
    accentColor: "#E8352B",
    imageUrl: "/watches/blaze-type-s.png",
    ...BLAZE_SHARED,
    // Cropped directly from the real Carbinox Blaze Type S manual.
    manualVisuals: {
      buttonLayout: "/manuals/blaze-s/button-layout.png",
      chargingAlignment: "/manuals/blaze-s/charging-alignment.png",
      pairingApp: "/manuals/blaze-s/pairing-app.png",
      restart: "/manuals/blaze-s/restart.png",
      gestures: "/manuals/blaze-s/gestures.png",
      otaUpdate: "/manuals/blaze-s/ota-update.png",
      bluetoothCalling: "/manuals/blaze-s/bluetooth-calling.png",
    },
  },
  {
    key: "vortex",
    slug: "vortex",
    name: "Vortex",
    tagline: "Square case · 4-button · GloryFit Pro app",
    caseShape: "SQUARE",
    companionApp: "GloryFit Pro",
    buttonLayout: "4-button (UP / DOWN / SEL / BACK)",
    buttonCount: 4,
    restartInstructions: "Long-press SEL to power off/restart. Hold longer to force a restart if unresponsive.",
    waterGuidance: "Wear carefully during swimming/diving. Avoid saunas or hot showers.",
    accentColor: "#2FE6A8",
    imageUrl: "/watches/vortex.png",
    groupKey: "vortex",
    groupName: "Vortex",
    variantName: "Vortex",
    // Cropped directly from the real Carbinox Vortex manual.
    manualVisuals: {
      buttonLayout: "/manuals/vortex/button-layout.png",
      chargingAlignment: "/manuals/vortex/charging-alignment.png",
      pairingApp: "/manuals/vortex/pairing-app.png",
      restart: "/manuals/vortex/restart.png",
      gestures: "/manuals/vortex/gestures.png",
      otaUpdate: "/manuals/vortex/ota-update.png",
      bluetoothCalling: "/manuals/vortex/bluetooth-calling.png",
    },
  },
  {
    key: "x_ranger",
    slug: "x-ranger",
    name: "X-Ranger",
    tagline: "Round case · 2-button · Glory Fit app",
    caseShape: "ROUND",
    companionApp: "Glory Fit",
    buttonLayout: "2-button (Power key + Sports key)",
    buttonCount: 2,
    restartInstructions: "Press and hold the Power key for 2 seconds to turn the watch on/off.",
    waterGuidance: "Case back rated 5ATM & IP69K. Wear carefully during swimming/diving. Avoid saunas or hot showers.",
    accentColor: "#2DBFC4",
    imageUrl: "/watches/x-ranger.png",
    groupKey: "x_ranger",
    groupName: "X-Ranger",
    variantName: "X-Ranger",
    // Cropped directly from the real Carbinox X-Ranger manual. This manual
    // has no dedicated gestures or firmware-update section (structured
    // around Audio Settings / Watch Faces / Sports Modes instead), so those
    // two slots are left unset rather than filled with unrelated content.
    manualVisuals: {
      buttonLayout: "/manuals/x-ranger/button-layout.png",
      chargingAlignment: "/manuals/x-ranger/charging-alignment.png",
      pairingApp: "/manuals/x-ranger/pairing-app.png",
      restart: "/manuals/x-ranger/restart.png",
      bluetoothCalling: "/manuals/x-ranger/bluetooth-calling.png",
    },
  },
];

export function findWatchBySlug(slug: string): WatchModel | undefined {
  return WATCH_MODELS.find((w) => w.slug === slug);
}
