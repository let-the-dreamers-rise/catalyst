# CATALYST-X 5-Minute Demo Video Guide

Use this as the exact storyboard and voiceover script for the final submission video.

Recommended length: **5 minutes**  
Recording format: desktop screen recording with voiceover  
Tone: clear, calm, confident, and judge-friendly  
Main objective: make the viewer understand the problem, the product workflow, and the differentiation without needing extra explanation.

---

## One-Sentence Message

CATALYST-X is a self-learning AI discovery platform that helps researchers discover sustainable catalysts, enzymes, and microbial pathways, then improves future recommendations by learning from real experimental outcomes.

Repeat this idea in simple words at the beginning and end of the video.

---

## What Judges Must Understand By The End

1. **The problem:** catalyst and enzyme discovery is slow, fragmented, and loses learning from failed experiments.
2. **The workflow:** target reaction -> retrieve evidence -> generate candidates -> predict performance -> test in lab -> log outcomes -> learn.
3. **The product:** this is a multi-tab research operating system, not a static landing page.
4. **The differentiator:** CATALYST-X learns from prediction-vs-experiment gaps, especially failed experiments.
5. **The scope:** the prototype is frontend-complete with simulated scientific data, ready to connect to real databases and ML services next.

---

## Recording Setup

Before recording:

1. Open the live app:

```text
https://catalyst-72rlxz3py-ashwin-goyals-projects.vercel.app
```

2. Use desktop mode, not mobile.
3. Set browser zoom to 100%.
4. Record in 16:9 if possible.
5. Close unnecessary tabs and notifications.
6. Move the cursor slowly. Pause one second after every click.
7. Do not show terminal windows, `.env.local`, Vercel settings, GitHub tokens, or private files.
8. If the product tour already completed, reopen it using the **Product tour** button.

---

## 5-Minute Demo Timeline

| Time | Screen | Purpose |
| --- | --- | --- |
| 0:00 - 0:30 | Overview | Explain the problem and product in plain language |
| 0:30 - 1:00 | Product Tour | Show that the app has guided onboarding |
| 1:00 - 1:45 | Reaction Studio | Show target reaction definition and evidence retrieval |
| 1:45 - 2:35 | Candidate Atlas | Show candidate ranking, molecular view, and model rationale |
| 2:35 - 3:20 | Experiment Feedback | Show predicted vs observed outcome logging |
| 3:20 - 4:00 | Learning Loop | Show how the system improves from drift and failures |
| 4:00 - 4:30 | Bio Pathways | Show synthetic biology support |
| 4:30 - 5:00 | Product Guide / Overview | Explain differentiation, competitors, and close |

---

# Full 5-Minute Script

## 0:00 - 0:30: Opening And Problem

**Screen:** Overview tab

**Action:**

- Start on the Overview screen.
- Keep the cursor still for the first few seconds.
- Point briefly to the active target reaction and the closed-loop state cards.

**Voiceover:**

"This is CATALYST-X, a self-learning AI discovery engine for sustainable chemistry. The goal is to help researchers discover better catalysts, enzymes, and microbial pathways for fuel and chemical production.

The problem today is that discovery is slow. Researchers test many candidates, evidence is scattered across papers and databases, and failed experiments often stay as notes instead of becoming useful training data.

CATALYST-X solves this by turning discovery into a closed loop. The system proposes candidates, researchers test them, and the platform learns from the difference between prediction and real experimental results."

**Judge clarity line:**

"The key idea is simple: every experiment should make the next recommendation smarter."

---

## 0:30 - 1:00: Guided Product Tour

**Screen:** Product tour overlay

**Action:**

- Click **Product tour**.
- Show the first tour step.
- Click **Next** two times slowly.
- Let judges see that the active tab changes automatically.

**Voiceover:**

"The prototype includes guided onboarding so a new researcher can understand the workflow quickly. Each tour step explains why that part of the product matters, what the user can do there, and what signal to notice.

This is important because CATALYST-X is not a single dashboard. It is a workflow system for moving from a research question to candidate selection, lab testing, and model improvement."

**Do not spend too long here.** The tour is proof of product polish, not the main demo.

---

## 1:00 - 1:45: Reaction Studio

**Screen:** Reaction Studio

**Action:**

