import type { WatchModel } from "@/lib/troubleshooting/models";

const PLACEHOLDER_PATTERN = /\{\{(restartInstructions|waterGuidance|companionApp)\}\}/g;

/**
 * Fills `{{restartInstructions}}` / `{{waterGuidance}}` / `{{companionApp}}`
 * placeholders with the selected watch model's fields, so one instruction
 * line can cover all models instead of duplicating near-identical text.
 */
export function interpolateText(text: string, watch: WatchModel): string {
  return text.replace(PLACEHOLDER_PATTERN, (_match, key: keyof WatchModel) => String(watch[key]));
}

export function interpolateInstructions(instructions: string[], watch: WatchModel): string[] {
  return instructions.map((line) => interpolateText(line, watch));
}
