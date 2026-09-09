import { TopicGuidePage } from "@/components/TopicGuidePage";
import { getTopicGuide } from "@/lib/topic-guides";
import { createPageMetadata } from "@/lib/seo";
const guide = getTopicGuide("filamento-vs-resina");
export const metadata = createPageMetadata({ title: guide.title, description: guide.description, path: "/filamento-vs-resina" });
export default function Page() { return <TopicGuidePage guide={guide} />; }
