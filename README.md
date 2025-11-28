# Projet Hytale API JS

Ce projet est un client Node.js moderne pour interagir avec l'API publique de Hytale. Il utilise ES Modules et l'API `fetch` native de Node.js.

## Installation

1. Clonez ce dépôt.
2. Installez les dépendances (il n'y en a pas beaucoup pour le moment, mais c'est une bonne pratique) :
   ```bash
   npm install
   ```

## Utilisation

Pour lancer l'exemple de script qui récupère les derniers articles de blog :

```bash
npm start
```

Ou importez la classe `HytaleClient` dans votre propre code :

```javascript
import { HytaleClient } from './src/client.js';

const client = new HytaleClient();
const posts = await client.getPublishedPosts();
console.log(posts);
```

## Tests

Pour lancer les tests unitaires :

```bash
npm test
```

## Fonctionnalités

- Récupérer les articles de blog publiés (`getPublishedPosts`)
- Récupérer un article par son slug (`getPostBySlug`)
- Récupérer les archives d'articles (`getArchivedPosts`)
