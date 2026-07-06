# Déploiement du portfolio

Site principal : https://portfolio-ibrahima-bamba.vercel.app/

Le portfolio est hébergé sur Vercel et déployé automatiquement depuis la branche main du dépôt GitHub BIFMNSH/portfolio-ibrahima-bamba.

## Routine locale

1. Récupérer la dernière version : git pull origin main
2. Contrôler le design : npx impeccable detect .
3. Vérifier Git : git status
4. Ajouter les fichiers : git add -A
5. Committer : git commit -m "message du commit"
6. Envoyer : git push origin main

## Impeccable live

La commande /impeccable live ne se lance pas directement dans zsh.

Il faut lancer Codex avec la commande codex, puis taper /impeccable live dans Codex.

## Vérification après push

Attendre le redéploiement Vercel, ouvrir le site, faire Ctrl + F5, puis vérifier le CV, le responsive, les liens et les animations.
