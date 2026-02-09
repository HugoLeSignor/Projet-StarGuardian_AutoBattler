# StarGuardian AutoBattler

Projet Symfony avec React pour un jeu de type Auto-Battler.

## 📋 Prérequis

- **PHP** >= 8.1
- **Composer** (gestionnaire de dépendances PHP)
- **Node.js** >= 16.x et **npm**
- **Base de données** (MySQL, PostgreSQL, etc.)
- **Git**

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd StarGuardian-AutoBattler
```

### 2. Installer les dépendances PHP

```bash
composer install
```

> **Note :** Si vous rencontrez une erreur avec `phpdocumentor/reflection-docblock`, assurez-vous que la version dans `composer.json` est `^5.2` et non `^6.0`.

### 3. Installer les dépendances JavaScript

```bash
npm install
```

### 4. Configuration de l'environnement

Copiez le fichier `.env` et créez votre fichier local :

```bash
cp .env .env.local
```

Éditez `.env.local` et configurez vos paramètres :

```env
# Base de données
DATABASE_URL="mysql://user:password@127.0.0.1:3306/starguardian_db?serverVersion=8.0"

# Autres configurations...
```

### 5. Créer la base de données

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

### 6. Charger les données initiales (fixtures)

```bash
php bin/console doctrine:fixtures:load
```

> **Note :** Cette commande va charger les rôles (Tank, DPS, Support, Soigneur, Buffer) et les personnages de Darkest Dungeon dans la base de données. Confirmez avec `yes` quand demandé.

### 7. Compiler les assets

Pour le développement :

```bash
npm run dev
```

Pour surveiller les changements (mode watch) :

```bash
npm run watch
```

Pour la production :

```bash
npm run build
```

## 🏃‍♂️ Lancer le projet

### Démarrer le serveur Symfony

```bash
symfony serve
```

Ou avec PHP natif :

```bash
php -S localhost:8000 -t public
```

Le projet sera accessible sur : `http://localhost:8000`

### Avec Docker (si configuré)

```bash
docker-compose up -d
```

## 🛠️ Technologies utilisées

- **Backend :** Symfony 6.4
- **Frontend :** React 19.2.4
- **Bundler :** Webpack Encore
- **ORM :** Doctrine
- **Base de données :** MySQL/PostgreSQL

## 📁 Structure du projet

```text
StarGuardian-AutoBattler/
├── assets/              # Fichiers JavaScript/CSS
│   ├── app.js          # Point d'entrée React
│   └── styles/         # Styles CSS/SCSS
├── config/             # Configuration Symfony
├── migrations/         # Migrations de base de données
├── public/             # Fichiers publics (index.php, build/)
├── src/                # Code PHP (Controllers, Entities, etc.)
├── templates/          # Templates Twig
├── tests/              # Tests unitaires
└── vendor/             # Dépendances PHP
```

## 📝 Commandes utiles

### Backend (Symfony)

```bash
# Vider le cache
php bin/console cache:clear

# Créer une entité
php bin/console make:entity

# Créer un contrôleur
php bin/console make:controller

# Lancer les tests
php bin/phpunit
```

### Frontend (Assets)

```bash
# Mode développement
npm run dev

# Mode watch (recompilation auto)
npm run watch

# Mode production
npm run build
```

## 🤝 Contribution

1. Créez une branche pour votre fonctionnalité : `git checkout -b feature/ma-fonctionnalite`
2. Commitez vos changements : `git commit -m "Ajout de ma fonctionnalité"`
3. Poussez vers la branche : `git push origin feature/ma-fonctionnalite`
4. Ouvrez une Pull Request

## 📄 Licence

Projet propriétaire - Tous droits réservés.
