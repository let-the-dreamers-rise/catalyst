# CATALYST-X Pitch Deck Outline

This is a complete slide-by-slide outline for a presentation deck. It is written so you can directly convert it into PowerPoint, Google Slides, or Canva.

Recommended length: 16 core slides + 5 appendix slides  
Recommended presentation time: 6 to 8 minutes  
Design style: premium scientific product operating system, dark research-lab interface, molecular green/cyan/amber accents, clean diagrams, minimal clutter

---

## Slide 1: Title

**Slide title:** CATALYST-X  
**Subtitle:** Self-Learning AI Discovery Engine for Sustainable Chemistry  
**Visual:** Large molecular/network field with a closed-loop discovery ring.  
**Key copy:**

- AI platform for catalyst, enzyme, and microbial pathway discovery
- Built for sustainable fuels and chemical production
- Learns from experimental outcomes over time

**Speaker note:**  
CATALYST-X is not a static prediction tool. It is a discovery operating system that improves as researchers test candidates in the lab.

---

## Slide 2: The One-Line Thesis

**Slide title:** Discovery should learn from every experiment  
**Visual:** Simple loop: Target -> Generate -> Predict -> Test -> Learn -> Better Targeting.  
**Key copy:**

- Today, chemistry discovery loses learning between experiments.
- CATALYST-X turns each result, including failure, into structured model improvement.

**Speaker note:**  
The main idea is simple: if a platform can learn from both successful and failed experiments, every research cycle becomes smarter than the last one.

---

## Slide 3: Problem

**Slide title:** Sustainable chemistry is stuck in slow discovery cycles  
**Visual:** Four bottleneck columns or a funnel with friction points.  
**Key copy:**

1. Trial-and-error experimentation is slow.
2. Catalyst and enzyme design spaces are enormous.
3. Literature, databases, and lab records are fragmented.
4. Failed experiments rarely improve future predictions.

**Speaker note:**  
For transformations like CO2-to-methanol or biomass-to-fuels, the bottleneck is not only whether we can run experiments. The bottleneck is choosing the right experiments and learning from the wrong ones.

---

## Slide 4: Why It Matters

**Slide title:** Faster discovery means faster sustainable production  
**Visual:** Sustainable chemistry value chain: CO2, biomass, ethanol, enzymes, fuels, chemicals.  
**Key copy:**

- CO2 utilization needs better catalysts.
- Biomass conversion needs selective, stable routes.
- Synthetic biology needs enzyme and strain optimization.
- Industrial sustainability depends on faster iteration.

**Speaker note:**  
Cleaner fuels and chemicals require better catalysts and biological pathways. The faster we can find and validate them, the faster sustainable industrial processes can scale.

---

## Slide 5: Product Overview

**Slide title:** A discovery operating system, not just a model  
**Visual:** Screenshot-inspired app map with tabs: Overview, Reaction Studio, Candidate Atlas, Bio Pathways, Experiment Feedback, Learning Loop.  
**Key copy:**

- Define reaction goals
- Retrieve scientific evidence
- Generate candidates
- Predict performance
- Visualize and compare
- Export to lab testing
- Log experimental outcomes
- Improve the next cycle

**Speaker note:**  
The interface is designed around how researchers actually work: target, evidence, candidates, experiments, feedback, and model improvement.

---

## Slide 6: Core Workflow

**Slide title:** Closed-loop discovery workflow  
**Visual:** Circular workflow diagram with eight steps.  
**Key copy:**

1. Input target reaction
2. Retrieve known data
3. Generate candidates
4. Predict activity, selectivity, stability, yield
5. Visualize candidates
6. Export top candidates
7. Capture lab outcomes
8. Retrain and refine

**Speaker note:**  
The loop is the product. The system becomes more valuable as it accumulates structured experimental outcomes.

---

## Slide 7: Reaction Studio

**Slide title:** Start with the chemistry target  
**Visual:** Reaction Studio screen or mockup: equation, conditions, retrieval rows.  
**Key copy:**

- Researcher defines target transformation
- Operating constraints shape the search
- Retrieval gathers prior evidence before generation
- Conditions and provenance are visible before ranking

**Speaker note:**  
Bad inputs create bad predictions. The Reaction Studio makes target definition and evidence retrieval explicit.

---

## Slide 8: Candidate Atlas

**Slide title:** Rank candidates by performance, risk, and uncertainty  
**Visual:** Candidate list + molecular visualization + radar chart.  
**Key copy:**

- Discovery score
- Activity, selectivity, stability, yield
- Carbon efficiency
- Synthesis risk
- Model rationale
- Next experiment recommendation

