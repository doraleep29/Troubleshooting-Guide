// All content sourced from the 5 model manuals + the live
// shopcarbinox.com/pages/carbinox-troubleshooting-guide page + confirmed
// Shopify product media. Edited by committing a code change here — this
// project has no database or admin UI by design (see README).

export type WatchCaseShape = "SQUARE" | "ROUND";

export interface WatchModel {
  key: string;
  name: string;
  tagline: string;
  caseShape: WatchCaseShape;
  companionApp: string;
  buttonLayout: string;
  restartInstructions: string;
  waterGuidance: string;
  accentColor: string;
  imageUrl: string;
}

export const WATCH_MODELS: WatchModel[] = [
  {
    key: "edge",
    name: "Edge",
    tagline: "Square case · 4-button · Carbinox Max app",
    caseShape: "SQUARE",
    companionApp: "Carbinox Max",
    buttonLayout: "4-button (UP / DOWN / SEL / BACK)",
    restartInstructions: "Long-press SEL for 3 seconds to power the watch on or off.",
    waterGuidance:
      "Manual specifically warns against saunas, hot showers, high-pressure water (diving/water-skiing), corrosive liquids, and UV exposure.",
    accentColor: "#FF9F1C",
    imageUrl: "https://cdn.shopify.com/s/files/1/0049/0533/6935/files/5_2f16357c-4445-46a5-80f6-99e7bf0db68d.png?v=1771360169",
  },
  {
    key: "blaze_type_r",
    name: "Blaze Type R",
    tagline: "Round case · 4-button · Carbinox Pro app",
    caseShape: "ROUND",
    companionApp: "Carbinox Pro",
    buttonLayout: "4-button (UP / DOWN / SEL / BACK)",
    restartInstructions:
      "Long-press SEL 3s for power off/restart/SOS. Long-press SEL 12s to force a restart if unresponsive.",
    waterGuidance: "Wear carefully during swimming/diving. Avoid saunas or hot showers.",
    accentColor: "#FF6A1A",
    imageUrl: "https://cdn.shopify.com/s/files/1/0049/0533/6935/files/1-min_3-300385.jpg?v=1732036847",
  },
  {
    key: "blaze_type_s",
    name: "Blaze Type S",
    tagline: "Square case · 4-button · Carbinox Pro app",
    caseShape: "SQUARE",
    companionApp: "Carbinox Pro",
    buttonLayout: "4-button (UP / DOWN / SEL / BACK)",
    restartInstructions:
      "Long-press SEL 3s for power off/restart/SOS. Long-press SEL 12s to force a restart if unresponsive.",
    waterGuidance: "Wear carefully during swimming/diving. Avoid saunas or hot showers.",
    accentColor: "#E8352B",
    imageUrl: "https://cdn.shopify.com/s/files/1/0049/0533/6935/files/2-min_3-332733.jpg?v=1732036849",
  },
  {
    key: "vortex",
    name: "Vortex",
    tagline: "Square case · 4-button · GloryFit Pro app",
    caseShape: "SQUARE",
    companionApp: "GloryFit Pro",
    buttonLayout: "4-button (UP / DOWN / SEL / BACK)",
    restartInstructions: "Long-press SEL to power off/restart. Hold longer to force a restart if unresponsive.",
    waterGuidance: "Wear carefully during swimming/diving. Avoid saunas or hot showers.",
    accentColor: "#2FE6A8",
    imageUrl: "https://cdn.shopify.com/s/files/1/0049/0533/6935/files/1_6.png?v=1771357498",
  },
  {
    key: "x_ranger",
    name: "X-Ranger",
    tagline: "Round case · 2-button · Carbinox Pro app",
    caseShape: "ROUND",
    companionApp: "Carbinox Pro",
    buttonLayout: "2-button (Power key + Sports key)",
    restartInstructions: "Press and hold the Power key for 2 seconds to turn the watch on/off.",
    waterGuidance: "Case back rated 5ATM & IP69K. Wear carefully during swimming/diving. Avoid saunas or hot showers.",
    accentColor: "#2DBFC4",
    imageUrl: "https://cdn.shopify.com/s/files/1/0049/0533/6935/files/4_3.png?v=1771357417",
  },
];

export interface TroubleshootingStep {
  title: string;
  // May contain {{restartInstructions}} / {{waterGuidance}} / {{companionApp}}
  // placeholders, filled in from the selected WatchModel — see interpolate().
  body: string;
}

export interface TroubleshootingIssue {
  key: string;
  label: string;
  steps: TroubleshootingStep[];
}

