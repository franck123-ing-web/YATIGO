# YATIGO Documentation

Documentation technique et documentation du projet YATIGO.

#  YATIGO — Structure et rôle des fichiers

Ce document présente l'organisation du projet **YATIGO**, ainsi que le rôle des différents dossiers et fichiers qui composent l'application.

L'objectif est de conserver une architecture claire, modulaire et facilement maintenable.

---

##  Sommaire

* [1. Organisation générale du projet](#1--organisation-générale-du-projet)
* [2. Backend](#2--backend)

  * [2.1 Structure](#21--structure)
  * [2.2 Point d'entrée](#22--point-dentrée)
  * [2.3 API](#23--api)
  * [2.4 Core](#24--core)
  * [2.5 Schemas](#25--schemas)
  * [2.6 Repositories](#26--repositories)
  * [2.7 Services](#27--services)
  * [2.8 Utils](#28--utils)
  * [2.9 Tests](#29--tests)
* [3. Dashboard](#3--dashboard)

  * [3.1 Structure](#31--structure)
  * [3.2 App](#32--app)
  * [3.3 Pages Bus](#33--pages-bus)
  * [3.4 Components](#34--components)
  * [3.5 Brand](#35--brand)
  * [3.6 UI](#36--ui)
  * [3.7 Bus](#37--bus)
  * [3.8 Types](#38--types)
  * [3.9 Lib](#39--lib)
  * [3.10 Connexion au backend](#310--connexion-au-backend)
  * [3.11 Variables d'environnement](#311--variables-denvironnement)
* [4. Architecture générale](#4--architecture-générale)

---

# 1.  Organisation générale du projet

Le projet **YATIGO** est séparé en plusieurs parties afin que chaque application possède une responsabilité claire.

```text
YATIGO/
│
├── backend/
│   ├── app/
│   ├── tests/
│   ├── .env.example
│   ├── README.md
│   └── requirements.txt
│
├── mobile/
│   └── README.md
│
├── dashboard/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── services/
│   ├── types/
│   ├── .env.local
│   ├── .env.example
│   └── README.md
│
├── supabase/
│   └── migrations/
│       └── YATIGO_BD.sql
│
├── docs/
│   └── README.md
│
├── .gitignore
└── README.md
```

###  Rôle des principales parties

| Dossier      | Rôle                                              |
| ------------ | ------------------------------------------------- |
| `backend/`   | API et logique métier                             |
| `mobile/`    | Application destinée aux voyageurs                |
| `dashboard/` | Interface destinée aux agences et administrateurs |
| `supabase/`  | Base de données et migrations                     |
| `docs/`      | Documentation du projet                           |

L'architecture générale peut être représentée ainsi :

```text
                    ┌─────────────────┐
                    │   Application   │
                    │     Mobile      │
                    └────────┬────────┘
                             │
                             │
                    ┌────────▼────────┐
                    │                 │
                    │     FastAPI     │
                    │     Backend     │
                    │                 │
                    └────────┬────────┘
                             │
                             │
                    ┌────────▼────────┐
                    │    Supabase     │
                    │   PostgreSQL    │
                    └─────────────────┘
                             ▲
                             │
                    ┌────────┴────────┐
                    │                 │
                    │    Dashboard    │
                    │     Next.js     │
                    │                 │
                    └─────────────────┘
```

---

# 2.  Backend

Le backend utilise **FastAPI**.

Son rôle est de :

* recevoir les requêtes provenant des applications ;
* appliquer les règles métier ;
* gérer l'authentification et les autorisations ;
* communiquer avec Supabase ;
* accéder aux données ;
* retourner les résultats aux applications clientes.

L'architecture du backend suit une séparation entre les différentes responsabilités.

---

## 2.1 Structure

```text
backend/
│
├── app/
│   ├── main.py
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── repositories/
│   ├── schemas/
│   ├── services/
│   └── utils/
│
├── tests/
├── .env.example
├── README.md
└── requirements.txt
```

---

## 2.2 Point d'entrée

### `backend/app/main.py`

`main.py` est le **point d'entrée de l'API FastAPI**.

Il servira notamment à :

* créer l'application FastAPI ;
* enregistrer les routes ;
* configurer certains éléments globaux ;
* connecter les gestionnaires d'erreurs ;
* initialiser les différents composants nécessaires au démarrage de l'application.

On peut considérer `main.py` comme la **porte d'entrée du backend**.

```text
                    main.py
                       │
                       ▼
                FastAPI Application
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Routes        Config       Errors
```

---

# 2.3  API

Le dossier `api` contient les éléments liés aux **routes HTTP de l'API**.

```text
backend/app/api/
│
├── __init__.py
└── routes/
    ├── __init__.py
    ├── auth.py
    ├── bus.py
    ├── chauffeurs.py
    └── trajets.py
```

Les routes sont responsables de recevoir les requêtes HTTP et de transmettre les opérations aux services appropriés.

La route ne doit pas contenir toute la logique métier.

L'objectif est de conserver une architecture :

```text
Client
  │
  ▼
Route
  │
  ▼
Service
  │
  ▼
Repository
  │
  ▼
Supabase / PostgreSQL
```

---

## `api/routes/auth.py`

Ce fichier contiendra les routes liées à **l'authentification**.

Par exemple :

```http
POST /auth/login
POST /auth/register
```

La route reçoit la demande puis transmet le travail aux couches appropriées.

La logique métier et l'accès aux données ne doivent pas être entièrement placés dans ce fichier.

---

## `api/routes/bus.py`

Ce fichier contient les routes liées aux **bus**.

À terme, on pourra notamment avoir :

```http
GET    /bus
POST   /bus
GET    /bus/{id}
PUT    /bus/{id}
DELETE /bus/{id}
```

La route doit principalement :

1. recevoir la requête ;
2. récupérer les paramètres nécessaires ;
3. vérifier les données d'entrée ;
4. appeler le service approprié ;
5. retourner la réponse.

La logique métier doit rester dans `bus_service.py`.

---

## `api/routes/chauffeurs.py`

Ce fichier est prévu pour les fonctionnalités concernant les **chauffeurs**.

Il pourra notamment contenir les routes permettant de :

* récupérer les chauffeurs ;
* créer un chauffeur ;
* modifier un chauffeur ;
* consulter les informations d'un chauffeur ;
* gérer son affectation.

---

## `api/routes/trajets.py`

Ce fichier est prévu pour les fonctionnalités concernant les **trajets**.

Il pourra notamment gérer :

* la création de trajets ;
* la modification de trajets ;
* la récupération des trajets ;
* les informations liées aux départs et arrivées ;
* les affectations nécessaires.

---

# 2.4  Core

```text
backend/app/core/
│
├── supabase.py
├── auth.py
├── dependencies.py
├── config.py
└── error_handlers.py
```

Le dossier `core` contient les éléments **transversaux** utilisés par plusieurs parties du backend.

Il regroupe donc les fonctionnalités fondamentales de l'application.

---

## `core/config.py`

Centralise la configuration du backend.

Il pourra notamment gérer :

* l'URL Supabase ;
* les clés nécessaires ;
* la configuration de l'environnement ;
* les paramètres généraux de l'application ;
* les paramètres de développement et de production.

L'objectif est d'éviter d'éparpiller la configuration dans plusieurs fichiers.

```text
Configuration
      │
      ├── Supabase URL
      ├── Supabase Keys
      ├── Environment
      └── Application Settings
```

---

## `core/supabase.py`

Gère la **connexion avec Supabase**.

Les repositories pourront utiliser cette connexion pour communiquer avec PostgreSQL via Supabase.

Le principe est d'éviter de créer plusieurs connexions différentes dans chaque repository.

```text
Repository
     │
     ▼
core/supabase.py
     │
     ▼
Supabase
     │
     ▼
PostgreSQL
```

---

## `core/auth.py`

Contient la logique liée à **l'authentification et à l'identification de l'utilisateur connecté**.

Il permettra notamment au backend de répondre à la question :

> Quel utilisateur est actuellement connecté ?

Il pourra vérifier l'identité de l'utilisateur à partir du token fourni par **Supabase Auth**.

```text
Utilisateur
    │
    ▼
Token
    │
    ▼
Auth
    │
    ▼
Utilisateur identifié
```

---

## `core/dependencies.py`

Contient les **dépendances FastAPI communes**.

Dans YATIGO, il servira notamment à récupérer le contexte de l'utilisateur et de son agence.

Exemple :

```text
Utilisateur connecté
        │
        ▼
Identification
        │
        ▼
Employé
        │
        ▼
Agence associée
        │
        ▼
Ressources autorisées
```

Cette partie est particulièrement importante pour garantir l'isolation des données entre les agences.

Par exemple :

> Une agence ne doit pas pouvoir accéder aux bus appartenant à une autre agence.

---

## `core/error_handlers.py`

Contient les **gestionnaires d'erreurs globaux**.

Son rôle est de transformer certaines erreurs backend en réponses API propres et compréhensibles.

L'objectif est d'éviter d'avoir des réponses différentes ou désordonnées selon chaque route.

```text
Erreur Backend
      │
      ▼
Error Handler
      │
      ▼
Réponse API standardisée
```

---

# 2.5  Schemas

```text
backend/app/schemas/
│
├── bus.py
└── employe_agence.py
```

Les **schemas** décrivent les données qui entrent et sortent de l'API.

Ils sont notamment utilisés avec **Pydantic**.

Ils permettent de :

* contrôler les données reçues ;
* valider les informations ;
* définir clairement les structures de données ;
* contrôler les réponses de l'API.

---

## `schemas/bus.py`

Définit les structures utilisées pour les données des bus.

On pourra notamment avoir des schemas correspondant à :

```text
Créer un bus
Modifier un bus
Afficher un bus
```

Cela permet de contrôler les données reçues par l'API.

Par exemple :

```text
Requête HTTP
     │
     ▼
Pydantic Schema
     │
     ├── Données valides → Service
     │
     └── Données invalides → Erreur 422
```

---

## `schemas/employe_agence.py`

Définit les données liées à l'employé d'agence et à son contexte.

Il permet notamment de représenter les informations nécessaires pour déterminer :

```text
Utilisateur
    │
    ▼
Employé
    │
    ▼
Agence
    │
    ▼
Rôle
```

Ces informations sont importantes pour gérer les autorisations.

---

# 2.6  Repositories

```text
backend/app/repositories/
│
├── bus_repository.py
└── employe_agence_repository.py
```

Le **repository** est responsable de l'accès aux données.

Il communique avec la base de données pour :

* rechercher des données ;
* récupérer des données ;
* créer des données ;
* modifier des données ;
* supprimer des données lorsque nécessaire.

Le repository ne doit pas décider si une opération est autorisée d'un point de vue métier.

Il se concentre principalement sur **l'accès aux données**.

---

## `repositories/bus_repository.py`

Gère les opérations de base de données concernant les bus.

Par exemple :

```text
get_bus()
get_buses()
create_bus()
update_bus()
delete_bus()
```

Le repository ne doit pas décider si l'utilisateur a le droit de modifier le bus.

Cette décision appartient à la couche service.

---

## `repositories/employe_agence_repository.py`

Permet de récupérer les informations concernant l'employé et son agence.

Il est notamment utile pour déterminer :

```text
Quel utilisateur ?
        │
        ▼
Quel employé ?
        │
        ▼
Quelle agence ?
        │
        ▼
Quel rôle ?
```

---

# 2.7  Services

```text
backend/app/services/
│
├── bus_service.py
└── employe_agence_service.py
```

Le **service contient la logique métier**.

C'est une partie très importante de l'architecture du backend.

Le service fait le lien entre les routes et les repositories.

```text
Route
  │
  ▼
Service
  │
  ▼
Repository
  │
  ▼
Supabase / PostgreSQL
```

---

## `services/bus_service.py`

Contient les règles métier concernant les bus.

Par exemple, lors de la création d'un bus :

```text
Créer un bus
      │
      ▼
Vérifier l'utilisateur
      │
      ▼
Vérifier l'agence
      │
      ▼
Vérifier les données
      │
      ▼
Appliquer les règles métier
      │
      ▼
Repository
      │
      ▼
Enregistrer le bus
```

Le service permet donc de centraliser les règles métier au même endroit.

---

## `services/employe_agence_service.py`

Contient la logique permettant de gérer le contexte de l'employé d'agence.

Il pourra notamment :

* récupérer l'employé connecté ;
* déterminer son agence ;
* vérifier son rôle ;
* vérifier ses autorisations ;
* fournir les informations nécessaires aux autres services.

---

# 2.8  Utils

```text
backend/app/utils/
│
└── exceptions.py
```

Le dossier `utils` contient des outils génériques utilisés par différentes parties du backend.

---

## `utils/exceptions.py`

Contient les **exceptions personnalisées du projet**.

Au lieu d'utiliser uniquement des erreurs génériques, YATIGO pourra avoir des erreurs métier clairement identifiées.

Par exemple :

```text
BusNotFound
UnauthorizedAgencyAccess
InvalidBusData
```

Cela rend le backend :

* plus compréhensible ;
* plus facile à maintenir ;
* plus facile à déboguer ;
* plus cohérent au niveau des erreurs.

---

# 2.9  Tests

```text
backend/tests/
```

Ce dossier contient les **tests du backend**.

L'objectif est de vérifier que les fonctionnalités continuent à fonctionner après les modifications du code.

Les tests pourront progressivement couvrir :

* les routes ;
* les services ;
* les repositories ;
* les validations ;
* l'authentification ;
* les permissions ;
* les règles métier.

Pour un projet à long terme, cette partie deviendra très importante.

---

# 3.  Dashboard

Le Dashboard est développé avec **Next.js**.

Il est destiné principalement aux :

* agences ;
* administrateurs.

Sa structure actuelle est :

```text
dashboard/
│
├── app/
├── components/
├── lib/
├── services/
├── types/
├── .env.local
├── .env.example
└── README.md
```

Le Dashboard constitue l'interface permettant aux utilisateurs autorisés de gérer les données de leur environnement.

---

# 3.1 Structure

L'architecture générale du Dashboard repose sur plusieurs responsabilités :

```text
dashboard/
│
├── app/           → Pages et routes
├── components/    → Composants réutilisables
├── lib/           → Logique et utilitaires
├── services/      → Services applicatifs
├── types/         → Types TypeScript
├── .env.local     → Variables locales
├── .env.example   → Exemple de configuration
└── README.md      → Documentation
```

---

# 3.2  App

Le dossier `app` contient les **pages et routes de l'interface Next.js**.

```text
app/
│
├── layout.tsx
├── page.tsx
│
├── styles/
│   └── theme.css
│
└── bus/
    ├── page.tsx
    │
    ├── nouveau/
    │   └── page.tsx
    │
    └── [id]/
        └── modifier/
            └── page.tsx
```

---

## `app/layout.tsx`

Layout principal de l'application.

Il permet de définir la structure globale commune aux différentes pages.

Il peut notamment contenir :

* les éléments communs ;
* les providers ;
* les styles globaux ;
* la structure générale de l'application.

---

## `app/page.tsx`

Page d'accueil du Dashboard.

Elle constitue la première page affichée après l'accès au Dashboard.

---

## `app/styles/theme.css`

Contient les éléments visuels communs au Dashboard :

* couleurs ;
* variables CSS ;
* styles globaux ;
* identité visuelle ;
* règles générales de présentation.

L'objectif est d'éviter de définir les mêmes couleurs ou styles directement dans chaque composant.

---

# 3.3  Pages Bus

Le Dashboard possède une section dédiée à la **gestion des bus**.

```text
app/bus/
│
├── page.tsx
│
├── nouveau/
│   └── page.tsx
│
└── [id]/
    └── modifier/
        └── page.tsx
```

---

## `app/bus/page.tsx`

Page principale de **gestion des bus**.

Elle permettra notamment d'afficher :

```text
Bus de l'agence
       │
       ▼
Recherche / filtres
       │
       ▼
Liste des bus
       │
       ▼
Actions
```

Les actions pourront notamment permettre de :

* consulter un bus ;
* créer un bus ;
* modifier un bus ;
* filtrer les bus ;
* rechercher un bus.

---

## `app/bus/nouveau/page.tsx`

Page permettant de **créer un nouveau bus**.

Elle utilisera notamment le composant :

```text
BusForm
```

afin d'éviter de dupliquer la logique du formulaire.

---

## `app/bus/[id]/modifier/page.tsx`

Page permettant de **modifier un bus existant**.

`[id]` représente l'identifiant du bus.

Par exemple :

```text
/bus/123/modifier
```

Ici, `123` représente l'identifiant du bus à modifier.

---

# 3.4  Components

Le dossier `components` contient les **composants réutilisables de l'interface**.

```text
components/
│
├── ui/
├── layout/
├── brand/
└── bus/
```

L'objectif est de ne pas mettre tout le code directement dans les pages.

Les pages doivent principalement assembler les composants nécessaires.

---

# 3.5  Brand

```text
components/brand/
│
└── YatigoLogo.tsx
```

## `YatigoLogo.tsx`

Composant dédié à l'identité visuelle YATIGO.

L'avantage est que si le logo doit évoluer, il est possible de modifier principalement ce composant plutôt que de rechercher le logo partout dans le projet.

```text
YatigoLogo
    │
    ├── Header
    ├── Sidebar
    ├── Login
    └── Autres pages
```

---

# 3.6  UI

```text
components/ui/
│
└── StatusBadge.tsx
```

## `StatusBadge.tsx`

Composant générique permettant d'afficher un statut de manière cohérente dans l'application.

Par exemple :

```text
DISPONIBLE
MAINTENANCE
HORS SERVICE
```

L'objectif est d'avoir **un même comportement visuel dans toute l'application**.

---

# 3.7  Bus

```text
components/bus/
│
├── BusStatusBadge.tsx
├── BusCard.tsx
├── BusList.tsx
├── BusForm.tsx
├── BusFilters.tsx
├── BusTable.tsx
├── BusStatusSelector.tsx
├── BusTypeSelector.tsx
└── BusFeatureCard.tsx
```

---

## `BusStatusBadge.tsx`

Affiche l'état d'un bus.

Exemples :

```text
DISPONIBLE
MAINTENANCE
HORS_SERVICE
```

Ce composant est spécifique au domaine Bus.

---

## `BusCard.tsx`

Affichage d'un bus sous forme de **carte**.

Il peut être utilisé dans une interface où les bus sont présentés individuellement.

---

## `BusList.tsx`

Affiche une **liste de bus**.

Ce composant peut notamment gérer l'affichage de plusieurs `BusCard`.

```text
BusList
   │
   ├── BusCard
   ├── BusCard
   ├── BusCard
   └── BusCard
```

---

## `BusForm.tsx`

Formulaire permettant de **créer ou modifier un bus**.

Il centralise les champs du formulaire plutôt que de dupliquer le même formulaire dans plusieurs pages.

```text
BusForm
   │
   ├── Création
   │
   └── Modification
```

---

## `BusFilters.tsx`

Permet de filtrer les bus.

Par exemple :

```text
Type
État
Recherche
```

Les filtres peuvent être combinés afin de faciliter la recherche dans la liste des bus.

---

## `BusTable.tsx`

Affiche les bus sous forme de **tableau**.

Un tableau est particulièrement adapté lorsque plusieurs informations doivent être affichées simultanément.

Par exemple :

```text
Immatriculation | Type | Capacité | État | Actions
```

---

## `BusStatusSelector.tsx`

Permet de sélectionner l'état du bus.

Exemples :

```text
DISPONIBLE
MAINTENANCE
HORS_SERVICE
```

---

## `BusTypeSelector.tsx`

Permet de sélectionner le type de bus.

Exemples :

```text
CLASSIQUE
VIP
```

---

## `BusFeatureCard.tsx`

Permet de présenter les caractéristiques d'un bus.

Par exemple :

```text
Climatisation
Wi-Fi
Prises USB
Inclinaison des sièges
```

---

# 3.8  Types

```text
types/
│
└── bus.ts
```

## `types/bus.ts`

Contient les types **TypeScript** liés aux bus.

Cela permet de définir clairement la forme des données utilisées par le frontend.

Par exemple :

```text
Bus
BusStatus
BusType
```

Le but est d'éviter de manipuler des objets sans structure clairement définie.

Exemple conceptuel :

```typescript
Bus
├── id
├── immatriculation
├── capacité
├── type
└── statut
```

---

# 3.9  Lib

```text
lib/
│
├── validations/
│   └── bus.ts
│
├── bus/
│   ├── bus.types.ts
│   └── bus.service.ts
│
└── api/
    ├── config.ts
    └── client.ts
```

Le dossier `lib` regroupe différentes fonctions et couches nécessaires au fonctionnement du Dashboard.

---

## `lib/validations/bus.ts`

Contient les règles de **validation du formulaire Bus**.

Les outils utilisés sont notamment :

* Zod ;
* React Hook Form ;
* `@hookform/resolvers`.

Cela permet de vérifier les données avant de les envoyer au backend.

Par exemple :

```text
Formulaire Bus
      │
      ▼
Validation
      │
      ├──  Données invalides
      │
      └──  Données valides
                  │
                  ▼
                 API
```

Les validations peuvent notamment vérifier :

```text
Une immatriculation valide
Une capacité valide
Un type valide
Un statut valide
Les champs obligatoires
```

---

# 3.10 `lib/bus/`

## `bus.types.ts`

Contient les types spécifiquement liés au domaine **Bus**.

Il peut sembler similaire à :

```text
types/bus.ts
```

###  Point à surveiller

Il faudra probablement décider plus tard si les deux fichiers sont réellement nécessaires ou si un seul emplacement doit devenir la **source de vérité**.

Il n'est pas recommandé de supprimer l'un des fichiers immédiatement sans vérifier les imports existants.

L'objectif final doit être d'éviter les doublons de types.

---

## `bus.service.ts`

Contiendra les fonctions permettant au Dashboard de communiquer avec le backend pour les opérations liées aux bus.

Par exemple :

```text
getBuses()
getBus()
createBus()
updateBus()
deleteBus()
```

Il constitue une couche entre l'interface et l'API.

Architecture :

```text
Page
  │
  ▼
Component
  │
  ▼
Bus Service
  │
  ▼
API Client
  │
  ▼
FastAPI
```

---

# 3.11  Connexion au backend

```text
lib/api/
│
├── config.ts
└── client.ts
```

Cette partie prépare la connexion entre le Dashboard Next.js et le futur backend FastAPI.

---

## `config.ts`

Centralise la configuration de connexion à l'API.

Par exemple :

```text
URL du backend
Configuration générale de l'API
```

L'objectif est d'éviter d'écrire directement l'URL du backend dans plusieurs fichiers.

---

## `client.ts`

Contiendra le client HTTP utilisé par le Dashboard pour communiquer avec FastAPI.

L'objectif est d'avoir une seule couche responsable des requêtes HTTP.

Architecture souhaitée :

```text
Page
  │
  ▼
Composant
  │
  ▼
Service
  │
  ▼
API Client
  │
  ▼
FastAPI
  │
  ▼
Repository
  │
  ▼
Supabase / PostgreSQL
```

Cette architecture permet de garder les responsabilités séparées.

---

# 3.12  Variables d'environnement

```text
dashboard/
│
├── .env.local
└── .env.example
```

---

## `.env.local`

Contient les variables d'environnement **locales à la machine de développement**.

Ce fichier est destiné à la configuration locale.

 Il ne doit normalement pas contenir de secrets qui seront commités dans Git.

Il doit être ajouté au `.gitignore` lorsque cela est nécessaire.

---

## `.env.example`

Contient uniquement un exemple des variables nécessaires au fonctionnement du Dashboard.

Par exemple :

```env
NEXT_PUBLIC_API_URL=
```

Il sert à expliquer aux autres développeurs quelles variables ils doivent créer dans leur environnement local.

### Exemple de fonctionnement

```text
.env.example
     │
     ▼
Copié vers
     │
     ▼
.env.local
     │
     ▼
Variables locales
```

Le fichier `.env.example` peut être versionné dans Git, contrairement aux fichiers contenant de véritables secrets.

---

# 4.  Architecture générale

L'objectif de l'architecture YATIGO est de séparer clairement les responsabilités entre les différentes couches.

## Backend

```text
                    ┌──────────────────┐
                    │     Client       │
                    │ Mobile / Web     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │      Routes      │
                    │     FastAPI      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Services     │
                    │  Logique métier  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Repositories   │
                    │  Accès données   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Supabase     │
                    │   PostgreSQL     │
                    └──────────────────┘
```

---

## Dashboard

```text
                    ┌──────────────────┐
                    │      Page        │
                    │     Next.js      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Components    │
                    │       UI         │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Services     │
                    │   Domaine Bus    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    API Client    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │      FastAPI     │
                    └──────────────────┘
```

---

# 5.  Exemple de flux complet

Prenons l'exemple de la **création d'un bus depuis le Dashboard**.

```text
Utilisateur
     │
     ▼
Page "Nouveau bus"
     │
     ▼
BusForm
     │
     ▼
Validation Zod
     │
     ▼
bus.service.ts
     │
     ▼
API Client
     │
     ▼
POST /bus
     │
     ▼
FastAPI
     │
     ▼
Route bus.py
     │
     ▼
bus_service.py
     │
     ├── Vérification utilisateur
     ├── Vérification agence
     ├── Validation métier
     │
     ▼
bus_repository.py
     │
     ▼
Supabase
     │
     ▼
PostgreSQL
```

Cette séparation permet d'éviter de mélanger :

* l'affichage 
* la validation frontend 
* les requêtes HTTP 
* la logique métier 
* l'accès aux données

---

# 6.  Principes d'architecture

Le projet YATIGO doit suivre plusieurs principes afin de rester maintenable.

### 1. Une responsabilité par couche

Chaque partie du projet doit avoir un rôle clair.

```text
Route       → reçoit la requête
Service     → applique la logique métier
Repository  → accède aux données
Schema      → valide les données
Component   → affiche l'interface
Service UI  → communique avec l'API
```

---

### 2. Éviter la duplication

Lorsqu'une fonctionnalité est utilisée plusieurs fois, elle doit idéalement être centralisée.

Exemple :

```text
 Dupliquer BusForm dans plusieurs pages

 Créer un BusForm réutilisable
```

---

### 3. Centraliser la logique métier

Les règles métier ne doivent pas être dispersées dans les routes.

```text
 Route → logique métier → SQL

 Route
     ↓
  Service
     ↓
 Repository
     ↓
 Supabase
```

---

### 4. Centraliser les configurations

Les URLs, clés et paramètres doivent être gérés via les variables d'environnement et les fichiers de configuration appropriés.

```text
.env
  │
  ▼
config.py / config.ts
  │
  ▼
Application
```

---

### 5. Garder une séparation claire entre frontend et backend

Le Dashboard ne doit pas accéder directement à la base de données pour les opérations métier.

Le flux attendu est :

```text
Dashboard
    ↓
FastAPI
    ↓
Services
    ↓
Repositories
    ↓
Supabase
```

---

L'objectif principal est de conserver une architecture :

**Claire → Modulaire → Réutilisable → Maintenable → Évolutive**

Cette organisation permettra à YATIGO de continuer à évoluer sans que les différentes parties du projet deviennent fortement dépendantes les unes des autres.
