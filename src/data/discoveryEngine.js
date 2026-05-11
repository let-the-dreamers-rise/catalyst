const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
const round = (value) => Math.round(value);

const reactionBaselines = {
  "co2-methanol": {
    precedentBase: 4812,
    trainingBase: 286,
    blindSpotBase: 19,
    routeTerm: "wet-feed methanol selectivity",
  },
  "ethanol-hydrocarbons": {
    precedentBase: 2630,
    trainingBase: 144,
    blindSpotBase: 27,
    routeTerm: "coke-resistant hydrocarbon selectivity",
  },
  "biomass-furanics": {
    precedentBase: 1884,
    trainingBase: 118,
    blindSpotBase: 23,
    routeTerm: "impurity-tolerant furanics yield",
  },
};

const candidateProfiles = {
  "CX-1047": { temp: 238, pressure: 45, durability: 168, metal: "Low", readiness: 84, anchors: 14 },
  "CX-1092": { temp: 260, pressure: 50, durability: 190, metal: "Low", readiness: 76, anchors: 11 },
  "CX-1138": { temp: 250, pressure: 38, durability: 132, metal: "Medium", readiness: 79, anchors: 9 },
  "CX-2214": { temp: 365, pressure: 1.2, durability: 68, metal: "Medium", readiness: 70, anchors: 7 },
  "CX-2308": { temp: 340, pressure: 1, durability: 102, metal: "Low", readiness: 82, anchors: 12 },
  "CX-3175": { temp: 155, pressure: 6, durability: 92, metal: "Low", readiness: 74, anchors: 10 },
  "CX-3244": { temp: 52, pressure: 1, durability: 138, metal: "Low", readiness: 81, anchors: 8 },
};

export const priorityPresets = {
  balanced: {
    label: "Balanced discovery",
    description: "Keeps performance, stability, novelty, and synthesis risk in tension.",
    weights: { activity: 0.17, selectivity: 0.21, stability: 0.21, yield: 0.2, novelty: 0.09, synthesis: 0.12 },
  },
  yield: {
    label: "Fast yield lift",
    description: "Prioritizes activity, yield, and selectivity for near-term reactor testing.",
    weights: { activity: 0.23, selectivity: 0.24, stability: 0.13, yield: 0.26, novelty: 0.04, synthesis: 0.1 },
  },
  durability: {
    label: "Durability first",
    description: "Pushes long-run stability, lower deactivation risk, and conservative synthesis.",
    weights: { activity: 0.12, selectivity: 0.18, stability: 0.34, yield: 0.14, novelty: 0.04, synthesis: 0.18 },
  },
  frontier: {
    label: "Frontier search",
    description: "Allows more novelty and diversity while still filtering impossible experiments.",
    weights: { activity: 0.16, selectivity: 0.18, stability: 0.14, yield: 0.16, novelty: 0.24, synthesis: 0.12 },
  },
};

const metalRank = { Low: 0, Medium: 1, Open: 2 };

export function createInitialCampaigns(reactions) {
  return Object.fromEntries(reactions.map((reaction) => [reaction.id, createCampaignFromReaction(reaction)]));
}

export function createCampaignFromReaction(reaction) {
  return {
    temperature: reaction.constraints.temperature,
    pressure: reaction.constraints.pressure,
    stabilityHours: reaction.constraints.stabilityHours,
    maxCriticalMetal: reaction.constraints.maxCriticalMetal,
    priority: "balanced",
    generationBudget: 8,
    diversity: 58,
    evidenceThreshold: 70,
    runCount: 1,
    lastRunLabel: "Baseline discovery run",
  };
}

export function applyPriorityPreset(campaign, priority) {
  return {
    ...campaign,
    priority,
    diversity: priority === "frontier" ? Math.max(campaign.diversity, 74) : campaign.diversity,
    evidenceThreshold: priority === "frontier" ? Math.min(campaign.evidenceThreshold, 64) : campaign.evidenceThreshold,
  };
}