export const ISSUES: TroubleshootingIssue[] = [
  {
    key: "POWER",
    label: "Won't turn on / won't charge",
    steps: [
      {
        title: "Give it a full charging cycle",
        body: "Connect the watch to its charging cable/dock and let it sit 30–60 minutes before expecting it to power on. This alone resolves most \"won't turn on\" cases.",
      },
      {
        title: "Check the magnetic contact",
        body: "Wipe the charging pins on the back of the watch and on the base with a dry cloth, and make sure the watch is seated with the metal contacts aligned directly to the base.",
      },
      {
        title: "Rule out the power source",
        body: "Try a different USB port, wall adapter, or location. If it charges from one source but not another, it's a voltage/power-source issue, not the watch.",
      },
      { title: "Force a restart", body: "{{restartInstructions}}" },
    ],
  },
  {
    key: "SCREEN",
    label: "Screen frozen, blacked out, or touch not working",
    steps: [
      { title: "Force a restart", body: "{{restartInstructions}}" },
      {
        title: "Check for a firmware update",
        body: "Open {{companionApp}} → Device → Firmware/OTA Update, and install the latest version if available.",
      },
      {
        title: "If it's still frozen or blacked out",
        body: "This qualifies for a free replacement under the 45-day guarantee if within the first 45 days of purchase — contact support directly rather than continuing to troubleshoot.",
      },
    ],
  },
  {
    key: "PAIR",
    label: "Won't pair, or keeps disconnecting",
    steps: [
      {
        title: "Pair from the app, not phone Bluetooth settings",
        body: "Carbinox watches pair through the app directly — pairing from the phone's native Bluetooth settings list first can cause a failed pairing, per the manual.",
      },
      {
        title: "Check proximity and background app",
        body: "Bluetooth range is about 10 meters. Beyond that, or if the app isn't running in the background, the watch disconnects and needs to re-pair.",
      },
      {
        title: "Remove other Bluetooth competition",
        body: "If the phone is already connected to another Bluetooth device, or recently ran low on battery, the watch connection can drop.",
      },
      {
        title: "Remove and re-add the device",
        body: "In the app, remove the watch from My Devices, then add it again as if pairing for the first time.",
      },
    ],
  },
  {
    key: "NOTIF",
    label: "Not receiving notifications (SMS/WhatsApp)",
    steps: [
      {
        title: "Check both silent modes",
        body: "Confirm neither the phone nor the watch is in silent/Do Not Disturb — either one blocks notifications from reaching the watch.",
      },
      {
        title: "Check notification permissions in the app",
        body: "Confirm the specific app (e.g. WhatsApp) is toggled on under notification settings, and location + notification permissions are granted on the phone.",
      },
      {
        title: "Keep the app running in the background",
        body: "If the companion app is fully closed (not just backgrounded), the watch stops receiving new notifications until it's reopened.",
      },
    ],
  },
  {
    key: "READINGS",
    label: "Heart rate / steps look inaccurate",
    steps: [
      {
        title: "Complete the profile",
        body: "Confirm weight, age, and height are filled in accurately in the app — incomplete profile data is the most common cause of inaccurate stats.",
      },
      {
        title: "Check the fit",
        body: "The sensor needs snug, consistent contact with skin. A loose band is a common secondary cause of inaccurate heart rate.",
      },
      {
        title: "Set expectations on margin",
        body: "A 5–15% error margin versus a medical device is normal for any wrist tracker — this isn't necessarily a defect.",
      },
      {
        title: "Reset to factory settings if it persists",
        body: "If accuracy is still clearly off after the above, reset to factory settings and set up again.",
      },
    ],
  },
  {
    key: "BATTERY",
    label: "Battery doesn't last / drains fast",
    steps: [
      {
        title: "Lower screen brightness",
        body: "Reduce brightness and turn off notifications that aren't needed — the two biggest drains on daily battery life.",
      },
      { title: "Turn on battery-saving mode", body: "Enable the built-in battery saver from the watch or the app." },
      {
        title: "Check Bluetooth Calling usage",
        body: "If Bluetooth Calling is enabled and used often, it noticeably reduces battery life versus normal use.",
      },
    ],
  },
  {
    key: "WATER",
    label: "Water got in / display fogged",
    steps: [
      {
        title: "Dry it out before charging",
        body: "Shake the watch gently to clear water from case holes, wipe with a soft cloth dampened with clean water (especially after salt water), and let it dry fully before wearing or charging again.",
      },
      { title: "Know what the rating actually covers", body: "{{waterGuidance}}" },
      {
        title: "Avoid the excluded conditions going forward",
        body: "Saunas and hot showers affect the seal over time even on watches that handle swimming fine.",
      },
    ],
  },
  {
    key: "UNITS",
    label: "Wrong time format, units, or temperature scale",
    steps: [
      { title: "Change temperature units", body: "Open the app → Weather settings to switch between Celsius and Fahrenheit." },
      {
        title: "Change time format or distance units",
        body: "Both 12/24-hour time and meters/miles are changed from the same Settings area in the app.",
      },
      {
        title: "If it resets on its own",
        body: "A dropped Bluetooth connection or phone network issue can cause these settings to revert — reapply after reconnecting.",
      },
    ],
  },
  {
    key: "STRAP",
    label: "Strap, button, or glass damaged",
    steps: [
      {
        title: "Document the damage",
        body: "Take a clear photo of the damaged strap, button, or glass — this speeds up a warranty claim.",
      },
      {
        title: "Check what's covered",
        body: "Straps, buttons, and glass damage from normal use are covered under the Lifetime Warranty — a free replacement part, no questions asked.",
      },
      {
        title: "Contact support for the replacement",
        body: "Send a photo and your watch model to support to get the replacement part started.",
      },
    ],
  },
];
