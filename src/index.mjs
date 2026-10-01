// Objectif : implémenter la frontière de décision métier propre au dépôt.
import { readFile } from "node:fs/promises";
export const DECISIONS = Object.freeze({
  "relevant_risk": "risque_pertinent",
  "review_required": "revue_requise",
  "low_relevance": "pertinence_faible",
  "no_known_risk": "aucun_risque_fourni"
});
const CRITERIA = Object.freeze({
  "relevant_risk": "risque pertinent",
  "review_required": "revue requise",
  "low_relevance": "pertinence faible",
  "no_known_risk": "aucun risque fourni"
});
export function riskCase(input) {
  if (!input?.id || !input?.text || !input?.source?.url || !input?.source?.date) throw new TypeError("Le dossier exige id, text, source.url et source.date");
  const date = new Date(input.source.date);
  if (Number.isNaN(date.valueOf())) throw new TypeError("source.date doit être une date ISO valide");
  return { ...input, id: String(input.id), text: String(input.text).trim(), source: { url: String(input.source.url), date: date.toISOString() } };
}
export async function assessRiskAttention(input, provider) {
  const record = riskCase(input);
  if (Array.isArray(record.risks) && record.risks.length === 0) return { decision: "no_known_risk", label: DECISIONS["no_known_risk"], probability: 1, review: false, deterministic: true };
  const response = await provider.decide({
    state: record,
    questions: { decision: { type: "choice", instructions: "Analysez ce dossier de risques à partir des seuls éléments sourcés. Choisissez la catégorie la plus prudente. N’inventez ni fait, ni droit applicable, ni garantie.", criteria: CRITERIA } },
  });
  const answer = response.answers.decision;
  return { decision: answer.choice, label: DECISIONS[answer.choice], probability: answer.probabilities[answer.choice], confidence: answer.confidence, review: answer.confidence < 0.8, deterministic: false, usage: response.usage };
}
export async function runCli(argv, io = console) {
  if (argv.length !== 1) throw new Error("Usage : jev-georisques-preflight <dossier.json>");
  const dossier = riskCase(JSON.parse(await readFile(argv[0], "utf8")));
  io.log(JSON.stringify({ dossier, prochaineÉtape: "Transmettez ce dossier à assessRiskAttention avec un fournisseur Jev configuré." }, null, 2));
}