export function buildDiscoveryState({ reaction, candidates, retrievalRows, records, campaign }) {
  const baseline = reactionBaselines[reaction.id] ?? reactionBaselines["co2-methanol"];
  const rows = buildRetrievalRows(reaction, retrievalRows, campaign);
  const rankedCandidates = buildRankedCandidates(candidates, campaign, rows);
  const reactionRecords = records.filter((record) => record.reactionId === reaction.id);
  const driftRecords = reactionRecords.filter((record) => Math.abs(record.predictedYield - record.observedYield) >= 10);
  const scoreAverage = rankedCandidates.length
    ? round(rankedCandidates.reduce((total, candidate) => total + candidate.discoveryScore, 0) / rankedCandidates.length)
    : 0;
  const evidenceDepth = clamp(58 + rows.length * 6 + campaign.runCount * 5 + (100 - campaign.evidenceThreshold) * 0.12, 38, 99);
  const generatedCount = Math.max(3, round(campaign.generationBudget + campaign.diversity / 18 + campaign.runCount));
  const screenedVariants = generatedCount * 37 + rows.length * 14 + campaign.runCount * 9;
  const excludedCount = Math.max(0, round(screenedVariants * (0.18 + campaign.evidenceThreshold / 410)));
  const topCandidate = rankedCandidates[0];
  const readiness = clamp(62 + reactionRecords.length * 8 + rows.length * 3 - driftRecords.length * 3 + campaign.runCount * 2, 42, 98);
  const meanError = reactionRecords.length
    ? round(
        reactionRecords.reduce((total, record) => total + Math.abs(record.predictedYield - record.observedYield), 0) /
          reactionRecords.length,
      )
    : 0;

  return {
    reactionId: reaction.id,
    campaignLabel: priorityPresets[campaign.priority]?.label ?? "Balanced discovery",
    retrievalRows: rows,
    candidates: rankedCandidates,
    topCandidate,
    evidenceDepth: round(evidenceDepth),
    generatedCount,
    screenedVariants,
    excludedCount,
    scoreAverage,
    reactionRecords,
    driftRecords,
    meanError,
    readiness: round(readiness),
    knowledgeSignals: [
      {
        label: "Precedents in scope",
        value: formatNumber(baseline.precedentBase + rows.length * 43 + campaign.runCount * 18),
        detail: `${rows.length} sources above ${campaign.evidenceThreshold}% relevance`,
        tone: "cyan",
      },
      {
        label: "Generated candidates",
        value: generatedCount,
        detail: `${screenedVariants} variants screened, ${excludedCount} rejected`,
        tone: "mint",
      },
      {
        label: "Feedback records",
        value: baseline.trainingBase + reactionRecords.length,
        detail: `${driftRecords.length} current drift flags for this reaction`,
        tone: "amber",
      },
      {
        label: "Retraining readiness",
        value: `${round(readiness)}%`,
        detail: `${meanError || 4}% mean yield error in active records`,
        tone: "rose",
      },
    ],
    workflowEvents: [
      [
        "Retrieval",
        `${rows.length} ${reaction.name.toLowerCase()} evidence rows matched the current constraints.`,
      ],
      [
        "Generation",
        `${generatedCount} candidate families were re-ranked for ${priorityPresets[campaign.priority].label.toLowerCase()}.`,
      ],
      [
        "Feedback",
        driftRecords.length
          ? `${driftRecords.length} drift pattern needs a corrective experiment before retraining.`
          : "No high-drift record is blocking the current retraining batch.",
      ],
      [
        "Learning",
        `${baseline.routeTerm} is the active blind-spot theme for this workspace.`,
      ],
    ],
    modelSignals: buildModelSignals(reaction.id, driftRecords, campaign, baseline),
  };
}

function buildRetrievalRows(reaction, retrievalRows, campaign) {
  const matchingRows = retrievalRows.filter((row) => row.reactionId === reaction.id);
  const enrichedRows = matchingRows.map((row, index) => {
    const conditionBoost = scoreConditionText(row.condition, campaign, reaction.id);
    const sourceBoost = row.source.includes("Internal") || row.source.includes("lab") ? 4 : 0;
    const confidence = clamp(row.confidence * 0.72 + conditionBoost * 0.2 + campaign.runCount * 3 + sourceBoost, 34, 98);
    return {
      ...row,
      confidence: round(confidence),
      relevance: round(clamp(confidence + (campaign.evidenceThreshold - 70) * 0.08 - index * 2, 30, 99)),
      matchReason: describeEvidenceFit(confidence, campaign),
    };
  });

  const filtered = enrichedRows.filter((row) => row.relevance >= campaign.evidenceThreshold - 8);
  return (filtered.length ? filtered : enrichedRows.slice(0, 1)).sort((a, b) => b.relevance - a.relevance);
}

