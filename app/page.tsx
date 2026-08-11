import { WATCH_MODELS, ISSUES } from "@/lib/content";
import { TroubleshootWizard } from "@/components/troubleshoot-wizard";

export default function HomePage() {
  return <TroubleshootWizard watchModels={WATCH_MODELS} issues={ISSUES} />;
}
