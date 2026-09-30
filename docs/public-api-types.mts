// Objectif : vérifier que les types publics sont importables.
import { claimCase, checkInserSupClaim } from "../src/index.mjs";
const dossier = claimCase({
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
});
void checkInserSupClaim(dossier, { decide: async () => ({}) });