function buildRankedCandidates(candidates, campaign, rows) {
  const preset = priorityPresets[campaign.priority] ?? priorityPresets.balanced;
  const baseRank = new Map(
    [...candidates].sort((a, b) => b.discoveryScore - a.discoveryScore).map((candidate, index) => [candidate.id, index + 1]),
  );
  const averageEvidence = rows.length
    ? rows.reduce((total, row) => total + row.relevance, 0) / rows.length
    : campaign.evidenceThreshold;

  const adjusted = candidates.map((candidate) => {
    const profile = candidateProfiles[candidate.id] ?? {
      temp: campaign.temperature,
      pressure: campaign.pressure,
      durability: campaign.stabilityHours,
      metal: "Low",
      readiness: 72,
      anchors: 6,
    };
    const temperatureFit = scoreFit(campaign.temperature, profile.temp, profile.temp > 300 ? 1.2 : 1.8);
    const pressureFit = scoreFit(campaign.pressure, profile.pressure, profile.pressure < 5 ? 3.4 : 1.15);
    const stabilityFit = clamp(100 - Math.max(0, campaign.stabilityHours - profile.durability) * 0.42, 25, 100);
    const metalFit =
      metalRank[profile.metal] <= metalRank[campaign.maxCriticalMetal]
        ? 100
        : clamp(74 - (metalRank[profile.metal] - metalRank[campaign.maxCriticalMetal]) * 18, 32, 74);
    const conditionFit = round(temperatureFit * 0.35 + pressureFit * 0.2 + stabilityFit * 0.27 + metalFit * 0.18);
    const noveltyPressure = campaign.priority === "frontier" ? campaign.diversity * 0.08 : campaign.diversity * 0.035;
    const riskPenalty = metalFit < 90 ? 9 : 0;
    const adjustedRisk = round(clamp(candidate.synthesisRisk + riskPenalty - (profile.readiness - 72) * 0.12, 12, 88));
    const evidenceStrength = round(clamp(averageEvidence * 0.58 + profile.anchors * 2.2 + campaign.runCount * 3, 22, 99));

    const predicted = {
      activity: round(clamp(candidate.predicted.activity + (conditionFit - 76) * 0.12 + (preset.weights.activity - 0.17) * 34, 28, 98)),
      selectivity: round(
        clamp(candidate.predicted.selectivity + (conditionFit - 76) * 0.1 + (preset.weights.selectivity - 0.21) * 30, 24, 98),
      ),
      stability: round(
        clamp(candidate.predicted.stability + (stabilityFit - 76) * 0.14 + (preset.weights.stability - 0.21) * 38, 25, 98),
      ),
      yield: round(clamp(candidate.predicted.yield + (conditionFit - 76) * 0.16 + (preset.weights.yield - 0.2) * 36, 18, 96)),
      carbonEfficiency: round(clamp(candidate.predicted.carbonEfficiency + (conditionFit - 76) * 0.09, 20, 98)),
    };

    const weightedScore =
      predicted.activity * preset.weights.activity +
      predicted.selectivity * preset.weights.selectivity +
      predicted.stability * preset.weights.stability +
      predicted.yield * preset.weights.yield +
      candidate.novelty * preset.weights.novelty +
      (100 - adjustedRisk) * preset.weights.synthesis;
    const discoveryScore = round(clamp(weightedScore * 0.88 + conditionFit * 0.08 + evidenceStrength * 0.04 + noveltyPressure * 0.05, 31, 98));
    const labReadiness = round(clamp(conditionFit * 0.42 + evidenceStrength * 0.26 + (100 - adjustedRisk) * 0.32, 18, 99));
    const uncertaintyScore = round(clamp(42 - evidenceStrength * 0.16 + Math.max(0, 76 - conditionFit) * 0.22 + adjustedRisk * 0.12, 7, 44));
    const campaignFitText = `${conditionFit}% fit to ${campaign.temperature} deg C, ${campaign.pressure} bar, ${campaign.stabilityHours} h target`;

    return {
      ...candidate,
      baseDiscoveryScore: candidate.discoveryScore,
      discoveryScore,
      synthesisRisk: adjustedRisk,
      predicted,
      campaignFit: conditionFit,
      evidenceStrength,
      labReadiness,
      uncertaintyScore,
      metalLoad: profile.metal,
      durabilityHours: profile.durability,
      conditions: `${candidate.conditions} | campaign fit: ${campaignFitText}`,
      rationale: [
        ...candidate.rationale.slice(0, 2),
        `Current campaign settings produce ${campaignFitText}.`,
      ],
      nextExperiment: buildNextExperiment(candidate, campaign, conditionFit, preset.label),
      uncertainty: `${uncertaintyScore}% uncertainty; ${describeUncertainty(conditionFit, evidenceStrength, adjustedRisk)}.`,
    };
  });

  return adjusted
    .sort((a, b) => b.discoveryScore - a.discoveryScore)
    .map((candidate, index) => ({
      ...candidate,
      rank: index + 1,
      rankDelta: (baseRank.get(candidate.id) ?? index + 1) - (index + 1),
    }));
}

