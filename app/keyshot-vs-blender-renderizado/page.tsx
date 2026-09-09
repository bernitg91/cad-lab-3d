import { TopicGuidePage } from "@/components/TopicGuidePage";
import { getTopicGuide } from "@/lib/topic-guides";
import { createPageMetadata } from "@/lib/seo";
const guide = getTopicGuide("keyshot-vs-blender-renderizado");
export const metadata = createPageMetadata({ title: guide.title, description: guide.description, path: "/keyshot-vs-blender-renderizado" });
export default function Page() { return <TopicGuidePage guide={guide} />; }
