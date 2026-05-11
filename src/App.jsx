import {
  Atom,
  BookOpen,
  BrainCircuit,
  CircleHelp,
  ClipboardCheck,
  Database,
  Dna,
  FlaskConical,
  Home,
  Menu,
  Microscope,
  Network,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ProductTour from "./components/ProductTour.jsx";
import {
  BioPathways,
  CandidateAtlas,
  FeedbackLoop,
  LearningLoop,
  Overview,
  ProductGuide,
  ReactionStudio,
} from "./components/Views.jsx";
import { candidates, initialExperimentRecords, navItems, reactions, retrievalRows } from "./data/catalystData.js";
import { applyPriorityPreset, buildDiscoveryState, createInitialCampaigns } from "./data/discoveryEngine.js";

const navIcons = {
  overview: Home,
  reaction: FlaskConical,
  atlas: Database,
  bio: Dna,
  feedback: ClipboardCheck,
  learning: BrainCircuit,
  guide: BookOpen,
};

function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedReactionId, setSelectedReactionId] = useState(reactions[0].id);
  const [selectedCandidateId, setSelectedCandidateId] = useState("CX-1047");
  const [shortlisted, setShortlisted] = useState(["CX-1047"]);
  const [records, setRecords] = useState(initialExperimentRecords);
  const [campaigns, setCampaigns] = useState(() => createInitialCampaigns(reactions));
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("catalystx-tour-complete") !== "true";
  });

  const activeReaction = reactions.find((reaction) => reaction.id === selectedReactionId) ?? reactions[0];
  const activeCampaign = campaigns[activeReaction.id] ?? createInitialCampaigns([activeReaction])[activeReaction.id];
  const baseReactionCandidates = useMemo(
    () => candidates.filter((candidate) => candidate.reactionId === activeReaction.id),
    [activeReaction.id],
  );
  const discovery = useMemo(
    () =>
      buildDiscoveryState({
        reaction: activeReaction,
        candidates: baseReactionCandidates,
        retrievalRows,
        records,
        campaign: activeCampaign,
      }),
    [activeReaction, activeCampaign, baseReactionCandidates, records],
  );
  const reactionCandidates = discovery.candidates;
  const selectedCandidate =
    reactionCandidates.find((candidate) => candidate.id === selectedCandidateId) ?? reactionCandidates[0];

  useEffect(() => {
    if (!reactionCandidates.some((candidate) => candidate.id === selectedCandidateId)) {
      setSelectedCandidateId(reactionCandidates[0]?.id);
    }
  }, [reactionCandidates, selectedCandidateId]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [activeTab, selectedReactionId]);

  const closeTour = () => {
    window.localStorage.setItem("catalystx-tour-complete", "true");
    setTourOpen(false);
  };

  const openTour = () => {
    setTourOpen(true);
  };

  const updateCampaign = (patch) => {
    setCampaigns((current) => ({
      ...current,
      [activeReaction.id]: {
        ...(current[activeReaction.id] ?? activeCampaign),
        ...patch,
      },
    }));
  };

  const updateCampaignPriority = (priority) => {
    setCampaigns((current) => ({
      ...current,
      [activeReaction.id]: applyPriorityPreset(current[activeReaction.id] ?? activeCampaign, priority),
    }));
  };

  const runDiscovery = () => {
    setCampaigns((current) => {
      const existing = current[activeReaction.id] ?? activeCampaign;
      const nextRun = existing.runCount + 1;
      return {
        ...current,
        [activeReaction.id]: {
          ...existing,
          runCount: nextRun,
          lastRunLabel: `Run ${nextRun} refreshed ${new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`,
        },
      };
    });
  };

  const toggleShortlist = (candidateId) => {
    setShortlisted((current) =>
      current.includes(candidateId) ? current.filter((id) => id !== candidateId) : [...current, candidateId],
    );
  };

  const queueCandidate = (candidateId) => {
    setShortlisted((current) => (current.includes(candidateId) ? current : [...current, candidateId]));
    setSelectedCandidateId(candidateId);
    setActiveTab("feedback");
  };

  const addRecord = (record) => {
    setRecords((current) => [record, ...current]);
  };

  const renderView = () => {
    switch (activeTab) {
      case "reaction":
        return (
          <ReactionStudio
            activeReaction={activeReaction}
            candidates={reactionCandidates}
            campaign={activeCampaign}
            discovery={discovery}
            onCampaignChange={updateCampaign}
            onPriorityChange={updateCampaignPriority}
            onRunDiscovery={runDiscovery}
            onOpenAtlas={() => setActiveTab("atlas")}
          />
        );
      case "atlas":
        return (
          <CandidateAtlas
            activeReaction={activeReaction}
            candidates={reactionCandidates}
            selectedCandidate={selectedCandidate}
            selectedCandidateId={selectedCandidateId}
            setSelectedCandidateId={setSelectedCandidateId}
            shortlisted={shortlisted}
            onShortlist={toggleShortlist}
            onQueueCandidate={queueCandidate}
            records={records}
            discovery={discovery}
          />
        );
      case "bio":
        return <BioPathways activeReaction={activeReaction} />;
      case "feedback":
        return (
          <FeedbackLoop
            candidates={reactionCandidates}
            shortlisted={shortlisted}
            records={records}
            onShortlist={toggleShortlist}
            onAddRecord={addRecord}
            activeReaction={activeReaction}
            campaign={activeCampaign}
          />
        );
      case "learning":
        return <LearningLoop records={records} activeReaction={activeReaction} discovery={discovery} />;
      case "guide":
        return <ProductGuide onOpenTour={openTour} setActiveTab={setActiveTab} />;
      case "overview":
      default:
        return (
          <Overview
            activeReaction={activeReaction}
            candidates={reactionCandidates}
            records={records}
            shortlisted={shortlisted}
            setActiveTab={setActiveTab}
            setSelectedCandidateId={setSelectedCandidateId}
            discovery={discovery}
          />
        );
    }
  };

  return (
    <div className="app-shell">
      <aside className={`side-nav ${isMobileNavOpen ? "is-open" : ""}`}>
        <div className="brand-block">
          <div className="brand-mark">
            <Atom size={22} />
          </div>
          <div>
            <strong>CATALYST-X</strong>
            <span>Discovery OS</span>
          </div>
          <button className="icon-button mobile-close" type="button" onClick={() => setIsMobileNavOpen(false)} title="Close navigation">
            <X size={18} />
          </button>
        </div>
        <nav className="nav-stack" aria-label="Product navigation">
          {navItems.map((item) => {
            const Icon = navIcons[item.id] ?? Network;
            return (
              <button
                key={item.id}
                type="button"
                className={activeTab === item.id ? "is-active" : ""}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileNavOpen(false);
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="nav-footer">
          <div className="nav-status">
            <span>Model health</span>
            <strong>{discovery.campaignLabel}</strong>
          </div>
          <button className="button ghost wide" type="button" onClick={openTour}>
            <CircleHelp size={17} />
            Product tour
          </button>
        </div>
      </aside>

      {isMobileNavOpen ? <button className="nav-scrim" type="button" aria-label="Close navigation" onClick={() => setIsMobileNavOpen(false)} /> : null}

      <main className="main-shell">
        <header className="topbar">
          <button className="icon-button menu-button" type="button" onClick={() => setIsMobileNavOpen(true)} title="Open navigation">
            <Menu size={20} />
          </button>
          <div className="topbar-title">
            <span>{navItems.find((item) => item.id === activeTab)?.label}</span>
            <strong>{activeReaction.product}</strong>
          </div>
          <label className="reaction-select">
            <span>Target reaction</span>
            <select value={selectedReactionId} onChange={(event) => setSelectedReactionId(event.target.value)}>
              {reactions.map((reaction) => (
                <option key={reaction.id} value={reaction.id}>
                  {reaction.name}
                </option>
              ))}
            </select>
          </label>
          <button className="button secondary tour-button" type="button" onClick={openTour}>
            <CircleHelp size={17} />
            Product tour
          </button>
          <div className="system-pill">
            <Microscope size={16} />
            {discovery.reactionRecords.length} active records
          </div>
        </header>

        <div className="content-shell">{renderView()}</div>
      </main>

      <ProductTour isOpen={tourOpen} onClose={closeTour} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
