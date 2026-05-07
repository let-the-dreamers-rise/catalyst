# CATALYST-X: Self-Learning AI Discovery Engine for Sustainable Chemistry

CATALYST-X is a product prototype for an AI-powered discovery operating system that helps researchers design, rank, test, and continuously improve catalysts, enzymes, and microbial pathways for sustainable fuel and chemical production.

Unlike a static prediction dashboard, CATALYST-X is designed around a closed scientific loop: define a target reaction, retrieve prior evidence, generate candidate designs, predict performance, send candidates to the lab, capture outcomes, and feed the results back into the next discovery cycle.

Live app: [https://catalyst-72rlxz3py-ashwin-goyals-projects.vercel.app](https://catalyst-72rlxz3py-ashwin-goyals-projects.vercel.app)  
Source code: [https://github.com/let-the-dreamers-rise/catalyst-x](https://github.com/let-the-dreamers-rise/catalyst-x)

---

## Why This Exists

Sustainable chemical manufacturing needs faster ways to discover catalysts, enzymes, and pathways for transformations such as:

- CO2 hydrogenation to methanol
- Ethanol upgrading to C5-C12 hydrocarbons
- Biomass-derived sugars to furanic fuel and monomer precursors
- Enzyme and microbial strain optimization for bioproduction

Today, discovery is slowed by four recurring problems:

1. **Slow experiment cycles**  
   Researchers often rely on serial trial-and-error testing.

2. **Huge design spaces**  
   Candidate catalysts, dopants, supports, enzyme variants, operating windows, and microbial pathways create a search space that is too large to explore manually.

3. **Fragmented evidence**  
   Useful knowledge is scattered across literature, patents, public databases, simulation results, and internal lab records.

4. **Failure data is underused**  
   Failed experiments often remain as notes instead of becoming structured learning signals for future model improvement.

CATALYST-X turns this into an integrated workflow where both successful and failed experiments improve future recommendations.

---

## Product Thesis

> We are not only building a system that predicts molecules. We are building a system that learns how to discover better candidates over time.

CATALYST-X is intended to feel like a research product, not a presentation mockup. The prototype includes real product navigation, meaningful state changes, realistic sample records, workflow tabs, a guided product tour, and interactive candidate/feedback flows.

---

## What The Prototype Includes

### 1. Overview

The overview tab gives the research team a command-center view of the current discovery program:

- Active target reaction
- Product objective
- Closed-loop learning status
- Candidate pipeline state
- Recent system events
- Next recommended experiment

### 2. Reaction Studio

The reaction studio lets a researcher define the transformation and operating constraints:

- Target reaction equation
- Temperature window
- Pressure window
- Stability target
- Critical-metal exposure preference
- Retrieved precedents from simulated scientific sources
- Evidence confidence scores
- Candidate search plan

### 3. Candidate Atlas

The candidate atlas ranks generated candidates and lets the user inspect why each candidate was recommended:

- Candidate search and filtering
- Discovery score
- Novelty and synthesis risk
- Predicted activity, selectivity, stability, yield, and carbon efficiency
- Three.js molecular preview
- Model rationale
- Next experiment recommendation
- Shortlist and send-to-feedback actions

### 4. Bio Pathways

The synthetic biology module covers enzyme and microbial-pathway discovery:

- Strain recommendation
- Pathway map
- Bottleneck identification
- Flux and yield signals
- Intervention recommendations
- Enzyme mutation and strain-control suggestions

### 5. Experiment Feedback

This tab closes the loop between prediction and real-world outcomes:

- Select candidate
- Log observed yield
- Log selectivity
- Log stability runtime
- Add lab notes
- Submit result into learning queue
- See prediction-vs-observed drift

The system treats failed or surprising experiments as high-value model improvement data.

### 6. Learning Loop

The learning loop explains how CATALYST-X improves:

- Retraining readiness
- Mean yield error
- Drift records
- Blind spot map
- Generated scientific hypotheses
- Feedback provenance quality

### 7. Product Guide And Tour

The app includes:

- A first-load guided product tour
- A reusable Product Guide tab
- Tour steps that automatically move to the relevant view
- `Next`, `Back`, and `Finish` controls
- Explanations of why each workflow matters, what the user can do, and what signal to notice

---

## Example Data Included

The prototype uses realistic sample data for sustainable chemistry workflows:

- Cu-Zn-Zr oxygen-vacancy alloy for CO2-to-methanol
- In2O3-ZrO2 hollow nanorods
- NiGa-on-SiO2 bimetallic island
- ZnGa-ZSM-5 tandem pore gradient
- Hydroxyapatite + Cu-beta dual bed
- GI-Mut12 + Sn-beta biphasic route
- Acetylated cellulase cocktail CX-FDCA-2

The data is simulated for prototype demonstration, but the terminology, metrics, and workflows are modeled around real catalysis and synthetic biology discovery concepts.

---

## Architecture

This repository implements the frontend product prototype.

```text
CATALYST-X Prototype

Frontend
  React + Vite
  Product navigation
  Workflow tabs
  Guided product tour
  Local interactive state
  Three.js molecular visualization

Data Layer In Prototype
  Structured sample reaction records
  Candidate records
  Retrieval records
  Synthetic biology pathway records
  Experiment feedback records

Future Backend
  FastAPI service
  Experiment ingestion API
  Model scoring API
  Retrieval pipeline API
  User and project management

Future AI/ML Layer
  Graph neural network predictors
  Diffusion or transformer generators
  Protein language models
  Flux balance and pathway models
  Active learning and retraining orchestration

Future Knowledge Layer
  Materials Project
  Open Catalyst / Fair-Chem datasets
  BRENDA enzyme data
  Literature and patent extraction
  Internal lab notebooks
  Knowledge graph linking reactions, catalysts, enzymes, conditions, and outcomes
```

---

## Competitive Landscape

CATALYST-X sits in the emerging space of AI-assisted scientific discovery, materials informatics, and self-driving labs. It is not claiming that no one else works on AI for chemistry. The differentiator is the product focus: a closed-loop discovery operating system for sustainable catalysis and synthetic biology that makes failure data central to model improvement.

| Category | Representative systems | What they are strong at | Where CATALYST-X is different |
| --- | --- | --- | --- |
| Enterprise materials AI | Citrine Informatics | Data-driven materials and chemicals development, enterprise R&D knowledge reuse, virtual experimentation | CATALYST-X is narrower and deeper for sustainable catalysis and synthetic biology workflows, with an explicit prediction-vs-experiment feedback loop in the product experience. |
| Self-driving materials labs | Kebotix | AI, physical modeling, cloud workflows, and lab automation for materials discovery | CATALYST-X emphasizes catalyst/enzyme/pathway discovery, failed-experiment learning, and a research OS interface that combines catalysis and synthetic biology in one loop. |
| Reaction prediction tools | IBM RXN for Chemistry and similar synthesis planning tools | Reaction outcome prediction, retrosynthesis, chemistry planning | CATALYST-X is not only reaction prediction. It ranks catalysts, enzymes, pathways, operating windows, and retraining signals for sustainable production targets. |
| Foundation research models | Microsoft MatterGen, Google DeepMind GNoME, Open Catalyst / Fair-Chem | Generative materials models, crystal stability prediction, catalyst surface datasets, large-scale AI research | CATALYST-X is a product layer that could use these advances, but focuses on operational discovery: target definition, evidence retrieval, candidate ranking, experimental feedback, and retraining readiness. |
| Scientific databases | Materials Project, BRENDA | High-value materials and enzyme data access | CATALYST-X treats databases as inputs to a closed loop rather than the final destination. |

### Short Answer If Asked "Does Something Like This Already Exist?"

Yes, parts of the ecosystem exist. There are AI materials platforms, reaction prediction tools, scientific databases, and self-driving lab efforts. CATALYST-X is differentiated by combining:

- Sustainable catalysis and synthetic biology in one product workflow
- Retrieval plus generation plus prediction plus experimental feedback
- Prediction-vs-observed drift analysis
- Failed experiments as first-class learning data
- A researcher-facing operating system rather than a model-only or database-only tool
- A roadmap toward continuous retraining from validated lab outcomes

---

## Why The Feedback Loop Matters

Many discovery systems focus on the best predicted candidate. CATALYST-X also asks:

- Where did the model get surprised?
- Which failures are scientifically useful?
- Which operating conditions cause prediction drift?
- Which chemistry family needs more evidence?
- Which experiments should be run next to improve the model?

This is critical because a failed experiment can be more informative than a marginal success if it reveals a model blind spot.

---

## Technical Stack

- **Frontend:** React 18
- **Build tool:** Vite
- **3D visualization:** Three.js
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Repository:** GitHub

---

## Running Locally

### Prerequisites

- Node.js 18 or newer
- npm

### Setup

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Then open:

```text
http://127.0.0.1:5173/
```

If port `5173` is busy, Vite may provide another local URL. Use the URL shown in your terminal.

### Build For Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Reviewer Test Flow

Use this flow to understand the prototype quickly:

1. Open the live app.
2. Complete the guided product tour.
3. Go to **Reaction Studio** and adjust the reaction constraints.
4. Open **Candidate Atlas** and inspect a candidate.
5. Use search/filter to find a catalyst candidate.
6. Click **Send to feedback**.
7. Log an experimental outcome in **Experiment Feedback**.
8. Open **Learning Loop** and trigger retraining.
9. Open **Bio Pathways** and inspect a microbial pathway bottleneck.
10. Reopen **Product Guide** if you want the workflow summary.

---

## Current Prototype Scope

Implemented:

- Multi-tab product UI
- Guided onboarding tour
- Responsive desktop and mobile layouts
- Reaction configuration workflow
- Candidate ranking and filtering
- Three.js molecular visualization
- Synthetic biology pathway map
- Experiment feedback form
- Prediction drift signal
- Retraining readiness simulation
- Product guide

Not implemented yet:

- Real database integrations
- Real ML inference backend
- User authentication
- Lab instrument ingestion
- Model retraining jobs
- Multi-user collaboration
- Export to ELN/LIMS systems

---

## Roadmap

### Prototype Stage

- Product UI
- Guided workflow
- Simulated data
- Candidate ranking interactions
- Feedback loop simulation

### Pilot Stage

- FastAPI backend
- Persistent experiment records
- Lab data ingestion
- Knowledge graph schema
- Real retrieval pipelines
- Basic model scoring APIs

### Research Integration Stage

- Materials Project and BRENDA API connections
- Fair-Chem / Open Catalyst style catalyst datasets
- Literature extraction
- Protein and pathway model integration
- Experiment provenance scoring

### Production Stage

- Multi-user project workspaces
- Model retraining orchestration
- Role-based access control
- Audit trails
- LIMS/ELN integration
- Deployment into research and pilot-plant teams

---

## Submission Metadata

**Shortlisted idea:** Theme 4: AI Platform for Molecular Discovery in Chemical Catalysis and Synthetic Biology  
**Project title:** CATALYST-X: Self-Learning AI Discovery Engine for Sustainable Chemistry  
**Source repository:** [https://github.com/let-the-dreamers-rise/catalyst-x](https://github.com/let-the-dreamers-rise/catalyst-x)

---

## Reference Context

These public resources help contextualize the broader ecosystem:

- [Citrine Informatics](https://citrine.io/) - AI for materials and chemicals development
- [Kebotix](https://www.kebotix.com/) - AI and automation for materials discovery
- [IBM RXN for Chemistry](https://mediacenter.ibm.com/media/IBM%20RXN%20for%20Chemistry/1_lkr5xcmb/50134582) - AI reaction prediction service
- [Microsoft MatterGen](https://www.microsoft.com/en-us/research/blog/mattergen-a-new-paradigm-of-materials-design-with-generative-ai/) - generative AI for materials design
- [Google DeepMind GNoME](https://deepmind.google/discover/blog/millions-of-new-materials-discovered-with-deep-learning/) - graph-network discovery of stable materials
- [Materials Project](https://docs.materialsproject.org/) - open materials data and API
- [BRENDA Enzyme Database](https://www.brenda-enzymes.org/?lang=en) - enzyme data and biological pathway resources

---

## License And Usage

This repository is a prototype submission artifact. The sample data is synthetic and intended for product demonstration only.
