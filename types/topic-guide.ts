export type TopicSection = {
  id: string; title: string; paragraphs?: string[]; bullets?: string[]; steps?: string[];
  table?: { headings: string[]; rows: string[][] };
  media?: string; caption?: string; links?: { label: string; href: string }[];
};
export type TopicGuide = {
  slug: string; title: string; shortTitle: string; category: string; description: string;
  lead: string; takeaway: string; heroMedia: string; heroCaption?: string;
  sections: TopicSection[]; sources: { label: string; href: string }[];
};
