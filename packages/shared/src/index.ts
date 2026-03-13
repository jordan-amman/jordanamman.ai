export type PortfolioProjectCategory =
  | "rag"
  | "agents"
  | "local-llm"
  | "evaluation"
  | "infra";

export type PortfolioProject = {
  slug: string;
  title: string;
  category: PortfolioProjectCategory;
  summary: string;
  status: "planned" | "in-progress" | "live";
};

export type ContactRequest = {
  id: string;
  name: string;
  email: string;
  message: string;
  budget?: string;
  createdAt: string;
  ttl?: number;
};
