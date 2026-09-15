import type { ManualVisualSlot, WatchModel } from "./models";

export interface TroubleshootingStep {
  slug: string;
  // Compact label for the timeline (spec: TroubleshootingTimeline nodes).
  shortLabel: string;
  title: string;
  // Numbered instructions for this step. May contain {{restartInstructions}}
  // / {{waterGuidance}} / {{companionApp}} placeholders, filled in from the
  // selected WatchModel — see interpolateStepInstructions().
  instructions: string[];
  // Which manual diagram this step wants — resolved per selected watch via
  // getStepVisual(step, watch), since the actual diagram differs per model.
  visualSlot?: ManualVisualSlot;
  additionalHelp?: { title: string; content: string }[];
}

export interface TroubleshootingIssue {
  key: string;
  slug: string;
  label: string;
  description: string;
  steps: TroubleshootingStep[];
}

// Display title + alt text per visual slot — independent of which model's
// image ends up filling it.
export const VISUAL_TITLES: Record<ManualVisualSlot, string> = {
  buttonLayout: "Physical buttons & ports",
  chargingAlignment: "Proper charging connection",
  chargingPort: "Inspect the charging port",
  pairingApp: "Pairing with the app",
  restart: "Force restart",
  gestures: "Watch gestures",
  otaUpdate: "Firmware update",
  bluetoothCalling: "Bluetooth calling setup",
};

export interface ResolvedStepVisual {
  type: "image";
  src: string;
  alt: string;
  title: string;
}

// Diagrams shared across models for steps that don't depend on a model's
// own manual (generic app/process steps, plus a few hardware steps that
// only have an Edge-hardware version so far — see the README note on this
// folder). Keyed by step slug, checked only after a model-specific
// visualSlot comes up empty, so a model's own manual diagram always wins.
//
// `groupKeys` restricts a shared diagram to watches it's actually true for.
// Most of these are generic enough to show everywhere, but a couple bake a
// specific hardware fact into the image itself (X-Ranger has 2 buttons, not
// 4; Edge's water guidance is its own real excluded-conditions list, not a
// generic "swim carefully" line) — showing those to the wrong model isn't a
// cosmetic mismatch, it's the image asserting something false. Leave
// `groupKeys` unset only when the image makes no model-specific claim.
export const sharedStepDiagrams: Record<
  string,
  { src: string; alt: string; title: string; groupKeys?: string[] }
> = {
  "hard-reset-all-buttons": {
    src: "/troubleshooting-diagrams/shared/hard-reset-all-buttons.png",
    alt: "Press and hold all 4 buttons for 15–30 seconds",
    title: "Hard reset with all buttons",
    // X-Ranger has 2 buttons (Power + Sports key) — this image says "4
    // buttons," which is only true for the other groups.
    groupKeys: ["edge", "blaze", "vortex"],
  },
  "silent-modes": {
    src: "/troubleshooting-diagrams/shared/silent-modes.png",
    alt: "Turn off Silent Mode and Do Not Disturb on the phone and watch",
    title: "Check both silent modes",
  },
  "complete-profile": {
    src: "/troubleshooting-diagrams/shared/complete-profile.png",
    alt: "Complete weight, age, and height in the companion app profile",
    title: "Complete the profile",
  },
  "dry-out": {
    src: "/troubleshooting-diagrams/shared/dry-out.png",
    alt: "Shake out water, wipe the watch, and let it dry before charging",
    title: "Dry it out before charging",
  },
  "temperature-units": {
    src: "/troubleshooting-diagrams/shared/temperature-units.png",
    alt: "Change the weather temperature unit between Celsius and Fahrenheit",
    title: "Change temperature units",
  },
  "document-damage": {
    src: "/troubleshooting-diagrams/shared/document-damage.png",
    alt: "Take a clear photo of the damaged glass, button, or strap",
    title: "Document the damage",
  },
  "app-permissions": {
    src: "/troubleshooting-diagrams/shared/app-permissions.png",
    alt: "Enable call, SMS, and notification permissions for the companion app",
    title: "App permissions",
  },
  "check-fit": {
    src: "/troubleshooting-diagrams/shared/check-fit.png",
    alt: "Wear the watch snug, flat, and above the wrist bone",
    title: "Check the fit",
  },
  "rating-coverage": {
    src: "/troubleshooting-diagrams/shared/rating-coverage.png",
    alt: "Edge's real water-resistance guidance — saunas, hot showers, high-pressure water, corrosive liquids, and UV exposure",
    title: "What the rating actually covers",
    // This image is captioned "EDGE WATER GUIDANCE" with Edge's specific
    // excluded-conditions list — showing it under Blaze/Vortex/X-Ranger
    // would contradict those models' own (different, correct) water
    // guidance text right next to it. Edge only until per-model versions
    // exist.
    groupKeys: ["edge"],
  },
  "time-distance-units": {
    src: "/troubleshooting-diagrams/shared/time-distance-units.png",
    alt: "Change 12/24-hour time format and miles/kilometers distance units",
    title: "Time format & distance units",
  },
  "check-coverage": {
    src: "/troubleshooting-diagrams/shared/check-coverage.png",
    alt: "Strap, button, and glass damage is covered under the Lifetime Warranty",
    title: "Check what's covered",
  },
};

