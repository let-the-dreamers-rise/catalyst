import {
  Activity,
  ArrowRight,
  Beaker,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Download,
  Dna,
  FlaskConical,
  Filter,
  FlaskRound,
  GitBranch,
  Layers3,
  Microscope,
  Play,
  Plus,
  RefreshCcw,
  Save,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Target,
  UploadCloud,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { guideSections, knowledgeSignals, modelSignals, pathwayPrograms, retrievalRows } from "../data/catalystData";
import { ComparisonBars, DriftMatrix, ProgressBar, RadarChart } from "./Charts.jsx";
import MoleculeCanvas from "./MoleculeCanvas.jsx";

export function Overview({
  activeReaction,
  candidates,
  records,
  shortlisted,
  setActiveTab,
  setSelectedCandidateId,
}) {
  const topCandidate = candidates[0];
  const driftRecords = records.filter((record) => Math.abs(record.predictedYield - record.observedYield) >= 10);
  const averageScore = Math.round(
    candidates.reduce((total, candidate) => total + candidate.discoveryScore, 0) / Math.max(candidates.length, 1),
  );

  return (
    <div className="view-grid overview-grid">
      <section className="command-surface overview-hero">
        <div className="hero-copy">
          <span className="system-label">CATALYST-X Discovery OS</span>
          <h1>{activeReaction.name}</h1>
          <p>{activeReaction.objective}</p>
          <div className="hero-actions">
            <button className="button primary" type="button" onClick={() => setActiveTab("reaction")}>
              <FlaskConical size={17} />
              Configure reaction
            </button>
            <button
              className="button ghost"
              type="button"
              onClick={() => {
                setSelectedCandidateId(topCandidate?.id);
                setActiveTab("atlas");
              }}
            >
              <Sparkles size={17} />
              Open candidate atlas
            </button>
          </div>
        </div>
        <div className="reaction-orbit" aria-label="Active reaction performance target">
          <div className="orbit-core">
            <strong>{activeReaction.product}</strong>
            <span>{activeReaction.equation}</span>
          </div>
          <div className="orbit-ring ring-a" />
          <div className="orbit-ring ring-b" />
          <div className="orbit-node node-a">Yield {activeReaction.targetYield}%</div>
          <div className="orbit-node node-b">Sel. {activeReaction.targetSelectivity}%</div>
          <div className="orbit-node node-c">{activeReaction.stage}</div>
        </div>
      </section>

      <section className="panel metric-panel">
        <div className="section-heading">
          <span>Closed-loop state</span>
          <h2>Learning signal</h2>
        </div>
        <div className="signal-grid">
          {knowledgeSignals.map((signal) => (
            <div key={signal.label} className={`signal-block tone-${signal.tone}`}>
              <span>{signal.label}</span>
              <strong>{signal.value}</strong>
              <small>{signal.detail}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="panel product-pipeline">
        <div className="section-heading row-heading">
          <div>
            <span>Discovery pipeline</span>
            <h2>From target to retraining</h2>
          </div>
          <button className="icon-button" type="button" onClick={() => setActiveTab("learning")} title="Open learning loop">
            <BrainCircuit size={18} />
          </button>
        </div>
        <div className="pipeline-lanes">
          {[
            ["Target", activeReaction.stage, "reaction"],
            ["Retrieve", `${activeReaction.sources.length} source groups`, "reaction"],
            ["Generate", `${candidates.length} ranked candidates`, "atlas"],
            ["Test", `${shortlisted.length} queued`, "feedback"],
            ["Learn", `${driftRecords.length} drift flags`, "learning"],
          ].map(([label, value, tab]) => (
            <button className="pipeline-step" key={label} type="button" onClick={() => setActiveTab(tab)}>
              <span>{label}</span>
              <strong>{value}</strong>
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
      </section>

      <section className="panel top-candidate-panel">
        <div className="section-heading row-heading">
          <div>
            <span>Next best experiment</span>
            <h2>{topCandidate?.name}</h2>
          </div>
          <strong className="score-chip">{averageScore}</strong>
        </div>
        {topCandidate ? (
          <>
            <p className="quiet-copy">{topCandidate.summary}</p>
            <div className="split-metrics">
              <ProgressBar label="Activity" value={topCandidate.predicted.activity} tone="mint" />
              <ProgressBar label="Selectivity" value={topCandidate.predicted.selectivity} tone="cyan" />
              <ProgressBar label="Stability" value={topCandidate.predicted.stability} tone="amber" />
            </div>
            <button
              className="button secondary wide"
              type="button"
              onClick={() => {
                setSelectedCandidateId(topCandidate.id);
                setActiveTab("atlas");
              }}
            >
              <Target size={17} />
              Inspect recommendation
            </button>
          </>
        ) : null}
      </section>

      <section className="panel stream-panel">
        <div className="section-heading">
          <span>Research stream</span>
          <h2>Recent system events</h2>
        </div>
        <div className="event-stream">
          {[
            ["Retrieval", "14 new CO2 hydrogenation records normalized with reaction conditions."],
            ["Generation", "Surface motif generator produced 23 Cu-Zr vacancy variants."],
            ["Feedback", "Model drift detected on coke formation in ethanol upgrading run EXP-2411."],
            ["Learning", "Negative enzyme stability results increased impurity penalty weight."],
          ].map(([label, body]) => (
            <div className="event-row" key={body}>
              <span>{label}</span>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ReactionStudio({ activeReaction, candidates, onOpenAtlas }) {
  const [temperature, setTemperature] = useState(activeReaction.constraints.temperature);
  const [pressure, setPressure] = useState(activeReaction.constraints.pressure);
  const [stability, setStability] = useState(activeReaction.constraints.stabilityHours);
  const [criticalMetal, setCriticalMetal] = useState(activeReaction.constraints.maxCriticalMetal);
  const [runCount, setRunCount] = useState(1);

  useEffect(() => {
    setTemperature(activeReaction.constraints.temperature);
    setPressure(activeReaction.constraints.pressure);
    setStability(activeReaction.constraints.stabilityHours);
    setCriticalMetal(activeReaction.constraints.maxCriticalMetal);
  }, [activeReaction]);

  const rows = retrievalRows.filter((row) => row.reactionId === activeReaction.id);
  const retrievalDepth = Math.min(98, 62 + rows.length * 8 + runCount * 3);

  return (
    <div className="view-grid reaction-grid">
      <section className="panel reaction-editor">
        <div className="section-heading">
          <span>Target definition</span>
          <h2>{activeReaction.equation}</h2>
        </div>
        <p className="quiet-copy">{activeReaction.objective}</p>

        <div className="constraint-stack">
          <RangeControl
            label="Temperature"
            value={temperature}
            min={120}
            max={420}
            unit="deg C"
            onChange={setTemperature}
          />
          <RangeControl label="Pressure" value={pressure} min={1} max={80} unit="bar" onChange={setPressure} />
          <RangeControl
            label="Stability target"
            value={stability}
            min={24}
            max={240}
            unit="h"
            onChange={setStability}
          />
        </div>

        <div className="segmented-control" aria-label="Critical metal constraint">
          {["Low", "Medium", "Open"].map((level) => (
            <button
              key={level}
              className={criticalMetal === level ? "is-selected" : ""}
              type="button"
              onClick={() => setCriticalMetal(level)}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="action-row">
          <button className="button primary" type="button" onClick={() => setRunCount((count) => count + 1)}>
            <RefreshCcw size={17} />
            Run retrieval
          </button>
          <button className="button ghost" type="button" onClick={onOpenAtlas}>
            <Sparkles size={17} />
            Rank candidates
          </button>
        </div>
      </section>

      <section className="panel evidence-panel">
        <div className="section-heading row-heading">
          <div>
            <span>Evidence assembly</span>
            <h2>Retrieved precedents</h2>
          </div>
          <strong className="score-chip">{retrievalDepth}%</strong>
        </div>
        <div className="source-stack">
          {activeReaction.sources.map((source) => (
            <div className="source-pill" key={source}>
              <Database size={15} />
              {source}
            </div>
          ))}
        </div>
        <div className="retrieval-table" role="table" aria-label="Retrieved reaction precedents">
          <div className="table-row table-head" role="row">
            <span>Material</span>
            <span>Condition</span>
            <span>Confidence</span>
          </div>
          {rows.map((row) => (
            <div className="table-row" role="row" key={row.id}>
              <span>
                <strong>{row.material}</strong>
                <small>{row.source}</small>
              </span>
              <span>{row.condition}</span>
              <span>{row.confidence}%</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel synthesis-panel">
        <div className="section-heading">
          <span>Generation recipe</span>
          <h2>Candidate search plan</h2>
        </div>
        <div className="recipe-grid">
          {[
            ["Search space", `${candidates.length * 42} structure variants`],
            ["Constraint guardrail", `${criticalMetal} critical-metal exposure`],
            ["Simulation scope", "energy, stability, selectivity, yield"],
            ["Export target", "top 6 candidates with provenance pack"],
          ].map(([label, value]) => (
            <div className="recipe-row" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="mini-graph" aria-label="Retrieval and generation depth">
          {[42, retrievalDepth, 58 + runCount * 5, 76, 64].map((value, index) => (
            <span key={`${value}-${index}`} style={{ height: `${value}%` }} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function CandidateAtlas({
  activeReaction,
  candidates,
  selectedCandidate,
  selectedCandidateId,
  setSelectedCandidateId,
  shortlisted,
  onShortlist,
  onQueueCandidate,
  records,
}) {
  const [query, setQuery] = useState("");
  const [route, setRoute] = useState("All");
  const [sortBy, setSortBy] = useState("discoveryScore");

  const visibleCandidates = useMemo(() => {
    return candidates
      .filter((candidate) => {
        const matchesRoute = route === "All" || candidate.route === route || candidate.class === route;
        const text = `${candidate.name} ${candidate.class} ${candidate.summary}`.toLowerCase();
        return matchesRoute && text.includes(query.toLowerCase());
      })
      .sort((a, b) => b[sortBy] - a[sortBy]);
  }, [candidates, query, route, sortBy]);

  useEffect(() => {
    if (!visibleCandidates.some((candidate) => candidate.id === selectedCandidateId) && visibleCandidates[0]) {
      setSelectedCandidateId(visibleCandidates[0].id);
    }
  }, [selectedCandidateId, setSelectedCandidateId, visibleCandidates]);

  const active = selectedCandidate ?? visibleCandidates[0];

  return (
    <div className="view-grid atlas-grid">
      <section className="panel atlas-list">
        <div className="section-heading">
          <span>Candidate atlas</span>
          <h2>{activeReaction.name}</h2>
        </div>
        <div className="toolbar">
          <label className="search-box">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search candidates" />
          </label>
          <select value={route} onChange={(event) => setRoute(event.target.value)} aria-label="Filter candidate route">
            <option>All</option>
            <option>Catalysis</option>
            <option>Synthetic biology</option>
            <option>Heterogeneous catalyst</option>
            <option>Enzyme variant</option>
          </select>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort candidates">
            <option value="discoveryScore">Discovery score</option>
            <option value="novelty">Novelty</option>
            <option value="synthesisRisk">Synthesis risk</option>
          </select>
        </div>
        <div className="candidate-stack">
          {visibleCandidates.map((candidate) => (
            <button
              className={`candidate-row ${active?.id === candidate.id ? "is-selected" : ""}`}
              key={candidate.id}
              type="button"
              onClick={() => setSelectedCandidateId(candidate.id)}
            >
              <span>
                <strong>{candidate.name}</strong>
                <small>{candidate.class}</small>
              </span>
              <span className="candidate-score">{candidate.discoveryScore}</span>
            </button>
          ))}
        </div>
      </section>

      {active ? (
        <>
          <section className="panel molecular-panel">
            <MoleculeCanvas candidate={active} />
          </section>
          <section className="panel candidate-detail">
            <div className="section-heading row-heading">
              <div>
                <span>{active.id}</span>
                <h2>{active.name}</h2>
              </div>
              <strong className="score-chip">{active.discoveryScore}</strong>
            </div>
            <p className="quiet-copy">{active.summary}</p>
            <div className="candidate-meta">
              <span>
                <Filter size={14} />
                {active.conditions}
              </span>
              <span>
                <Database size={14} />
                {active.provenance}
              </span>
            </div>
            <RadarChart metrics={active.predicted} />
            <div className="action-row">
              <button className="button secondary" type="button" onClick={() => onShortlist(active.id)}>
                <Plus size={17} />
                {shortlisted.includes(active.id) ? "Queued" : "Shortlist"}
              </button>
              <button className="button primary" type="button" onClick={() => onQueueCandidate(active.id)}>
                <Send size={17} />
                Send to feedback
              </button>
            </div>
          </section>
          <section className="panel rationale-panel">
            <div className="section-heading">
              <span>Model rationale</span>
              <h2>Why this is ranked</h2>
            </div>
            <div className="rationale-list">
              {active.rationale.map((item) => (
                <div className="rationale-item" key={item}>
                  <CheckCircle2 size={17} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="experiment-callout">
              <span>Next experiment</span>
              <p>{active.nextExperiment}</p>
              <small>{active.uncertainty}</small>
            </div>
            <ComparisonBars candidate={active} records={records} />
          </section>
        </>
      ) : (
        <section className="panel empty-state">
          <Sparkles size={24} />
          <h2>No candidates match these filters</h2>
          <p>Adjust route or search filters to restore the atlas list.</p>
        </section>
      )}
    </div>
  );
}

export function BioPathways({ activeReaction }) {
  const programs = pathwayPrograms.filter((program) => program.reactionId === activeReaction.id);
  const [programId, setProgramId] = useState(programs[0]?.id);
  const [activeNodeId, setActiveNodeId] = useState(programs[0]?.nodes[1]?.id);
  const [activeIntervention, setActiveIntervention] = useState(0);

  useEffect(() => {
    const next = pathwayPrograms.find((program) => program.reactionId === activeReaction.id);
    setProgramId(next?.id);
    setActiveNodeId(next?.nodes[1]?.id);
    setActiveIntervention(0);
  }, [activeReaction.id]);

  const program = programs.find((item) => item.id === programId) ?? programs[0];
  const activeNode = program?.nodes.find((node) => node.id === activeNodeId);

  if (!program) {
    return (
      <section className="panel empty-state">
        <Dna size={24} />
        <h2>No pathway program configured</h2>
        <p>Select a supported reaction to inspect synthetic biology routes.</p>
      </section>
    );
  }

  return (
    <div className="view-grid bio-grid">
      <section className="panel pathway-map-panel">
        <div className="section-heading row-heading">
          <div>
            <span>Synthetic biology module</span>
            <h2>{program.pathway}</h2>
          </div>
          <select value={program.id} onChange={(event) => setProgramId(event.target.value)} aria-label="Select strain program">
            {programs.map((item) => (
              <option key={item.id} value={item.id}>
                {item.strain}
              </option>
            ))}
          </select>
        </div>
        <PathwayMap program={program} activeNodeId={activeNodeId} setActiveNodeId={setActiveNodeId} />
      </section>

      <section className="panel strain-panel">
        <div className="section-heading">
          <span>Strain recommendation</span>
          <h2>{program.organism}</h2>
        </div>
        <div className="strain-kpis">
          <div>
            <span>Titer</span>
            <strong>{program.predictedTiter} g/L</strong>
          </div>
          <div>
            <span>Yield</span>
            <strong>{program.predictedYield}%</strong>
          </div>
          <div>
            <span>Confidence</span>
            <strong>{program.confidence}%</strong>
          </div>
        </div>
        <div className="bottleneck-box">
          <span>Primary bottleneck</span>
          <p>{program.bottleneck}</p>
        </div>
        {activeNode ? (
          <div className="node-detail">
            <span>Selected pathway node</span>
            <strong>{activeNode.label}</strong>
            <small>Status: {activeNode.status}</small>
          </div>
        ) : null}
      </section>

      <section className="panel intervention-panel">
        <div className="section-heading">
          <span>Optimization plan</span>
          <h2>Recommended interventions</h2>
        </div>
        <div className="intervention-list">
          {program.interventions.map((item, index) => (
            <button
              key={item}
              type="button"
              className={`intervention-item ${activeIntervention === index ? "is-selected" : ""}`}
              onClick={() => setActiveIntervention(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </button>
          ))}
        </div>
        <div className="simulation-state">
          <Activity size={18} />
          <div>
            <span>Flux simulation focus</span>
            <strong>{program.interventions[activeIntervention]}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export function FeedbackLoop({
  candidates,
  shortlisted,
  records,
  onShortlist,
  onAddRecord,
  activeReaction,
}) {
  const queuedCandidates = candidates.filter((candidate) => shortlisted.includes(candidate.id));
  const defaultCandidate = queuedCandidates[0] ?? candidates[0];
  const [candidateId, setCandidateId] = useState(defaultCandidate?.id);
  const candidate = candidates.find((item) => item.id === candidateId) ?? defaultCandidate;
  const [observedYield, setObservedYield] = useState(candidate ? Math.max(candidate.predicted.yield - 4, 0) : 0);
  const [selectivity, setSelectivity] = useState(candidate ? candidate.predicted.selectivity - 3 : 0);
  const [stabilityHours, setStabilityHours] = useState(candidate ? 120 : 0);
  const [note, setNote] = useState("Observed stable activity after startup; no irreversible phase change detected.");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!candidate) return;
    setObservedYield(Math.max(candidate.predicted.yield - 4, 0));
    setSelectivity(Math.max(candidate.predicted.selectivity - 3, 0));
    setStabilityHours(Math.max(activeReaction.constraints.stabilityHours - 12, 24));
    setSubmitted(false);
  }, [candidate?.id, activeReaction.constraints.stabilityHours]);

  const discrepancy = candidate ? Math.abs(candidate.predicted.yield - observedYield) : 0;
  const status = discrepancy >= 12 ? "Model drift" : "Validated";

  const submitRecord = () => {
    if (!candidate) return;
    onAddRecord({
      id: `EXP-${Math.floor(2500 + records.length * 7)}`,
      candidateId: candidate.id,
      reactionId: candidate.reactionId,
      owner: "Sustainable Chemistry Lab",
      date: new Date().toISOString().slice(0, 10),
      predictedYield: candidate.predicted.yield,
      observedYield,
      selectivity,
      stabilityHours,
      status,
      note,
    });
    setSubmitted(true);
  };

  return (
    <div className="view-grid feedback-grid">
      <section className="panel feedback-form-panel">
        <div className="section-heading">
          <span>Experiment feedback</span>
          <h2>Log observed outcome</h2>
        </div>
        {candidate ? (
          <>
            <label className="field-block">
              <span>Candidate</span>
              <select value={candidate.id} onChange={(event) => setCandidateId(event.target.value)}>
                {candidates.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.id} - {item.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="feedback-target">
              <strong>{candidate.name}</strong>
              <span>{candidate.conditions}</span>
            </div>
            <RangeControl
              label="Observed yield"
              value={observedYield}
              min={0}
              max={100}
              unit="%"
              onChange={setObservedYield}
            />
            <RangeControl label="Selectivity" value={selectivity} min={0} max={100} unit="%" onChange={setSelectivity} />
            <RangeControl
              label="Stable runtime"
              value={stabilityHours}
              min={12}
              max={240}
              unit="h"
              onChange={setStabilityHours}
            />
            <label className="field-block">
              <span>Lab note</span>
              <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={4} />
            </label>
            <button className="button primary wide" type="button" onClick={submitRecord}>
              <UploadCloud size={17} />
              Submit to learning queue
            </button>
            {submitted ? (
              <div className="success-strip">
                <CheckCircle2 size={17} />
                Record saved. Outcome is now available for drift analysis and retraining.
              </div>
            ) : null}
          </>
        ) : (
          <p className="quiet-copy">Shortlist a candidate from the atlas to begin experiment feedback.</p>
        )}
      </section>

      <section className="panel feedback-delta-panel">
        <div className="section-heading">
          <span>Prediction delta</span>
          <h2>{status}</h2>
        </div>
        {candidate ? (
          <>
            <div className="delta-visual">
              <div>
                <span>Predicted</span>
                <strong>{candidate.predicted.yield}%</strong>
              </div>
              <ArrowRight size={22} />
              <div>
                <span>Observed</span>
                <strong>{observedYield}%</strong>
              </div>
            </div>
            <div className={`drift-alert ${status === "Model drift" ? "is-hot" : ""}`}>
              <BrainCircuit size={18} />
              <p>
                {status === "Model drift"
                  ? "This gap will be weighted as a high-value corrective example."
                  : "This outcome reinforces the current performance model."}
              </p>
            </div>
            <ComparisonBars candidate={candidate} records={records} />
          </>
        ) : null}
      </section>

      <section className="panel lab-queue-panel">
        <div className="section-heading row-heading">
          <div>
            <span>Lab queue</span>
            <h2>{queuedCandidates.length} shortlisted</h2>
          </div>
          <ClipboardCheck size={20} />
        </div>
        <div className="queue-stack">
          {(queuedCandidates.length ? queuedCandidates : candidates.slice(0, 3)).map((item) => (
            <div className="queue-row" key={item.id}>
              <span>
                <strong>{item.id}</strong>
                <small>{item.name}</small>
              </span>
              {shortlisted.includes(item.id) ? (
                <button className="icon-button" type="button" onClick={() => setCandidateId(item.id)} title="Select candidate">
                  <Microscope size={17} />
                </button>
              ) : (
                <button className="button tiny" type="button" onClick={() => onShortlist(item.id)}>
                  <Plus size={14} />
                  Add
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="panel records-panel">
        <div className="section-heading">
          <span>Validated records</span>
          <h2>Recent outcomes</h2>
        </div>
        <div className="record-list">
          {records
            .filter((record) => record.reactionId === activeReaction.id)
            .slice(0, 5)
            .map((record) => (
              <div className="record-row" key={record.id}>
                <span>
                  <strong>{record.id}</strong>
                  <small>{record.candidateId} - {record.owner}</small>
                </span>
                <span className={record.status === "Model drift" ? "status-hot" : "status-good"}>{record.status}</span>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export function LearningLoop({ records }) {
  const [trainingState, setTrainingState] = useState("Ready");
  const recordErrors = records.map((record) => Math.abs(record.predictedYield - record.observedYield));
  const meanError = Math.round(recordErrors.reduce((total, value) => total + value, 0) / Math.max(recordErrors.length, 1));
  const readiness = Math.min(98, 74 + records.length * 3);
  const driftCount = records.filter((record) => record.status === "Model drift").length;

  const startTraining = () => {
    setTrainingState("Training");
    window.setTimeout(() => setTrainingState("Retrained"), 1300);
  };

  return (
    <div className="view-grid learning-grid">
      <section className="panel learning-command">
        <div className="section-heading">
          <span>Self-improving engine</span>
          <h2>Retraining readiness</h2>
        </div>
        <div className="learning-meter">
          <div style={{ "--ready": readiness }}>
            <strong>{readiness}%</strong>
            <span>quality coverage</span>
          </div>
        </div>
        <div className="learning-kpis">
          <div>
            <span>Mean yield error</span>
            <strong>{meanError}%</strong>
          </div>
          <div>
            <span>Drift records</span>
            <strong>{driftCount}</strong>
          </div>
          <div>
            <span>Training state</span>
            <strong>{trainingState}</strong>
          </div>
        </div>
        <button className="button primary wide" type="button" onClick={startTraining}>
          <BrainCircuit size={17} />
          {trainingState === "Training" ? "Retraining..." : "Start retraining cycle"}
        </button>
      </section>

      <section className="panel blindspot-panel">
        <div className="section-heading">
          <span>Blind spot map</span>
          <h2>Prediction drift by domain</h2>
        </div>
        <DriftMatrix signals={modelSignals} />
      </section>

      <section className="panel hypotheses-panel">
        <div className="section-heading">
          <span>Generated hypotheses</span>
          <h2>What the platform learned</h2>
        </div>
        <div className="hypothesis-stack">
          {modelSignals.map((signal) => (
            <div className="hypothesis-row" key={signal.id}>
              <span>{signal.label}</span>
              <p>{signal.action}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel provenance-panel">
        <div className="section-heading">
          <span>Data quality</span>
          <h2>Feedback provenance</h2>
        </div>
        <div className="quality-list">
          {[
            ["Complete conditions", 92],
            ["Negative examples", 68],
            ["Replicate coverage", 74],
            ["Instrument trace links", 81],
          ].map(([label, value]) => (
            <ProgressBar key={label} label={label} value={value} tone={value > 80 ? "mint" : "amber"} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function ProductGuide({ onOpenTour, setActiveTab }) {
  return (
    <div className="view-grid guide-grid">
      <section className="panel guide-intro">
        <div className="section-heading">
          <span>Product guide</span>
          <h2>Operating CATALYST-X</h2>
        </div>
        <p className="quiet-copy">
          CATALYST-X is organized around a repeatable scientific loop: define the reaction, assemble evidence,
          generate and rank candidates, test them, then teach the system from measured outcomes.
        </p>
        <div className="action-row">
          <button className="button primary" type="button" onClick={onOpenTour}>
            <Play size={17} />
            Open product tour
          </button>
          <button className="button ghost" type="button" onClick={() => setActiveTab("reaction")}>
            <FlaskRound size={17} />
            Start at reaction studio
          </button>
        </div>
      </section>

      <section className="panel guide-workflow">
        <div className="workflow-rail">
          {[
            ["01", "Target", "Define transformation and success criteria."],
            ["02", "Retrieve", "Build an evidence base with provenance."],
            ["03", "Generate", "Explore catalysts, enzymes, and pathways."],
            ["04", "Predict", "Rank by performance, risk, and uncertainty."],
            ["05", "Test", "Export a short list to experimental workflows."],
            ["06", "Learn", "Convert real outcomes into model improvements."],
          ].map(([step, title, body]) => (
            <div className="workflow-guide-row" key={step}>
              <span>{step}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {guideSections.map((section, index) => (
        <section className="panel guide-card" key={section.title}>
          <div className="guide-index">{String(index + 1).padStart(2, "0")}</div>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </section>
      ))}

      <section className="panel role-panel">
        <div className="section-heading">
          <span>Collaboration model</span>
          <h2>Roles inside the loop</h2>
        </div>
        <div className="role-grid">
          {[
            ["Research lead", "Sets target reactions and accepts experiment plans."],
            ["Lab operator", "Logs outcomes, raw conditions, and quality notes."],
            ["Model scientist", "Reviews drift, blind spots, and retraining batches."],
            ["Process engineer", "Checks scale-up constraints before export."],
          ].map(([role, body]) => (
            <div className="role-row" key={role}>
              <strong>{role}</strong>
              <span>{body}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function RangeControl({ label, value, min, max, unit, onChange }) {
  return (
    <label className="range-control">
      <div>
        <span>{label}</span>
        <strong>
          {value}
          {unit ? ` ${unit}` : ""}
        </strong>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function PathwayMap({ program, activeNodeId, setActiveNodeId }) {
  const links = [
    ["n1", "n2"],
    ["n2", "n3"],
    ["n4", "n2"],
    ["n3", "n5"],
    ["n3", "n4"],
  ];
  const nodeMap = new Map(program.nodes.map((node) => [node.id, node]));

  return (
    <svg className="pathway-map" viewBox="0 0 100 80" role="img" aria-label={`${program.pathway} pathway map`}>
      <defs>
        <linearGradient id="pathway-line" x1="0" x2="1">
          <stop offset="0%" stopColor="#50f0b1" />
          <stop offset="100%" stopColor="#ffce73" />
        </linearGradient>
      </defs>
      {links.map(([from, to]) => {
        const start = nodeMap.get(from);
        const end = nodeMap.get(to);
        if (!start || !end) return null;
        return (
          <line
            key={`${from}-${to}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            className="pathway-link"
          />
        );
      })}
      {program.nodes.map((node) => (
        <g
          key={node.id}
          className={`pathway-node ${node.status} ${activeNodeId === node.id ? "is-active" : ""}`}
          onClick={() => setActiveNodeId(node.id)}
          role="button"
          tabIndex="0"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") setActiveNodeId(node.id);
          }}
        >
          <circle cx={node.x} cy={node.y} r={activeNodeId === node.id ? 5.8 : 4.6} />
          <text x={node.x} y={node.y + 10}>
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
