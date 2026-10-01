# Comment la décision est prise

Prépare les points de vigilance d’un projet à partir des risques naturels et technologiques sourcés.

Le code normalise la source et applique d’abord le cas déterministe documenté dans `src/index.mjs`. Pour les autres dossiers, Jev choisit la catégorie la plus prudente. Une confiance inférieure à `0.8` marque le résultat pour revue humaine.

Les démonstrations ne contiennent que des probabilités synthétiques. Constituez un corpus français annoté, mesurez les erreurs par catégorie et fixez vos propres seuils avant un usage opérationnel.