- Click or let the tour navigate to **Reaction Studio**.
- Select the CO2 hydrogenation to methanol reaction if not already selected.
- Adjust one slider, such as temperature or stability target.
- Click **Run retrieval**.
- Hover or point at the retrieved precedents table.

**Voiceover:**

"The workflow starts in Reaction Studio. Here the researcher defines the target reaction. In this example, the goal is CO2 hydrogenation to methanol, which is important for carbon utilization and sustainable chemical production.

The user can set operating constraints like temperature, pressure, stability, and critical-metal exposure. These constraints shape the search because a catalyst is only useful if it performs under realistic process conditions.

Before generating new candidates, CATALYST-X retrieves prior evidence: known catalysts, reaction conditions, source confidence, and performance signals. This matters because the AI should not generate in isolation. It should build on scientific evidence."

**Judge clarity line:**

"This tab answers: what are we trying to discover, under what constraints, and what is already known?"

---

## 1:45 - 2:35: Candidate Atlas

**Screen:** Candidate Atlas

**Action:**

- Open **Candidate Atlas**.
- Search for `In2O3` or select a visible top candidate.
- Point to:
  - Candidate score
  - Molecular viewer
  - Radar chart
  - Model rationale
  - Next experiment
- Click **Shortlist** or **Send to feedback**.

**Voiceover:**

"After evidence retrieval and generation, the Candidate Atlas ranks possible catalysts or biological routes. Each candidate is evaluated on multiple signals: activity, selectivity, stability, yield, carbon efficiency, novelty, and synthesis risk.

The molecular preview helps the researcher inspect the candidate visually. The radar chart gives a fast comparison across performance dimensions. The model rationale explains why the system ranked this candidate and what experiment should be run next.

This is important because researchers should not trust a black-box score alone. They need tradeoffs, uncertainty, provenance, and a clear next experimental action."

**Judge clarity line:**

"This tab answers: which candidates should the lab test first, and why?"

---

## 2:35 - 3:20: Experiment Feedback

**Screen:** Experiment Feedback

**Action:**

- If not already there, click **Send to feedback** from the Candidate Atlas.
- Adjust observed yield so it differs from predicted yield.
- Adjust selectivity or stability slightly.
- Keep the lab note visible.
- Click **Submit to learning queue**.
- Pause on the success message.

**Voiceover:**

"This is the most important part of the product: the feedback loop. After a candidate is tested in the lab, the researcher logs the observed yield, selectivity, stability, and notes.

CATALYST-X compares the predicted result against the real experimental result. If the gap is large, the platform flags model drift. That means the model was surprised, and the result should be used to improve future predictions.

In many research workflows, failed experiments are underused. CATALYST-X treats them as high-value learning data because failures reveal where the model is blind."

**Judge clarity line:**

"This tab answers: what happened in the lab, and what did the model learn from being wrong?"

---

## 3:20 - 4:00: Learning Loop

**Screen:** Learning Loop

**Action:**

- Open **Learning Loop**.
- Point to retraining readiness.
- Point to blind spot map.
- Click **Start retraining cycle**.
- Wait until it shows retrained.

**Voiceover:**

"The Learning Loop shows how the platform improves over time. It tracks retraining readiness, prediction error, drift records, data quality, and model blind spots.

Instead of retraining blindly, the system separates failure patterns by domain. For example, one blind spot may be water co-feed sensitivity in CO2 hydrogenation, while another may be coke formation in ethanol upgrading.

This makes the system more accountable. It does not just say the model improved. It shows what kind of evidence caused the improvement and where the next model update should focus."

**Judge clarity line:**

"This tab answers: where is the model weak, and is the feedback good enough to improve it?"

---

## 4:00 - 4:30: Synthetic Biology Module

**Screen:** Bio Pathways

**Action:**

- Open **Bio Pathways**.
- Click one pathway node.
- Point to bottleneck and recommended interventions.

**Voiceover:**

"CATALYST-X also includes a synthetic biology module. This is important because sustainable production does not rely only on inorganic catalysts. It can also require enzymes, microbial strains, and pathway optimization.

Here the platform shows a strain recommendation, pathway bottlenecks, predicted titer and yield, and suggested interventions such as enzyme mutations or flux changes."

**Judge clarity line:**

"This tab answers: can biology provide a better route, and where is the pathway bottleneck?"

