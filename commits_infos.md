# Convention de Nommage des Commits Git

## Structure Générale

```
<type>(<portée>): <description>

[corps]

[pied de page]
```

## Types de Commits

- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Modification de la documentation
- `style`: Mise à jour du style (formatage, espaces, etc.)
- `refactor`: Refactorisation du code
- `perf`: Amélioration des performances
- `test`: Ajout ou modification de tests
- `chore`: Tâches de maintenance

## Exemples Pratiques

### Nouvelles Fonctionnalités

```
feat(auth): ajouter l'authentification Google
feat(panier): implémenter le calcul automatique du total
```

### Corrections de Bugs

```
fix(api): corriger le timeout des requêtes
fix(formulaire): résoudre le problème de validation d'email
```

### Documentation

```
docs(readme): mettre à jour les instructions d'installation
docs(api): ajouter la documentation des endpoints
```

### Style

```
style(global): formater selon les règles eslint
style(css): réorganiser les classes utilitaires
```

### Refactorisation

```
refactor(services): extraire la logique métier dans un service dédié
refactor(composants): convertir les classes en fonctions
```

### Performance

```
perf(images): optimiser le chargement des images
perf(requêtes): implémenter la mise en cache
```

### Tests

```
test(auth): ajouter les tests unitaires pour la connexion
test(api): compléter la couverture des tests d'intégration
```

### Maintenance

```
chore(deps): mettre à jour les dépendances
chore(build): configurer le déploiement continu
```

## Bonnes Pratiques

1. **Soyez Concis**: La première ligne ne doit pas dépasser 50 caractères
2. **Soyez Descriptif**: Le message doit clairement expliquer ce qui change
3. **Utilisez l'Impératif**: "ajouter" plutôt que "ajouté" ou "ajoute"
4. **Séparez les Commits**: Un commit = une modification logique
5. **Référencez les Issues**: Mentionnez les numéros d'issues quand c'est pertinent

## Exemples de Corps de Message

```
feat(auth): implémenter la réinitialisation du mot de passe

- Ajouter le formulaire de réinitialisation
- Configurer l'envoi d'emails
- Implémenter la validation du token
- Ajouter les tests d'intégration

Closes #123
```
