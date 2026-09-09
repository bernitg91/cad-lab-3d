import { TopicGuidePage } from "@/components/TopicGuidePage";
import { getTopicGuide } from "@/lib/topic-guides";
import { createPageMetadata } from "@/lib/seo";
const guide = getTopicGuide("impresion-3d-polvo-sls-mjf");
export const metadata = createPageMetadata({ title: guide.title, description: guide.description, path: "/impresion-3d-polvo-sls-mjf" });
export default function Page() { return <TopicGuidePage guide={guide} />; }
