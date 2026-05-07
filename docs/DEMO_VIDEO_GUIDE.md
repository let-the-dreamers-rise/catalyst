# CATALYST-X Demo Video Guide

Recommended length: 3 to 4 minutes  
Recording format: screen recording with voiceover  
Tone: confident, product-focused, clear, not overly technical

---

## Demo Goal

Show that CATALYST-X is a real product prototype for closed-loop AI discovery in sustainable chemistry.

The viewer should understand:

1. What problem the product solves
2. How the workflow moves from reaction target to candidate selection
3. How experimental feedback improves the system
4. Why the product is different from a static prediction tool

---

## Recording Setup

Before recording:

1. Open the live app:

```text
https://catalyst-72rlxz3py-ashwin-goyals-projects.vercel.app
```

2. Use a desktop browser.
3. Set zoom to 100%.
4. Use a 16:9 recording area if possible.
5. Keep the cursor movement slow and intentional.
6. If the product tour already completed, open it from the **Product tour** button.

---

## 3-Minute Demo Script

### 0:00 - 0:20: Opening

**Screen:** Overview tab  
**Voiceover:**

"This is CATALYST-X, a self-learning AI discovery engine for sustainable chemistry. The platform helps researchers discover and optimize catalysts, enzymes, and microbial pathways for transformations like CO2-to-methanol, ethanol upgrading, and biomass-to-fuels."

**Action:** Show the overview screen and active reaction selector.

---

### 0:20 - 0:45: Problem

**Screen:** Overview, closed-loop state, pipeline  
**Voiceover:**

"The core problem is that discovery cycles are slow, evidence is fragmented, and failed experiments are often not reused effectively. CATALYST-X turns discovery into a closed loop where every experiment becomes structured learning data."

**Action:** Point to the pipeline and learning signal cards.

---

### 0:45 - 1:10: Product Tour

**Screen:** Product tour overlay  
**Voiceover:**

"The product includes guided onboarding. Each step explains why a view matters, what the researcher can do, and what signal to notice."

**Action:** Click `Product tour`, then click `Next` once or twice to show that the tour automatically changes tabs.

---

### 1:10 - 1:40: Reaction Studio

**Screen:** Reaction Studio  
**Voiceover:**

"In Reaction Studio, the researcher defines the target transformation and operating constraints. Here, the target is CO2 hydrogenation to methanol. The system retrieves prior catalyst evidence, reaction conditions, and confidence signals before generating new candidates."

**Action:** Adjust a slider, click `Run retrieval`, and show retrieved precedents.

---

### 1:40 - 2:15: Candidate Atlas

**Screen:** Candidate Atlas  
**Voiceover:**

"The Candidate Atlas ranks generated designs by discovery score, activity, selectivity, stability, yield, carbon efficiency, novelty, and synthesis risk. Researchers can inspect the molecular preview, model rationale, and the next recommended experiment."

**Action:** Search for `In2O3`, select the candidate, show molecular viewer and radar chart.

---

### 2:15 - 2:45: Experiment Feedback

**Screen:** Experiment Feedback  
**Voiceover:**

"The most important workflow is feedback. After a candidate is tested, the researcher logs observed yield, selectivity, stability, and lab notes. CATALYST-X compares predicted and observed performance and flags model drift."

**Action:** Click `Send to feedback`, adjust observed yield, click `Submit to learning queue`.

---

### 2:45 - 3:15: Learning Loop

**Screen:** Learning Loop  
**Voiceover:**

"The Learning Loop shows how the platform improves. It identifies blind spots, separates drift by chemistry family, evaluates data quality, and triggers retraining when enough validated evidence is available."

**Action:** Open Learning Loop and click `Start retraining cycle`.

---

### 3:15 - 3:40: Synthetic Biology

**Screen:** Bio Pathways  
**Voiceover:**

"CATALYST-X also supports synthetic biology. The Bio Pathways module shows enzyme and strain recommendations, pathway bottlenecks, flux signals, and suggested interventions."

**Action:** Open Bio Pathways and click a pathway node.

---

### 3:40 - 4:00: Closing

**Screen:** Overview or Product Guide  
**Voiceover:**

"CATALYST-X is not just a tool that predicts candidates. It is a discovery operating system that learns how to discover better catalysts and biological systems over time."

**Action:** End on Overview or Product Guide.

---

## Short 60-Second Version

Use this if the portal has a strict video limit.

**0:00 - 0:10**  
"CATALYST-X is a self-learning AI discovery engine for sustainable chemistry."

**0:10 - 0:20**  
"Researchers define a target reaction, retrieve evidence, and generate candidate catalysts, enzymes, or pathways."

**0:20 - 0:35**  
"The Candidate Atlas ranks designs by predicted activity, selectivity, stability, yield, and risk."

**0:35 - 0:50**  
"After lab testing, researchers log observed outcomes. The platform compares prediction vs reality and flags model drift."

**0:50 - 1:00**  
"The differentiator is the closed loop: CATALYST-X learns from every experiment, including failures."

---

## Recording Checklist

Show these screens:

- Overview
- Product tour
- Reaction Studio
- Candidate Atlas
- Experiment Feedback
- Learning Loop
- Bio Pathways

Mention these differentiators:

- Closed-loop learning
- Failed experiments as learning data
- Sustainable catalysis and synthetic biology in one workflow
- Prediction drift and blind spot analysis
- Researcher-facing product OS

Avoid:

- Reading every card on screen
- Spending too long on sliders
- Saying it is only a mockup
- Overclaiming real ML backend in the current prototype
- Showing `.env.local`, terminal tokens, or private deployment settings