**Speaker note:**  
The goal is not to show a single magic molecule. The goal is to give researchers a ranked short list with clear tradeoffs and reasoning.

---

## Slide 9: Synthetic Biology Module

**Slide title:** Catalysts and biology in one discovery loop  
**Visual:** Pathway map with bottleneck node and intervention list.  
**Key copy:**

- Enzyme mutation suggestions
- Microbial strain recommendations
- Metabolic pathway generation
- Flux and yield prediction
- Bottleneck analysis

**Speaker note:**  
Sustainable production often requires both catalysis and biology. CATALYST-X includes synthetic biology so teams can compare chemical and biological routes.

---

## Slide 10: Experiment Feedback

**Slide title:** The lab result becomes model fuel  
**Visual:** Predicted vs observed result card, drift flag, lab note input.  
**Key copy:**

- Log observed yield, selectivity, and stability
- Compare prediction vs experiment
- Flag model drift
- Preserve provenance and quality
- Treat failed experiments as learning data

**Speaker note:**  
This is the most important differentiator. CATALYST-X does not hide failed experiments. It converts them into the next training signal.

---

## Slide 11: Learning Loop

**Slide title:** The platform improves where it was wrong  
**Visual:** Blind spot map by domain: water sensitivity, coke formation, impurity tolerance, redox overflow.  
**Key copy:**

- Identifies model blind spots
- Separates drift by chemistry family
- Scores data quality before retraining
- Generates new hypotheses
- Triggers retraining when evidence is strong enough

**Speaker note:**  
The system should not retrain blindly. It should understand where the model drift happened and whether the new data is trustworthy enough to learn from.

---

## Slide 12: System Architecture

**Slide title:** Architecture for a real discovery platform  
**Visual:** Four-layer architecture: Data, AI/ML, Simulation, Product UI.  
**Key copy:**

**Data layer**
- Materials Project
- Open Catalyst / Fair-Chem datasets
- BRENDA
- Literature and lab records
- Knowledge graph

**AI/ML layer**
- Retrieval models
- Generative models
- GNN predictors
- Protein models
- Flux analysis

**Simulation layer**
- Energy profiling
- Stability estimation
- Metabolic flux modeling

**User layer**
- Reaction dashboard
- Molecular visualization
- Pathway maps
- Feedback and retraining

**Speaker note:**  
The prototype is frontend-complete. The roadmap is to connect it to real retrieval, simulation, and model services.

---

## Slide 13: Competitive Landscape

**Slide title:** The ecosystem exists, but the gap is the closed product loop  
**Visual:** 2x2 map or table: Databases, model research, enterprise materials AI, closed-loop research OS.  
**Key copy table:**

| Player/category | Strength | CATALYST-X difference |
| --- | --- | --- |
| Citrine Informatics | Enterprise materials AI and knowledge reuse | CATALYST-X is specialized for sustainable catalysis + synthetic biology and emphasizes experiment feedback in-product. |
| Kebotix | AI + automation for materials discovery | CATALYST-X combines catalyst, enzyme, pathway, prediction drift, and learning-loop workflows in a research OS. |
| IBM RXN-like tools | Reaction prediction and retrosynthesis | CATALYST-X focuses on candidate discovery, performance ranking, and lab feedback, not only reaction prediction. |
| MatterGen / GNoME / Open Catalyst | Powerful research models and datasets | CATALYST-X is the product layer that turns model outputs into researcher workflows and retraining loops. |
| Materials Project / BRENDA | Scientific data access | CATALYST-X uses databases as inputs to a closed loop, not as the endpoint. |

**Speaker note:**  
If asked whether competitors exist, the honest answer is yes. But CATALYST-X is differentiated by combining retrieval, generation, prediction, lab feedback, and self-improvement in one sustainable chemistry workflow.

---

## Slide 14: Differentiation

**Slide title:** Why CATALYST-X is different  
**Visual:** Five differentiator pillars.  
**Key copy:**

1. Closed-loop learning from real experiments
2. Failed experiments treated as high-value data
3. Catalysis and synthetic biology in one workflow
4. Prediction drift and blind spot analysis
5. Researcher-facing product OS, not just model output

**Speaker note:**  
The strongest point is not that we can generate candidates. The strongest point is that the system learns how to generate better candidates after experiments are run.

---

## Slide 15: Prototype Demo Map

**Slide title:** What is already built  
**Visual:** App navigation screenshot with callouts.  
**Key copy:**

- Multi-tab application
- Guided product tour
- Reaction Studio
- Candidate Atlas
- Three.js molecular viewer
- Bio Pathways
- Experiment Feedback
- Learning Loop
- Responsive design
- Deployed on Vercel

