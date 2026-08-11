import type { WatchModel } from "@/lib/content";

const PLACEHOLDER_PATTERN = /\{\{(restartInstructions|waterGuidance|companionApp)\}\}/g;

/**
 * Fills a step's `{{restartInstructions}}` / `{{waterGuidance}}` /
 * `{{companionApp}}` placeholders with the selected watch model's fields, so
 * one step body can cover all 5 models instead of duplicating near-identical
 * text per model.
 */
export function interpolateStepBody(body: string, watch: WatchModel): string {
  return body.replace(PLACEHOLDER_PATTERN, (_match, key: keyof WatchModel) => String(watch[key]));
}
