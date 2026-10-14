import type { Insight } from "@/lib/types";

export const insights: Insight[] = [
  {
    slug: "governing-ai-at-enterprise-scale",
    title: "Governing AI at enterprise scale: a control-plane approach",
    category: "AI Governance",
    excerpt:
      "Why the enterprises that succeed with AI treat governance as architecture rather than process — and what that changes about how they build.",
    publishedAt: "2025-09-18",
    readingMinutes: 8,
    featured: true,
    authorSlug: "lian-zhou",
    detail: [
      {
        kind: "p",
        text: "The enterprises shipping AI reliably have stopped treating governance as a gate at the end of a project. They have made it part of the platform itself — enforced where the request is made, not documented in a policy that arrives months later.",
      },
      { kind: "h2", text: "Governance as architecture" },
      {
        kind: "p",
        text: "When residency, access, and evaluation are platform primitives, they apply to every model by default. New work inherits the controls rather than negotiating them, and the marginal cost of compliance approaches zero.",
      },
      {
        kind: "list",
        items: [
          "Policy decided at request time, not in a quarterly review.",
          "Lineage captured automatically as a by-product of serving.",
          "Controls mapped once and reused across frameworks.",
        ],
      },
      { kind: "h2", text: "The organisational consequence" },
      {
        kind: "p",
        text: "A control plane changes the conversation between risk and engineering. Teams stop arguing about whether a model is allowed and start improving the evidence that shows it is. Governance becomes a shared surface rather than a handoff.",
      },
    ],
  },
  {
    slug: "zero-trust-is-a-data-problem",
    title: "Zero trust is a data problem before it is a network problem",
    category: "Security",
    excerpt:
      "Most zero-trust programmes under-invest in the question that matters most: what data are we protecting, and who can reach it?",
    publishedAt: "2025-08-27",
    readingMinutes: 6,
    featured: true,
    authorSlug: "prisha-nair",
    detail: [
      {
        kind: "p",
        text: "Zero trust is often framed as segmentation and identity. Those matter, but the hardest decisions are about data: classification, residency, and the access rules that follow sensitive records through their entire lifecycle.",
      },
      { kind: "h2", text: "Classify before you segment" },
      {
        kind: "p",
        text: "Segmentation without classification produces a maze with no map. Decide what each datum is, where it may live, and who may reach it — then let the platform enforce that consistently across every hop.",
      },
      {
        kind: "list",
        items: [
          "Access decisions tied to data classification, not just network zone.",
          "Residency enforced at the storage layer.",
          "Every access decision logged immutably.",
        ],
      },
    ],
  },
  {
    slug: "the-latency-budget-for-production-ai",
    title: "The latency budget for production AI",
    category: "Engineering",
    excerpt:
      "A practical framework for keeping inference overhead in single-digit milliseconds without hollowing out safety controls.",
    publishedAt: "2025-07-15",
    readingMinutes: 7,
    featured: false,
    authorSlug: "lian-zhou",
    detail: [
      {
        kind: "p",
        text: "Safety and speed are usually presented as a trade-off. In practice the trade-off comes from where controls are enforced. Run them at the edge of the request path and they cost latency; make them architecture and they cost almost nothing.",
      },
      { kind: "h2", text: "Spend latency where it buys accuracy" },
      {
        kind: "p",
        text: "Budget your milliseconds deliberately. Reserve the expensive work for the steps that improve the answer, and keep the governance layer thin, local, and deterministic.",
      },
    ],
  },
  {
    slug: "data-sovereignty-beyond-checkboxes",
    title: "Data sovereignty beyond checkboxes",
    category: "Compliance",
    excerpt:
      "Residency clauses mean little if keys and operational access cross borders. What genuine sovereignty requires in practice.",
    publishedAt: "2025-06-04",
    readingMinutes: 5,
    featured: false,
    authorSlug: "prisha-nair",
    detail: [
      {
        kind: "p",
        text: "A residency clause that moves data storage but leaves keys and operational access abroad is only half a guarantee. Genuine sovereignty covers the whole chain, from where bits rest to who can operate on them.",
      },
      { kind: "h2", text: "Keys are part of the boundary" },
      {
        kind: "p",
        text: "If encryption keys and support access remain extraterritorial, the practical control has not moved. Sovereignty is proven by the absence of any foreign path to the data, including operational ones.",
      },
    ],
  },
];

export function getLocalInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