**Speaker note:**  
This is not a landing page. It is a working frontend prototype with stateful workflows and realistic domain data.

---

## Slide 16: Roadmap

**Slide title:** From prototype to pilot  
**Visual:** Three-stage roadmap.  
**Key copy:**

**Stage 1: Prototype**
- Frontend product experience
- Simulated data
- Workflow validation

**Stage 2: Pilot**
- Backend APIs
- Lab data ingestion
- Real retrieval pipelines
- Experiment tracking

**Stage 3: Full platform**
- Model retraining
- Multi-user collaboration
- Knowledge graph
- LIMS/ELN integration
- Deployment with research teams

**Speaker note:**  
The prototype validates the user workflow. The next step is connecting it to actual lab and model infrastructure.

---

## Slide 17: Impact

**Slide title:** What success looks like  
**Visual:** Before/after discovery cycle timeline.  
**Key copy:**

- Fewer low-value experiments
- Faster candidate shortlisting
- Better reuse of internal knowledge
- Higher value from failed experiments
- More accountable model improvement
- Faster path to sustainable fuels and chemicals

**Speaker note:**  
The impact is not only speed. It is better scientific memory across cycles.

---

## Slide 18: Closing

**Slide title:** CATALYST-X learns how to discover better  
**Visual:** Closed loop with the final line centered.  
**Key copy:**

We are not building a system that only predicts molecules.  
We are building one that learns how to discover them better over time.

**Speaker note:**  
Close with the feedback loop. That is the heart of the project.

---

# Appendix Slides

## Appendix A: Technical Stack

**Slide title:** Prototype implementation  
**Key copy:**

- React + Vite
- Three.js molecular visualization
- Lucide icon system
- Local structured sample data
- Vercel deployment
- GitHub source repository

---

## Appendix B: What Is Simulated vs Real

**Slide title:** Prototype honesty  
**Key copy:**

**Implemented now**
- Product UI
- Workflow interactions
- Candidate ranking interface
- Feedback logging simulation
- Retraining readiness simulation

**Future implementation**
- Real database connectors
- Real ML inference
- Backend persistence
- Lab ingestion pipelines
- Retraining jobs

---

## Appendix C: Expected Questions And Answers

### Q1. Are there already companies doing AI for chemistry?

Yes. Companies and research groups are working on AI materials discovery, reaction prediction, and self-driving labs. Examples include Citrine Informatics, Kebotix, IBM RXN-style reaction tools, Microsoft MatterGen, Google DeepMind GNoME, and Open Catalyst / Fair-Chem research infrastructure.

CATALYST-X is different because it is designed as a closed-loop discovery operating system for sustainable catalysis and synthetic biology. It combines target definition, evidence retrieval, candidate generation, prediction, visualization, experiment logging, drift analysis, and retraining readiness in one workflow.

### Q2. Is this a real AI model today?

The current prototype is frontend-complete and uses realistic simulated data. The architecture is designed to connect to real retrieval models, GNN predictors, protein models, flux models, and lab feedback pipelines.

### Q3. Why include failed experiments?

Because failed experiments reveal model blind spots. If the model predicted high yield but the lab observed poor performance, that discrepancy is valuable training data.

### Q4. Why combine catalysis and synthetic biology?

Sustainable production often needs both chemical catalysts and biological systems. A single product workflow lets researchers compare routes, interventions, and bottlenecks across both domains.

### Q5. What is the business or deployment path?

Start with research pilots for target transformations such as CO2-to-methanol, ethanol-to-hydrocarbons, and biomass-to-fuels. Then connect to lab data ingestion, model scoring APIs, and retraining pipelines.

---

## Appendix D: Competitive Positioning Script

If asked: "What if another company already has this?"

Use this answer:

"There are strong companies and research efforts in AI materials discovery, but CATALYST-X is focused on a specific gap: turning sustainable catalyst and synthetic biology discovery into a closed-loop operating system. Many systems are databases, model outputs, retrosynthesis tools, or automation platforms. CATALYST-X is designed around the full researcher workflow: define target, retrieve evidence, generate candidates, predict performance, test in the lab, capture observed outcomes, identify prediction drift, and improve future discovery cycles. The differentiator is not just AI generation. The differentiator is learning from real experimental outcomes, especially failures."

---

## Appendix E: Slide Design Notes

Use a premium scientific product style:

- Dark background with subtle grid
- Molecular green, cyan, and amber accents
- Large clean typography
- Avoid crowded paragraph slides
- Use diagrams and product screenshots
- Use one main idea per slide
- Keep competitive analysis as a table or market map
- Put long Q&A in appendix, not core slides
