import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

const tourSteps = [
  {
    tab: "overview",
    title: "Orient the discovery program",
    matters:
      "This view keeps the active research objective, confidence signals, and model learning health in one place.",
    action:
      "Switch the target transformation, scan the closed-loop status, and open the most important workflow from the command rail.",
    signal:
      "Notice how validated outcomes and blind spots are visible beside the candidate pipeline, so the platform is learning from both wins and misses.",
  },
  {
    tab: "reaction",
    title: "Define the chemistry target",
    matters:
      "Good candidate generation starts with a precise reaction definition and operating envelope.",
    action:
      "Tune temperature, pressure, stability, and sourcing constraints, then run retrieval to assemble the evidence base.",
    signal:
      "The key signal is provenance: every retrieved precedent carries a source, condition, and confidence score before generation begins.",
  },
  {
    tab: "atlas",
    title: "Compare generated candidates",
    matters:
      "The atlas connects retrieved evidence with novel catalyst, enzyme, and pathway designs that can be ranked for lab work.",
    action:
      "Filter candidates, inspect the molecular preview, compare predicted performance, and shortlist designs for experimental testing.",
    signal:
      "Watch the balance between discovery score, synthesis risk, and uncertainty rather than chasing a single top-line metric.",
  },
  {
    tab: "bio",
    title: "Inspect synthetic biology routes",
    matters:
      "Sustainable chemistry often needs enzyme and microbial pathway options, not only inorganic catalysts.",
    action:
      "Select a strain program, trace the pathway map, and review interventions for enzyme mutations, strain control, and flux changes.",
    signal:
      "The bottleneck marker shows where a biological route is constrained before the platform proposes the next wet-lab move.",
  },
  {
    tab: "feedback",
    title: "Close the experimental loop",
    matters:
      "Real outcomes are the learning fuel. Failed and surprising experiments are handled as structured data, not discarded notes.",
    action:
      "Log observed yield, selectivity, stability, and notes for a shortlisted candidate, then submit the record to the learning queue.",
    signal:
      "The important signal is prediction drift: large gaps between predicted and observed results become targeted retraining examples.",
  },
  {
    tab: "learning",
    title: "Track self-improvement",
    matters:
      "The platform improves by separating failure patterns by chemistry family, data quality, and model blind spot.",
    action:
      "Review drift areas, inspect hypotheses, and trigger a retraining cycle when the evidence coverage is strong enough.",
    signal:
      "Retraining readiness combines validated outcomes, negative examples, and provenance quality so the next model update is accountable.",
  },
  {
    tab: "guide",
    title: "Use the operating guide",
    matters:
      "A discovery system has to be understandable by researchers, data scientists, and lab operators working together.",
    action:
      "Use this guide to reopen onboarding, review workflow expectations, and align team roles around experiment feedback.",
    signal:
      "The key workflow is repeatable: target, retrieve, generate, predict, test, learn, then refine the search space.",
  },
];

export default function ProductTour({ isOpen, onClose, setActiveTab }) {
  const [stepIndex, setStepIndex] = useTourIndex(isOpen);
  const step = tourSteps[stepIndex];

  useEffect(() => {
    if (isOpen) setActiveTab(step.tab);
  }, [isOpen, setActiveTab, step.tab]);

  if (!isOpen) return null;

  const isLast = stepIndex === tourSteps.length - 1;

  return (
    <div className="tour-backdrop" role="dialog" aria-modal="true" aria-labelledby="tour-title">
      <div className="tour-panel">
        <button className="icon-button tour-close" type="button" onClick={onClose} title="Close tour">
          <X size={18} />
        </button>
        <div className="tour-progress" aria-label="Product tour progress">
          {tourSteps.map((item, index) => (
            <span
              key={item.tab}
              className={index <= stepIndex ? "is-active" : ""}
              aria-label={`Step ${index + 1}`}
            />
          ))}
        </div>
        <p className="tour-kicker">Product tour</p>
        <h2 id="tour-title">{step.title}</h2>
        <div className="tour-copy">
          <section>
            <span>Why it matters</span>
            <p>{step.matters}</p>
          </section>
          <section>
            <span>What you can do</span>
            <p>{step.action}</p>
          </section>
          <section>
            <span>Signal to notice</span>
            <p>{step.signal}</p>
          </section>
        </div>
        <div className="tour-actions">
          <button
            className="button ghost"
            type="button"
            onClick={() => setStepIndex((current) => Math.max(current - 1, 0))}
            disabled={stepIndex === 0}
          >
            <ChevronLeft size={17} />
            Back
          </button>
          <button
            className="button primary"
            type="button"
            onClick={isLast ? onClose : () => setStepIndex((current) => current + 1)}
          >
            {isLast ? (
              <>
                <Check size={17} />
                Finish
              </>
            ) : (
              <>
                Next
                <ChevronRight size={17} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function useTourIndex(isOpen) {
  const state = useState(0);

  useEffect(() => {
    if (isOpen) state[1](0);
  }, [isOpen]);

  return state;
}