function scoreFit(value, target, penalty) {
  return clamp(100 - Math.abs(value - target) * penalty, 18, 100);
}

function scoreConditionText(condition, campaign, reactionId) {
  const tempMatch = condition.match(/(\d+)\s*deg C/);
  const pressureMatch = condition.match(/(\d+(?:\.\d+)?)\s*bar/);
  const whsvMatch = condition.match(/WHSV/i);
  const temp = tempMatch ? Number(tempMatch[1]) : campaign.temperature;
  const pressure = pressureMatch ? Number(pressureMatch[1]) : reactionId === "ethanol-hydrocarbons" && whsvMatch ? 1.2 : campaign.pressure;
  return scoreFit(campaign.temperature, temp, temp > 300 ? 1.1 : 1.6) * 0.62 + scoreFit(campaign.pressure, pressure, pressure < 5 ? 3 : 1) * 0.38;
}

function buildNextExperiment(candidate, campaign, fit, presetLabel) {
  if (fit >= 82) {
    return `Run a focused 8-condition confirmation around ${campaign.temperature} deg C and ${campaign.pressure} bar under ${presetLabel.toLowerCase()}.`;
  }

  if (candidate.route === "Synthetic biology") {
    return `Run a stress-tolerance assay before scale-up; current constraints expose a pathway uncertainty band.`;
  }

  return `Run a small DoE around temperature and residence time before committing reactor hours.`;
}

function describeEvidenceFit(confidence, campaign) {
  if (confidence >= 86) return "Strong match to current operating window";
  if (confidence >= campaign.evidenceThreshold) return "Usable precedent with one constraint gap";
  return "Low-confidence precedent kept for contrast";
}

function describeUncertainty(conditionFit, evidenceStrength, synthesisRisk) {
  if (conditionFit < 68) return "constraint mismatch is the dominant risk";
  if (evidenceStrength < 62) return "evidence density is still thin";
  if (synthesisRisk > 58) return "synthesis route needs review";
  return "uncertainty is mainly experimental variance";
}

function buildModelSignals(reactionId, driftRecords, campaign, baseline) {
  const reactionSpecific = {
    "co2-methanol": [
      ["Water co-feed sensitivity", "CO2 methanol catalysts", "Add wet-feed controls to the next retraining batch"],
      ["Vacancy over-stabilization", "Oxide surface motifs", "Compare vacancy density against methanol selectivity"],
      ["Pressure transfer gap", "Scale-up conditions", "Add high-pressure validation above the current model window"],
      ["H2:CO2 ratio drift", "Feed composition", "Weight gas composition metadata higher"],
    ],
    "ethanol-hydrocarbons": [
      ["Coke formation under zeolite gradients", "Ethanol upgrading", "Prioritize long-run deactivation examples"],
      ["Aromatics selectivity swing", "Hydrocarbon range control", "Split C5-C8 and C9-C12 objectives"],
      ["Regeneration penalty", "Catalyst lifetime", "Add thermal cycling runs before retraining"],
      ["Water co-feed tolerance", "Bioethanol feed", "Track water fraction as a primary condition"],
    ],
    "biomass-furanics": [
      ["Hydrolysate impurity tolerance", "Biomass and enzyme hybrids", "Weight negative enzyme stability results higher"],
      ["Humin formation spike", "Sugar dehydration", "Add solvent and residence-time controls"],
      ["Enzyme half-life gap", "Biocatalyst stage", "Prioritize feed impurity assays"],
      ["Oxidation selectivity drift", "FDCA precursor route", "Separate dehydration and oxidation models"],
    ],
  };

  return reactionSpecific[reactionId].map(([label, area, action], index) => ({
    id: `${reactionId}-${index}`,
    label,
    area,
    drift: round(
      clamp(
        baseline.blindSpotBase +
          index * 4 +
          driftRecords.length * 5 +
          (campaign.priority === "frontier" ? 5 : 0) -
          campaign.runCount,
        8,
        42,
      ),
    ),
    action,
  }));
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}
