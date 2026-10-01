// Objectif : vérifier que les types publics sont importables.
import { riskCase, assessRiskAttention } from "../src/index.mjs";
const dossier = riskCase({
  "id": "exemple-1",
  "text": "Projet de maison sur une parcelle exposée au retrait-gonflement des argiles ; fondations prévues sans étude géotechnique jointe.",
  "source": {
    "url": "https://example.test/source-publique",
    "date": "2026-09-25"
  },
  "details": {
    "territoire": "Commune Exemple",
    "origine": "donnée synthétique"
  }
});
void assessRiskAttention(dossier, { decide: async () => ({}) });
