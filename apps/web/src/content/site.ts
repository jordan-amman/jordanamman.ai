export type ProjectStatus = "Planned" | "In Progress" | "Shipped";

export type ProjectItem = {
  slug: string;
  title: string;
  value: string;
  status: ProjectStatus;
  stack: string[];
  summary: string;
  outcome: string;
  problem: string;
  goal: string;
  architecture: string[];
  features: string[];
  tradeoffs: string[];
  challenges: string[];
  results: string[];
  nextSteps: string[];
  demos?: Array<{
    title: string;
    description: string;
    placeholder: string;
  }>;
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/work-with-me", label: "Work With Me" },
  { href: "/contact", label: "Contact" }
];

export const capabilityCards = [
  {
    title: "RAG Systems",
    description: "Retrieval pipelines with source citations, relevance testing, and practical latency budgets."
  },
  {
    title: "Agent Workflows",
    description: "Tool-using agents with guardrails, retries, observability, and human escalation paths."
  },
  {
    title: "AI Evaluation",
    description: "Evaluation loops for answer quality, hallucination control, and prompt regression tracking."
  },
  {
    title: "AWS Platform Engineering",
    description: "Cost-aware cloud architecture across Lambda, API Gateway, DynamoDB, queues, and storage."
  },
  {
    title: "Local LLM Engineering",
    description: "Practical local model workflows for secure experimentation and developer productivity."
  },
  {
    title: "API and Full-Stack Delivery",
    description: "Production-minded web and API systems from architecture decisions to deployable code."
  }
];

export const whatIBuild = [
  "Retrieval-driven applications for internal knowledge and customer support",
  "Agent workflows for research, triage, and operational automation",
  "Evaluation pipelines that monitor quality and prevent silent model drift",
  "Cloud-hosted APIs for AI products with reliability and cost controls",
  "Developer tooling that speeds delivery without sacrificing maintainability",
  "Architecture prototypes that derisk roadmap decisions"
];

export const architecturePrinciples = [
  "Design for reliability first, then optimize complexity.",
  "Use measurable quality gates for model outputs and retrieval relevance.",
  "Choose AWS services based on team velocity and long-term operating cost.",
  "Treat observability and security as first-class architecture concerns."
];

export const engagementTypes = [
  "Architecture and technical advisory",
  "Project-based AI system builds",
  "Contract backend and platform engineering",
  "Rapid prototypes with production-minded foundations"
];

export const faqs = [
  {
    question: "What kinds of teams are the best fit?",
    answer:
      "Founders and engineering teams building AI products who need practical architecture and hands-on delivery support."
  },
  {
    question: "Do you work on greenfield and existing systems?",
    answer:
      "Yes. I can help design from scratch or improve reliability, observability, and delivery speed in existing systems."
  },
  {
    question: "How quickly can we start?",
    answer:
      "Most engagements start with a short discovery call and architecture brief in the first week."
  }
];