// Resolves a step's visual: the selected watch's own manual crop first (each
// model's manual looks different), then a shared cross-model diagram for
// generic steps, then null so the UI shows an honest "not added yet" state
// rather than borrowing another model's or another step's diagram.
export function getStepVisual(step: TroubleshootingStep, watch: WatchModel): ResolvedStepVisual | null {
  if (step.visualSlot) {
    const src = watch.manualVisuals?.[step.visualSlot];
    if (src) {
      return {
        type: "image",
        src,
        alt: `${VISUAL_TITLES[step.visualSlot]} — ${watch.name} manual diagram`,
        title: VISUAL_TITLES[step.visualSlot],
      };
    }
  }
  const shared = sharedStepDiagrams[step.slug];
  if (shared && (!shared.groupKeys || shared.groupKeys.includes(watch.groupKey))) {
    return { type: "image", src: shared.src, alt: shared.alt, title: shared.title };
  }
  return null;
}

export const ISSUES: TroubleshootingIssue[] = [
  {
    key: "POWER",
    slug: "power-charging",
    label: "Won't turn on / won't charge",
    description: "Dead screen, won't power on, or not charging.",
    steps: [
      {
        slug: "charging-cycle",
        shortLabel: "Charge 30 min",
        title: "Give it a full charging cycle",
        instructions: [
          "Connect the watch to its charging cable/dock and let it sit 30–60 minutes before expecting it to power on. This alone resolves most \"won't turn on\" cases.",
        ],
        visualSlot: "chargingAlignment",
      },
      {
        slug: "charging-connection",
        shortLabel: "Inspect charger",
        title: "Check the magnetic contact",
        instructions: [
          "Perspiration, oils, and invisible residue on the copper contacts are the most common reason a watch stops charging, even with a brand-new cable. Use a cotton swab lightly dampened with rubbing alcohol (or a dry microfiber cloth) to thoroughly clean the charging pins on the back of the watch.",
          "Let it air dry completely for about 2 minutes before reconnecting the charger, and make sure the watch is seated with the metal contacts aligned directly to the base.",
        ],
        visualSlot: "chargingPort",
      },
      {
        slug: "power-source",
        shortLabel: "Try another source",
        title: "Rule out the power source",
        instructions: [
          "Try a different USB port, wall adapter, or location. If it charges from one source but not another, it's a voltage/power-source issue, not the watch.",
          "Avoid high-wattage fast-charging bricks (20W+ USB-C/PD wall chargers) — these can trigger a safety shutdown on the watch's charging circuit. Use a low-power source instead: a standard computer USB port, an older 5V/1A wall adapter, or a low-wattage power bank.",
        ],
        additionalHelp: [
          {
            title: "Cable or adapter issue?",
            content:
              "Use the original CARBINOX magnetic charging base and a 5V/500mA-or-higher certified power adapter. Off-spec third-party chargers are a common cause of failed or inconsistent charging.",
          },
        ],
      },
      {
        slug: "force-restart",
        shortLabel: "Force restart",
        title: "Force a restart",
        instructions: ["{{restartInstructions}}"],
        visualSlot: "restart",
      },
      {
        slug: "force-boot-while-charging",
        shortLabel: "Boot while charging",
        title: "Force a boot while still on the charger",
        instructions: [
          "If the screen is still completely black, clean the magnetic contacts on the watch and the charger, connect it to a low-power source, and leave it plugged in undisturbed for 30–60 minutes.",
          "While it's still attached to the charger, press and hold the power/SEL button for 30–40 continuous seconds — longer than a normal restart press. This can force a hard restart of the power-control chip if the watch is stuck in a deep discharge state.",
        ],
      },
    ],
  },
  {
    key: "SCREEN",
    slug: "screen",
    label: "Screen frozen, blacked out, or touch not working",
    description: "Display stuck, unresponsive, or the touchscreen isn't registering taps.",
    steps: [
      {
        slug: "hard-reset-all-buttons",
        shortLabel: "Hard reset",
        title: "Try a hard reset with all buttons",
        instructions: [
          "Press and hold all of the watch's buttons at the same time for about 15–30 seconds. This can bring the display back if the watch has become completely frozen or unresponsive.",
        ],
      },
      {
        slug: "force-restart",
        shortLabel: "Force restart",
        title: "Force a restart",
        instructions: ["{{restartInstructions}}"],
        visualSlot: "restart",
      },
      {
        slug: "charge-and-retry",
        shortLabel: "Charge & retry",
        title: "Make sure it has enough charge",
        instructions: [
          "Connect it to the charging cable and let it charge for 30–60 minutes, then try turning it on again. If possible, try a different charging location too.",
        ],
        visualSlot: "chargingAlignment",
      },
      {
        slug: "firmware-update",
        shortLabel: "Update firmware",
        title: "Check for a firmware update",
        instructions: [
          "Open {{companionApp}} → Device → Firmware/OTA Update, and install the latest version if available — this is also recommended for screen freezing or glitching.",
        ],
        visualSlot: "otaUpdate",
      },
      {
        slug: "reset-device",
        shortLabel: "Reset device",
        title: "Reset the device in the app",
        instructions: ["If it's responsive, open the Device section of {{companionApp}}, select Reset Device, and confirm."],
      },
      {
        slug: "clear-app-data",
        shortLabel: "Reinstall the app",
        title: "Clear the app data and re-pair",
        instructions: [
          "If the issue continues, go to your phone's Settings → Apps → {{companionApp}} → Storage → Clear Data, then reopen the app and reconnect the watch.",
        ],
      },
      {
        slug: "still-frozen",
        shortLabel: "Still not working",
        title: "If it's still frozen or blacked out",
        instructions: [
          "This qualifies for a free replacement under the 45-day guarantee if within the first 45 days of purchase — contact support directly rather than continuing to troubleshoot.",
        ],
      },
    ],
  },
  {
    key: "PAIR",
    slug: "pairing",
    label: "Won't pair, or keeps disconnecting",
    description: "Can't find the watch in the app, or it disconnects repeatedly.",
    steps: [
      {
        slug: "pair-from-app",
        shortLabel: "Pair via app",
        title: "Pair from the app, not phone Bluetooth settings",
        instructions: [
          "Carbinox watches pair through the app directly — pairing from the phone's native Bluetooth settings list first can cause a failed pairing, per the manual.",
        ],
        visualSlot: "pairingApp",
      },
      {
        slug: "proximity-background",
        shortLabel: "Check range",
        title: "Check proximity and background app",
        instructions: [
          "Bluetooth range is about 10 meters. Beyond that, or if the app isn't running in the background, the watch disconnects and needs to re-pair.",
        ],
      },
      {
        slug: "remove-competition",
        shortLabel: "Other devices",
        title: "Remove other Bluetooth competition",
        instructions: [
          "If the phone is already connected to another Bluetooth device, or recently ran low on battery, the watch connection can drop.",
        ],
      },
      {
        slug: "remove-readd",
        shortLabel: "Re-pair",
        title: "Remove and re-add the device",
        instructions: ["In the app, remove the watch from My Devices, then add it again as if pairing for the first time."],
        visualSlot: "pairingApp",
      },
    ],
  },
  {
    key: "NOTIF",
    slug: "notifications",
    label: "Not receiving notifications (SMS/WhatsApp)",
    description: "Calls, texts, or app alerts aren't showing up on the watch.",
    steps: [
      {
        slug: "silent-modes",
        shortLabel: "Check silent mode",
        title: "Check both silent modes",
        instructions: [
          "Confirm neither the phone nor the watch is in silent/Do Not Disturb — either one blocks notifications from reaching the watch.",
        ],
      },
      {
        slug: "app-permissions",
        shortLabel: "App permissions",
        title: "Check notification permissions in the app",
        instructions: [
          "Confirm the specific app (e.g. WhatsApp) is toggled on under notification settings, and location + notification permissions are granted on the phone.",
        ],
      },
      {
        slug: "background-app",
        shortLabel: "Keep app open",
        title: "Keep the app running in the background",
        instructions: [
          "If the companion app is fully closed (not just backgrounded), the watch stops receiving new notifications until it's reopened.",
        ],
      },
    ],
  },
  {
    key: "READINGS",
    slug: "health-readings",
    label: "Heart rate / steps look inaccurate",
    description: "Heart rate, step count, or other sensor readings look off.",
    steps: [
      {
        slug: "complete-profile",
        shortLabel: "Complete profile",
        title: "Complete the profile",
        instructions: [
          "Confirm weight, age, and height are filled in accurately in the app — incomplete profile data is the most common cause of inaccurate stats.",
        ],
      },
      {
        slug: "check-fit",
        shortLabel: "Check fit",
        title: "Check the fit",
        instructions: ["The sensor needs snug, consistent contact with skin. A loose band is a common secondary cause of inaccurate heart rate."],
      },
      {
        slug: "expected-margin",
        shortLabel: "Expected margin",
        title: "Set expectations on margin",
        instructions: ["A 5–15% error margin versus a medical device is normal for any wrist tracker — this isn't necessarily a defect."],
      },
      {
        slug: "factory-reset",
        shortLabel: "Factory reset",
        title: "Reset to factory settings if it persists",
        instructions: ["If accuracy is still clearly off after the above, reset to factory settings and set up again."],
      },
    ],
  },
  {
    key: "BATTERY",
    slug: "battery",
    label: "Battery doesn't last / drains fast",
    description: "Battery life is much shorter than expected.",
    steps: [
      {
        slug: "full-charge-and-restart",
        shortLabel: "Charge & restart",
        title: "Fully charge it, then restart",
        instructions: [
          "Charge the watch to 100%, then restart it and see if the drain rate improves. Keep an eye on how fast the percentage drops over the next few hours.",
        ],
        visualSlot: "chargingAlignment",
      },
      {
        slug: "firmware-update",
        shortLabel: "Update firmware",
        title: "Check for a firmware update",
        instructions: [
          "Open {{companionApp}} → Device → Firmware Update and install one if available — a firmware update alone has resolved sudden fast-drain cases.",
        ],
        visualSlot: "otaUpdate",
        additionalHelp: [
          {
            title: "Watch exposed to water or heat recently?",
            content:
              "If unusually fast drain started right after a trip or activity, note any exposure to water, high heat, or anything outside normal use — that context helps narrow down whether it's a settings issue or a hardware one.",
          },
        ],
      },
      {
        slug: "lower-brightness",
        shortLabel: "Lower brightness",
        title: "Lower screen brightness",
        instructions: ["Reduce brightness and turn off notifications that aren't needed — the two biggest drains on daily battery life."],
      },
      {
        slug: "battery-saver",
        shortLabel: "Battery saver",
        title: "Turn on battery-saving mode",
        instructions: ["Enable the built-in battery saver from the watch or the app."],
      },
      {
        slug: "bluetooth-calling-usage",
        shortLabel: "Bluetooth calling",
        title: "Check Bluetooth Calling usage",
        instructions: ["If Bluetooth Calling is enabled and used often, it noticeably reduces battery life versus normal use."],
        visualSlot: "bluetoothCalling",
      },
    ],
  },
  {
    key: "WATER",
    slug: "water",
    label: "Water got in / display fogged",
    description: "Moisture, fogging, or condensation under the glass.",
    steps: [
      {
        slug: "dry-out",
        shortLabel: "Dry it out",
        title: "Dry it out before charging",
        instructions: [
          "Shake the watch gently to clear water from case holes, wipe with a soft cloth dampened with clean water (especially after salt water), and let it dry fully before wearing or charging again.",
        ],
      },
      {
        slug: "rating-coverage",
        shortLabel: "What's covered",
        title: "Know what the rating actually covers",
        instructions: ["{{waterGuidance}}"],
      },
      {
        slug: "avoid-conditions",
        shortLabel: "Avoid going forward",
        title: "Avoid the excluded conditions going forward",
        instructions: ["Saunas and hot showers affect the seal over time even on watches that handle swimming fine."],
      },
    ],
  },
  {
    key: "UNITS",
    slug: "units",
    label: "Wrong time format, units, or temperature scale",
    description: "Time, distance, or temperature is displaying in the wrong format.",
    steps: [
      {
        slug: "temperature-units",
        shortLabel: "Temperature units",
        title: "Change temperature units",
        instructions: ["Open the app → Weather settings to switch between Celsius and Fahrenheit."],
      },
      {
        slug: "time-distance-units",
        shortLabel: "Time & distance",
        title: "Change time format or distance units",
        instructions: ["Both 12/24-hour time and meters/miles are changed from the same Settings area in the app."],
      },
      {
        slug: "resets-on-own",
        shortLabel: "Keeps resetting",
        title: "If it resets on its own",
        instructions: ["A dropped Bluetooth connection or phone network issue can cause these settings to revert — reapply after reconnecting."],
      },
    ],
  },
  {
    key: "STICKY_BUTTONS",
    slug: "sticky-buttons",
    label: "A button feels stuck or hard to press",
    description: "A physical button (Select, Back, Up, or Down) sticks, feels stiff, or needs prying to respond.",
    steps: [
      {
        slug: "stop-forcing",
        shortLabel: "Stop forcing it",
        title: "Stop prying or forcing the button",
        instructions: [
          "Don't pry the button out with a fingernail or anything sharp — that risks causing more damage. A physically sticking button is usually debris around the button opening, not a sensor or software fault.",
        ],
        visualSlot: "buttonLayout",
      },
      {
        slug: "clean-button-openings",
        shortLabel: "Clean the openings",
        title: "Clean around the button openings",
        instructions: [
          "Power the watch off if possible. With a clean, soft, dry cloth, gently wipe around the affected button and the small gap around it.",
          "While cleaning, gently press and release the button several times to help loosen any debris — don't use anything sharp.",
          "Once it's clean and dry, turn the watch back on and test the button again.",
        ],
      },
      {
        slug: "restart-carefully",
        shortLabel: "Careful restart",
        title: "Force a restart — carefully",
        instructions: [
          "{{restartInstructions}}",
          "If the stuck button is the one you'd need to hold for this, don't force it — skip this step and go straight to contacting support instead.",
        ],
        visualSlot: "restart",
      },
      {
        slug: "send-video",
        shortLabel: "Send a video",
        title: "Still sticking? Send a close-up video",
        instructions: [
          "Record a short video showing the button being pressed — especially how it feels and what happens on-screen. Support reviews a video for physical button issues before proceeding with a replacement.",
        ],
      },
    ],
  },
  {
    key: "STRAP",
    slug: "physical-damage",
    label: "Strap, button, or glass damaged",
    description: "Physical damage to the strap, a button, or the glass.",
    steps: [
      {
        slug: "document-damage",
        shortLabel: "Document it",
        title: "Document the damage",
        instructions: ["Take a clear photo of the damaged strap, button, or glass — this speeds up a warranty claim."],
      },
      {
        slug: "check-coverage",
        shortLabel: "Check coverage",
        title: "Check what's covered",
        instructions: ["Straps, buttons, and glass damage from normal use are covered under the Lifetime Warranty — a free replacement part, no questions asked."],
      },
      {
        slug: "contact-support",
        shortLabel: "Contact support",
        title: "Contact support for the replacement",
        instructions: ["Send a photo and your watch model to support to get the replacement part started."],
      },
    ],
  },
];

export function findIssueBySlug(slug: string): TroubleshootingIssue | undefined {
  return ISSUES.find((i) => i.slug === slug);
}