---

## 4:30 - 5:00: Differentiation And Closing

**Screen:** Product Guide or Overview

**Action:**

- Open **Product Guide** or return to **Overview**.
- Keep the screen stable while speaking.

**Voiceover:**

"There are already strong tools in AI chemistry and materials discovery. Some focus on databases, some on reaction prediction, some on materials generation, and some on lab automation.

CATALYST-X is different because it combines the full workflow in one product: reaction definition, evidence retrieval, candidate generation, prediction, molecular and pathway views, lab feedback, drift analysis, and retraining readiness.

The differentiator is not just predicting molecules. The differentiator is learning from real experiments so the platform becomes better at discovery over time.

That is CATALYST-X: a self-learning discovery engine for sustainable chemistry."

**Final line:**

"Every experiment becomes a better next experiment."

---

# What To Click During Recording

Use this click sequence:

1. Overview starts visible.
2. Click **Product tour**.
3. Click **Next** twice.
4. Click **Finish** or close the tour.
5. Click **Reaction Studio**.
6. Move one slider.
7. Click **Run retrieval**.
8. Click **Candidate Atlas**.
9. Search `In2O3`.
10. Select **In2O3-ZrO2 hollow nanorods**.
11. Click **Send to feedback**.
12. Change observed yield.
13. Click **Submit to learning queue**.
14. Click **Learning Loop**.
15. Click **Start retraining cycle**.
16. Click **Bio Pathways**.
17. Click one pathway node.
18. Click **Product Guide** or **Overview** for closing.

---

# Clear Judge-Friendly Explanation

If you need to explain the app in one breath:

"CATALYST-X helps researchers choose better experiments for sustainable chemistry. A user defines a target reaction, the system retrieves prior evidence, generates candidate catalysts or biological routes, predicts performance, and ranks the best options. After lab testing, the researcher logs real outcomes. The platform compares predicted vs observed results, identifies model blind spots, and uses that feedback to improve future discovery cycles."

---

# Competitive Differentiation To Mention In Video

Use this short version:

"Other AI chemistry tools often focus on one part of the workflow: databases, reaction prediction, generative models, or lab automation. CATALYST-X is positioned as the product operating system that connects all parts of the loop for sustainable catalysis and synthetic biology. Its key differentiator is learning from experimental outcomes, especially failed experiments."

Do not over-explain every competitor in the demo video. Save detailed competitor analysis for the pitch deck.

---

# Common Mistakes To Avoid

Avoid:

- Jumping between tabs without explaining why.
- Spending more than 15 seconds on the product tour.
- Reading every metric on screen.
- Saying the current prototype has live ML models or real database integrations.
- Calling it only a UI mockup.
- Overusing technical words without translating them.
- Ending without repeating the feedback-loop differentiator.

Better wording:

- Say "frontend-complete prototype with realistic simulated scientific data."
- Say "designed to connect to real databases and ML models next."
- Say "the product workflow is the innovation we are validating."

---

# Recording Checklist

Before exporting the video, confirm:

- Length is close to 5 minutes.
- The first 30 seconds explain the problem clearly.
- The Candidate Atlas and Feedback Loop are both shown.
- The video shows at least one real action changing state.
- The closing explains differentiation.
- No private files, environment variables, tokens, or terminal secrets are visible.
- Audio is clear and not rushed.

---

# Emergency 90-Second Backup Script

Use only if the portal unexpectedly limits video length.

"CATALYST-X is a self-learning AI discovery engine for sustainable chemistry. It helps researchers discover catalysts, enzymes, and microbial pathways for transformations like CO2-to-methanol and biomass-to-fuels.

The problem is that discovery is slow, evidence is fragmented, and failed experiments are often not reused effectively.

In the app, the researcher starts by defining a target reaction in Reaction Studio. The system retrieves prior evidence, then the Candidate Atlas ranks generated candidates by activity, selectivity, stability, yield, carbon efficiency, and risk.

The key workflow is Experiment Feedback. After lab testing, researchers log observed outcomes. CATALYST-X compares predicted and observed results, flags model drift, and sends that evidence into the Learning Loop.

The differentiator is that CATALYST-X is not just a prediction dashboard. It is a closed-loop discovery operating system that learns from every experiment, including failures, so future recommendations become smarter."
