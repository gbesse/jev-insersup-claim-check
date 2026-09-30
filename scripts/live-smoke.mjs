// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { checkInserSupClaim } from "../src/index.mjs";
const client = createJevClient();
const résultat = await checkInserSupClaim({
  "id": "exemple-1",
  "text": "La brochure annonce 90 % d’emploi à 18 mois ; l’indicateur cité porte sur un autre millésime et une autre population.",
  "source": {
    "url": "https://example.test/donnee-source",
    "date": "2026-09-15"
  },
  "details": {
    "territoire": "Commune Exemple",
    "origine": "donnée synthétique"
  }
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));
