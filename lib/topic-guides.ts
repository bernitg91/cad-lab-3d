import { printerGuides } from "@/lib/topics/printers";
import { softwareGuides } from "@/lib/topics/software";

export const topicGuides = [...printerGuides, ...softwareGuides];
export function getTopicGuide(slug: string) {
  const guide = topicGuides.find(item => item.slug === slug);
  if (!guide) throw new Error(`Guía desconocida: ${slug}`);
  return guide;
}
