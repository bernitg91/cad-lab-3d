import { TopicGuidePage } from "@/components/TopicGuidePage";
import { getTopicGuide } from "@/lib/topic-guides";
import { createPageMetadata } from "@/lib/seo";
const guide = getTopicGuide("tipos-impresoras-3d");
export const metadata = createPageMetadata({ title: guide.title, description: guide.description, path: "/tipos-impresoras-3d" });
export default function Page() { return <TopicGuidePage guide={guide} />; }
