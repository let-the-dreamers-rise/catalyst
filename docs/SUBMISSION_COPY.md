# CATALYST-X Submission Copy

Use this file to copy and paste into the submission portal.

---

## Title

CATALYST-X: Self-Learning AI Discovery Engine for Sustainable Chemistry

---

## Description

CATALYST-X is a self-learning AI discovery platform for sustainable chemistry, focused on accelerating catalyst, enzyme, and microbial pathway discovery for fuel and chemical production.

The platform addresses a major bottleneck in catalysis and synthetic biology: discovery cycles are slow, molecular design spaces are huge, evidence is fragmented across databases and lab records, and failed experiments are rarely converted into structured learning data.

CATALYST-X turns discovery into a closed-loop workflow:

1. A researcher defines a target reaction, such as CO2 + H2 to methanol.
2. The system retrieves known catalysts, enzymes, reaction conditions, and pathway evidence from scientific sources.
3. AI models generate new catalyst, enzyme, and pathway candidates.
4. Predictive models rank each candidate by activity, selectivity, stability, yield, carbon efficiency, novelty, and synthesis risk.
5. Researchers inspect candidates through interactive molecular, pathway, and performance views.
6. Shortlisted candidates are sent to experimental testing.
7. Experimental outcomes are logged back into the system.
8. The platform compares predicted vs observed performance, identifies model blind spots, and improves future recommendations.

The key innovation is the feedback loop. CATALYST-X treats failed experiments as high-value learning data instead of discarded notes. When the model is wrong, the system captures the drift pattern and uses it to guide retraining and future experiment selection.

The prototype includes:

- Multi-tab product interface
- Guided first-load product tour
- Reaction input and evidence retrieval workflow
- Candidate ranking and filtering
- Three.js molecular visualization
- Synthetic biology pathway map
- Experiment feedback logging
- Prediction drift analysis
- Retraining readiness view
- Product guide and onboarding
- Responsive desktop and mobile layouts

Live deployment: https://catalyst-72rlxz3py-ashwin-goyals-projects.vercel.app

Source code: https://github.com/let-the-dreamers-rise/catalyst-x

Shortlisted idea: Theme 4: AI Platform for Molecular Discovery in Chemical Catalysis and Synthetic Biology

---

## Source Code

Upload the generated source zip:

`C:\Users\ASHWIN GOYAL\OneDrive\Desktop\catalyst-x\submission\catalyst-x-source.zip`

If the portal accepts links, also include:

https://github.com/let-the-dreamers-rise/catalyst-x

---

## Instructions To Run

Prerequisites:

- Node.js 18 or newer
- npm

Steps:

1. Download and unzip the source code.
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

4. Start the local development server:

```bash
npm run dev
```

5. Open the URL shown in the terminal. Usually:

```text
http://127.0.0.1:5173/
```

6. To create a production build:

```bash
npm run build
```

7. To preview the production build:

```bash
npm run preview
```

Reviewer flow:

1. Open the app.
2. Complete the guided product tour.
3. Visit Reaction Studio and adjust reaction constraints.
4. Open Candidate Atlas, filter candidates, and inspect a molecular preview.
5. Send a candidate to Experiment Feedback.
6. Submit an observed result.
7. Open Learning Loop and trigger retraining.
8. Open Bio Pathways to inspect synthetic biology routing.
9. Open Product Guide for the workflow summary.

---

## Custom Attachment

Recommended custom attachment:

`docs/PITCH_DECK_OUTLINE.md`

Optional additional attachment:

`docs/DEMO_VIDEO_GUIDE.md`

These files contain the complete presentation structure, competitor positioning, differentiation narrative, and demo video script.

---

## Which Shortlisted Idea Are You Submitting This Prototype For?

Theme 4: AI Platform for Molecular Discovery in Chemical Catalysis and Synthetic Biology