export const architectureNotes = [
  {
    slug: "aws-first-rag-system",
    title: "Building an AWS-first RAG system",
    summary: "A pragmatic baseline for retrieval services, vector storage, and API integration.",
    tags: ["AWS", "RAG", "Retrieval"],
    context:
      "Most RAG architectures are either too simple (single embedding -> retrieval) or too complex (heavy reranking pipelines). The sweet spot is a managed, scalable baseline that balances retrieval quality with operational simplicity.",
    goal: "Define a production-ready RAG architecture that works with AWS managed services and scales from MVP to thousands of requests per day.",
    components: [
      "Document ingestion pipeline (chunking, embedding, indexing)",
      "Vector storage and search (OpenSearch or DynamoDB with vector support)",
      "Retrieval ranker and context compilation",
      "Generation API endpoint with source citation",
      "Feedback loop for relevance tuning"
    ],
    decisions: [
      "Use OpenSearch for hybrid search (BM25 + vector) rather than vector-only",
      "Chunk documents at semantic boundaries, not fixed sizes",
      "Implement source citation at generation time, not retrieval",
      "Cache embeddings at use-time, not ingestion-time",
      "Return retrieval confidence scores alongside results"
    ],
    tradeoffs: [
      "Hybrid search is slower than vector-only but more accurate for domain-specific docs",
      "Managed services cost more than self-hosted but reduce operational burden",
      "Citation generation adds latency but critical for credibility"
    ],
    stack: [
      "AWS Lambda for API",
      "OpenSearch for vector + hybrid search",
      "DynamoDB for metadata and feedback",
      "CloudFront for caching",
      "EventBridge for async processing"
    ],
    considerations: [
      "Plan embedding model choice upfront (switching is expensive)",
      "Design feedback collection early (essential for tuning)",
      "Monitor retrieval quality, not just search latency",
      "Set confidence thresholds and fallback behavior"
    ],
    whenToUse: [
      "Building QA systems for internal knowledge",
      "Customer support augmentation with branded docs",
      "Research assistance with source traceability",
      "Product documentation search that needs accuracy"
    ],
    whenToAvoid: [
      "Real-time pricing or legal document search (needs guarantees)",
      "Highly specialized domains with minimal training data",
      "Systems where retrieval quality cannot be measured"
    ],
    furtherReading: [
      "Evaluation metrics for retrieval-augmented generation",
      "Chunking strategies and their impact on retrieval quality",
      "Cost optimization for vector search at scale"
    ]
  },
  {
    slug: "agent-guardrails",
    title: "Designing agent workflows with guardrails",
    summary: "Patterns for tool permissions, retries, and fallback behavior in agentic systems.",
    tags: ["Agents", "Safety", "Design Patterns"],
    context:
      "Agents are powerful but risky. Systems without guardrails can make costly tool calls, enter infinite loops, or produce unpredictable output. This note covers practical constraints.",
    goal: "Build agent systems that are reliable, auditable, and safe to deploy.",
    components: [
      "Tool registry with explicit permissions and rate limits",
      "Planning phase that reasons before acting",
      "Execution with retry limits and circuit breakers",
      "Checkpoints for human validation on critical actions",
      "Audit log for all tool invocations"
    ],
    decisions: [
      "Declare all tools upfront, no dynamic tool discovery",
      "Separate planning from execution (two-phase workflow)",
      "Implement tool permission levels (read-only, write, critical)",
      "Use explicit try/catch around each tool call",
      "Log all tool calls and results for debugging"
    ],
    tradeoffs: [
      "Guardrails add latency and complexity",
      "Explicit tool declaration is less flexible than dynamic discovery",
      "Human checkpoints slow down automation but prevent costly mistakes"
    ],
    stack: [
      "AWS Step Functions for orchestration",
      "Lambda for planning and execution steps",
      "DynamoDB for audit logs",
      "SNS for checkpoint notifications"
    ],
    considerations: [
      "Define clear success and failure criteria per action",
      "Monitor tool call patterns for anomalies",
      "Plan fallback behavior for each tool",
      "Budget tokens and API calls per agent run"
    ],
    whenToUse: [
      "Systems that modify external state (databases, APIs)",
      "Agents handling financial or sensitive data",
      "Long-running workflows with multiple steps",
      "Systems where human oversight is required"
    ],
    whenToAvoid: [
      "Read-only conversational agents",
      "Systems with minimal consequences for errors",
      "Exploratory prototypes where safety is not critical"
    ],
    furtherReading: [
      "Tool calling best practices and common pitfalls",
      "Designing fallback strategies for agent failures",
      "Monitoring and alerting patterns for agentic systems"
    ]
  },
  {
    slug: "local-llm-evaluation",
    title: "Evaluating local LLM coding assistants",
    summary: "A repeatable evaluation approach for code quality, speed, and failure modes.",
    tags: ["LLM", "Evaluation", "Local Models"],
    context:
      "Local models are appealing for privacy but slower and lower quality. Evaluation is critical to understanding the tradeoffs. Most eval setups are ad hoc.",
    goal: "Build a standardized benchmark and evaluation harness for local coding models.",
    components: [
      "Curated test dataset (real coding tasks from repos)",
      "Scoring rubric for code quality, safety, and completeness",
      "Performance metrics (latency, token usage, memory)",
      "Failure mode analysis (what kinds of code does the model struggle with)",
      "Trend tracking across model versions"
    ],
    decisions: [
      "Use real code patterns, not synthetic examples",
      "Score by multiple dimensions (correctness, readability, performance)",
      "Measure actual inference speed in target environment",
      "Track both successes and failure patterns",
      "Automate scoring where possible, leave room for manual review"
    ],
    tradeoffs: [
      "Comprehensive eval is time-consuming to set up",
      "Manual evaluation doesn't scale but is most reliable",
      "Local inference is slow, making eval expensive",
      "Model diversity makes comparison difficult"
    ],
    stack: [
      "Python for test runners",
      "Ollama or vLLM for local inference",
      "AST analysis for code quality",
      "pytest for automated code execution tests"
    ],
    considerations: [
      "Test in the exact target environment (GPU, RAM, OS)",
      "Include real-world cold start times",
      "Compare against hosted models as baseline",
      "Track model size and quantization impact"
    ],
    whenToUse: [
      "Choosing between local models for production use",
      "Justifying infrastructure spending for local inference",
      "Tuning model selection for specific coding tasks",
      "Monitoring quality over time as models improve"
    ],
    whenToAvoid: [
      "One-off experiments with throwaway models",
      "Scenarios where latency isn't a constraint",
      "Cases where you're not deploying locally"
    ],
    furtherReading: [
      "Evaluation metrics for code generation models",
      "Quantization and its impact on model quality",
      "Local inference optimization techniques"
    ]
  },
  {
    slug: "cost-first-ai-architecture",
    title: "Cost-first cloud design for AI prototypes",
    summary: "How to control spend while keeping architecture ready for growth.",
    tags: ["AWS", "Cost", "Strategy"],
    context:
      "AI prototypes are expensive. Cloud costs grow quickly if you're not intentional. Early decisions about storage, compute, and concurrency compound.",
    goal: "Design AI systems with cost as a first-class architectural concern.",
    components: [
      "Request batching to reduce API calls",
      "Caching layers (embedding cache, response cache)",
      "Cost budget enforcement (per request, per user, per day)",
      "Async processing for non-critical work",
      "Storage tiering (hot data vs. archive)"
    ],
    decisions: [
      "Cache all LLM calls and embeddings by default",
      "Use serverless by default, scale up only if needed",
      "Batch inference requests when possible",
      "Archive old data aggressively",
      "Monitor cost per request and set alerts"
    ],
    tradeoffs: [
      "Caching adds latency (staleness tradeoff)",
      "Batch processing sacrifices real-time responsiveness",
      "Async work delays user feedback",
      "Conservative quotas limit functionality"
    ],
    stack: [
      "AWS Lambda for serverless compute",
      "DynamoDB for low-latency cache",
      "S3 with lifecycle policies for storage",
      "SQS for batch job queuing",
      "CloudWatch for cost monitoring"
    ],
    considerations: [
      "Set daily/monthly cost budgets upfront",
      "Monitor cost per feature, not just total spend",
      "Plan for peak usage patterns early",
      "Use spot instances and reserved capacity for predictable work"
    ],
    whenToUse: [
      "Early-stage prototypes with unknown usage patterns",
      "Systems serving many users where per-request cost matters",
      "Long-term projects where incremental optimization compounds",
      "Consulting projects where you're absorbing infrastructure cost"
    ],
    whenToAvoid: [
      "Enterprise systems with unlimited budgets",
      "Scenarios where latency is critical and caching hurts",
      "Real-time systems where batching won't work"
    ],
    furtherReading: [
      "Lambda cost optimization and cold start patterns",
      "Serverless architecture economics",
      "Cost allocation and chargeback models for shared infrastructure"
    ]
  }
];

