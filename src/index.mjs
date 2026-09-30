// Objectif : implémenter la frontière de décision métier propre au dépôt.
import { readFile } from "node:fs/promises";

export const DECISIONS = Object.freeze({
  "supported": "étayée",
  "qualified": "à_nuancer",
  "unsupported": "non_étayée",
  "exact_match": "correspondance_exacte"
});
const CRITERIA = Object.freeze({
  "supported": "étayée",
  "qualified": "à nuancer",
  "unsupported": "non étayée",
  "exact_match": "correspondance exacte"
});

export function claimCase(input) {
  if (!input?.id || !input?.text || !input?.source?.url || !input?.source?.date) throw new TypeError("Le dossier exige id, text, source.url et source.date");
  const date = new Date(input.source.date);
  if (Number.isNaN(date.valueOf())) throw new TypeError("source.date doit être une date ISO valide");
  return { ...input, id: String(input.id), text: String(input.text).trim(), source: { url: String(input.source.url), date: date.toISOString() } };
}

export async function checkInserSupClaim(input, provider) {
  const record = claimCase(input);
  if (record.claimValue !== undefined && record.claimValue === record.officialValue) return { decision: "exact_match", label: DECISIONS["exact_match"], probability: 1, review: false, deterministic: true };
  const response = await provider.decide({
    state: record,
    questions: { decision: { type: "choice", instructions: "Analysez ce affirmation d’insertion à partir des seuls éléments sourcés. Choisissez la catégorie la plus prudente. N’inventez ni fait, ni éligibilité, ni garantie.", criteria: CRITERIA } },
  });
  const answer = response.answers.decision;
  return { decision: answer.choice, label: DECISIONS[answer.choice], probability: answer.probabilities[answer.choice], confidence: answer.confidence, review: answer.confidence < 0.8, deterministic: false, usage: response.usage };
}

export async function runCli(argv, io = console) {
  if (argv.length !== 1) throw new Error("Usage : jev-insersup-claim-check <dossier.json>");
  const record = claimCase(JSON.parse(await readFile(argv[0], "utf8")));
  io.log(JSON.stringify({ dossier: record, prochaineÉtape: "Transmettez ce dossier à checkInserSupClaim avec un fournisseur Jev configuré." }, null, 2));
}
