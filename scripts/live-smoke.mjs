// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { assessRiskAttention } from "../src/index.mjs";
const client = createJevClient();
const résultat = await assessRiskAttention({
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
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));