export const metrics = [
  { label: "Projects Built", value: "20+" },
  { label: "AI Systems Explored", value: "40+" },
  { label: "Architecture Notes", value: "60+" },
  { label: "Years Engineering", value: "10+" }
];

export const services = [
  {
    title: "AI Systems Design",
    outcome: "Clear architecture and execution plans for AI-enabled products."
  },
  {
    title: "RAG and Knowledge Systems",
    outcome: "Reliable retrieval quality with measurable relevance and source traceability."
  },
  {
    title: "Agent Workflow Engineering",
    outcome: "Safer automation with controllable tool use, retries, and escalation paths."
  },
  {
    title: "AWS Cloud Architecture",
    outcome: "Production-ready infrastructure optimized for cost, reliability, and speed."
  },
  {
    title: "API and Backend Systems",
    outcome: "Well-structured interfaces and services that scale with product complexity."
  },
  {
    title: "Technical Advisory",
    outcome: "Architecture reviews and decision support for high-impact technical choices."
  }
];

export const projects: ProjectItem[] = [
  {
    slug: "animated-metahumans-audio2face",
    title: "Animated Metahumans (NVIDIA Audio2Face)",
    value:
      "Real-time and file-driven facial animation pipelines that drive MetaHuman lip sync using NVIDIA Audio2Face.",
    status: "Shipped",
    stack: ["Unreal Engine 5", "MetaHuman", "NVIDIA Audio2Face", "Python", "Omniverse"],
    summary:
      "Production-ready experiment proving two animation paths: live microphone speech-to-face and synchronized audio-file playback-to-face for cinematic and gameplay workflows.",
    outcome:
      "Delivered repeatable facial animation workflows that reduced manual lip-sync effort and enabled faster narrative iteration.",
    problem:
      "Manual facial animation and lip-sync authoring were too slow for rapid prototyping and did not scale across short dialogue iterations.",
    goal:
      "Build a reliable MetaHuman facial animation workflow using Audio2Face for both real-time speaking and deterministic audio-file playback.",
    architecture: [
      "Audio input layer supports microphone stream and pre-recorded waveform files",
      "Audio2Face generates blendshape and facial motion data",
      "Bridge/export layer maps animation output to MetaHuman-compatible controls in Unreal Engine",
      "Validation loop checks timing, articulation quality, and dialogue synchronization"
    ],
    features: [
      "Two distinct animation paths for real-time and authored content",
      "Deterministic replay path for consistent takes during capture",
      "Pipeline documentation for repeatability across scenes",
      "Quality pass checklist for mouth-shape and timing validation"
    ],
    tradeoffs: [
      "Real-time mode is highly interactive but more sensitive to microphone noise and room acoustics",
      "File-based mode is slower to iterate than live mode but gives cleaner and repeatable sync",
      "Automated lip-sync speed gains still require targeted manual polish for emotional nuance"
    ],
    challenges: [
      "Calibrating viseme behavior for natural articulation on stylized MetaHuman faces",
      "Reducing latency and jitter in the live microphone path",
      "Maintaining frame-accurate sync between in-game playback and facial motion"
    ],
    results: [
      "Shipped an end-to-end animation workflow used in prototype scenes",
      "Improved delivery speed for dialogue animation compared to manual keyframing",
      "Created a reusable baseline pipeline for future cinematic and interactive characters"
    ],
    nextSteps: [
      "Add emotional blending presets for different character tones",
      "Automate post-process cleanup for common articulation artifacts",
      "Publish benchmark notes for latency and sync quality per hardware profile"
    ],
    demos: [
      {
        title: "Path 1: Live microphone to MetaHuman animation",
        description:
          "Speak into a microphone and stream audio to Audio2Face to drive facial movement in near real time.",
        placeholder:
          "Placeholder: insert live-demo video showing microphone speech driving MetaHuman lip movement in engine."
      },
      {
        title: "Path 2: Audio file playback with synchronized lip sync",
        description:
          "Load a recorded audio file, play it in game, and drive synchronized facial animation on the MetaHuman.",
        placeholder:
          "Placeholder: insert file-playback demo video showing synchronized in-game audio and MetaHuman lip movement."
      }
    ]
  },
  {
    slug: "aws-rag-tutor",
    title: "AWS RAG Tutor",
    value: "Context-aware tutoring assistant backed by citation-first retrieval.",
    status: "Planned",
    stack: ["Next.js", "AWS Lambda", "API Gateway", "DynamoDB", "OpenSearch"],
    summary: "Learning assistant that retrieves trusted context and responds with references and confidence signals.",
    outcome: "Reduced unsupported answers by introducing retrieval checks and response grounding.",
    problem: "Users needed fast answers tied to reliable sources instead of generic model output.",
    goal: "Deliver a retrieval-first tutoring API with source traceability and manageable cloud cost.",
    architecture: [
      "Ingestion pipeline chunks and indexes course material",
      "HTTP API routes user queries into retrieval and generation pipeline",
      "Response layer returns answer, cited passages, and confidence hints"
    ],
    features: [
      "Source citations in every response",
      "Configurable retrieval depth",
      "Feedback capture for quality tuning"
    ],
    tradeoffs: [
      "Prioritized lower latency over heavy reranking",
      "Used managed AWS services to reduce operational burden"
    ],
    challenges: [
      "Balancing retrieval precision with answer speed",
      "Maintaining coherent prompts across heterogeneous documents"
    ],
    results: ["Architecture baseline drafted", "Data model and API boundaries defined"],
    nextSteps: ["Implement first retrieval pipeline", "Add automated retrieval evaluation suite"]
  },
  {
    slug: "research-agent",
    title: "Research Agent",
    value: "Multi-step research workflow with tool orchestration and human checkpoints.",
    status: "Planned",
    stack: ["TypeScript", "Node.js", "AWS Step Functions", "S3"],
    summary: "Agent system for topic decomposition, tool execution, and evidence-based synthesis.",
    outcome: "Improved consistency in research output quality through structured planning and validation.",
    problem: "Ad hoc research prompts produced inconsistent depth and limited traceability.",
    goal: "Build an auditable workflow for repeatable research assistance.",
    architecture: [
      "Planner creates task graph from user objective",
      "Tools collect evidence from approved sources",
      "Synthesis stage compiles final report with citations"
    ],
    features: ["Task planning", "Tool allowlists", "Checkpoint approvals"],
    tradeoffs: ["Higher complexity than single-shot prompting", "Longer runtime for better reliability"],
    challenges: ["Controlling tool sprawl", "Handling ambiguous user goals"],
    results: ["Workflow map completed", "Tooling constraints and guardrails documented"],
    nextSteps: ["Implement planner and tool runner", "Add automatic contradiction detection"]
  },
  {
    slug: "local-llm-coding-assistant",
    title: "Local LLM Coding Assistant",
    value: "Private coding assistant for secure repositories and offline-friendly workflows.",
    status: "Planned",
    stack: ["Python", "Local Models", "VS Code", "Vector Search"],
    summary: "Developer assistant focused on private codebases and policy-aware suggestions.",
    outcome: "Creates a path for AI-assisted development in restricted environments.",
    problem: "Teams with sensitive code need AI help without sending data to hosted providers.",
    goal: "Enable local inference with useful context retrieval and development ergonomics.",
    architecture: [
      "Local embedding and retrieval index for repo context",
      "On-device model execution with prompt templates",
      "Tooling layer for code actions and diagnostics"
    ],
    features: ["Local inference", "Repo context retrieval", "Policy-aware prompting"],
    tradeoffs: ["Lower model quality than top hosted models", "Higher local compute requirements"],
    challenges: ["Resource management on developer machines", "Balancing latency and context depth"],
    results: ["Planned baseline benchmarks defined", "Initial architecture documented"],
    nextSteps: ["Implement first coding workflows", "Run benchmark matrix"]
  },
  {
    slug: "llm-evaluation-lab",
    title: "LLM Evaluation Lab",
    value: "Evaluation harness for quality, latency, and cost tradeoff decisions.",
    status: "Planned",
    stack: ["Python", "Pytest", "Pandas", "AWS"],
    summary: "Evaluation framework that compares prompts, models, and retrieval configurations.",
    outcome: "Faster architecture decisions with objective quality and cost signals.",
    problem: "Prompt and model changes were hard to compare consistently over time.",
    goal: "Build a repeatable scoring pipeline for experimentation and regression prevention.",
    architecture: [
      "Test dataset with versioned scenarios",
      "Scoring adapters for relevance and factuality",
      "Report output for trend tracking"
    ],
    features: ["Regression suites", "Cost metrics", "Experiment snapshots"],
    tradeoffs: ["Evaluation maintenance overhead", "Requires disciplined dataset curation"],
    challenges: ["Choosing representative test scenarios", "Reducing false positives in quality checks"],
    results: ["Initial metric framework drafted", "Scenario catalog is partially defined"],
    nextSteps: ["Implement benchmark runner", "Add human review workflow"]
  },
  {
    slug: "ai-infrastructure-patterns",
    title: "AI Infrastructure Patterns",
    value: "Reference architectures for API, async jobs, and event-driven AI workflows.",
    status: "In Progress",
    stack: ["Terraform", "AWS", "CloudFront", "Lambda", "DynamoDB"],
    summary: "A set of practical infrastructure patterns for shipping AI features quickly and safely.",
    outcome: "Reusable templates that reduce setup time for new AI initiatives.",
    problem: "Teams repeatedly solved the same architecture questions from scratch.",
    goal: "Capture proven deployment patterns with clear tradeoff guidance.",
    architecture: [
      "Baseline API and worker topology",
      "Observability-first logging and metrics",
      "Cost controls and scaling defaults"
    ],
    features: ["Terraform modules", "Runbooks", "Architecture notes"],
    tradeoffs: ["Opinionated defaults may need adaptation", "Template maintenance as services evolve"],
    challenges: ["Balancing flexibility and simplicity", "Keeping docs synced with code"],
    results: ["Faster initial deployments", "Clearer onboarding for infrastructure decisions"],
    nextSteps: ["Expand container patterns", "Add queue-heavy reference design"]
  }
];
