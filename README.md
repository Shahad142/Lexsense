# LexSense

> An interactive knowledge graph for exploring multilingual AI terminology — with cultural and semantic context across English, Arabic, and French.

---

## Overview

LexSense transforms a static multilingual AI glossary into a dynamic, visual knowledge graph. Rather than offering direct word-for-word translations, LexSense helps users genuinely understand AI concepts by providing contextual explanations, surfacing relationships between terms, and flagging translations that may be unclear or semantically misleading.

The project was built out of a real need: existing AI glossaries in Arabic and French often rely on literal translations that obscure meaning rather than clarify it. LexSense bridges that gap by adding a cultural and conceptual layer to technical language.

---

## Problem Statement

As AI becomes globally adopted, the need for accurate multilingual documentation grows. However, most AI glossaries are either English-only or rely on mechanical translations that lose nuance. This creates barriers for non-English speakers trying to understand foundational AI concepts.

LexSense addresses this by:

- Going beyond literal translation to provide conceptual clarity.
- Identifying terms where existing translations are unclear or misleading.
- Presenting relationships between terms to support deeper understanding.
- Making the glossary interactive and accessible, not just readable.

---

## Features

- **Interactive Knowledge Graph** — Visualize AI terms and the relationships between them in an explorable graph interface powered by Cytoscape.js.
- **Multilingual Support** — Full support for English, Arabic (RTL), and French, with language-aware display and layout.
- **Contextual Explanations** — Each term includes definitions, usage examples, and notes on semantic nuance.
- **Translation Quality Flags** — Highlights terms where existing translations are considered clear & Adopted / Needs Simplification / misleading
- **Term Relationships** — Explore how concepts connect to one another (e.g., *Neural Network → Deep Learning → Model*).
- **Clean, Minimal UI** — Built with Tailwind CSS and smooth Motion animations for a polished, distraction-free experience.

---

## How It Works

1. **Data Preparation** — A multilingual AI glossary dataset was cleaned, structured, and enriched with explanations, examples, and relationship mappings (stored in `metadata.json`).
2. **Term Selection** — Key terms were curated based on relevance, frequency, and translation ambiguity.
3. **Relationship Mapping** — Semantic and conceptual links between terms were defined to form a meaningful graph structure.
4. **Graph Rendering** — The structured data is rendered as an interactive graph using Cytoscape.js via `react-cytoscapejs`, allowing users to click, explore, and navigate between terms.
5. **Language Switching** — Users can toggle between supported languages; the graph and all annotations update accordingly.
---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 19 + TypeScript |
| Graph Visualization | Cytoscape.js + react-cytoscapejs |
| Styling | Tailwind CSS v4 |
| Animations | Motion |
| Backend | Express.js |
| Icons | Lucide React |
| Build Tool | Vite 6 |
| Data | JSON (`metadata.json`) |

---

## Installation

### Prerequisites

- Node.js v18 or higher
- npm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Shahad142/Lexsense.git

# 2. Navigate into the project directory
cd Lexsense

# 3. Install dependencies
npm install


# 4. Start the development server
npm run dev
```

The application will be running at `http://localhost:3000`.

### Other Available Scripts

```bash
npm run build     # Build for production
npm run preview   # Preview the production build
npm run lint      # Type-check with TypeScript
npm run clean     # Remove the dist folder
```

---

## Usage

1. **Open the app** in your browser at `http://localhost:3000`.
2. **Select a language** (English, Arabic, or French) using the language toggle.
3. **Browse the knowledge graph** — nodes represent AI terms, and edges represent relationships between them.
4. **Click a node** to open a detail panel showing the term's definition, contextual explanation, and any translation quality notes.
5. **Explore connections** — follow edges to related terms and build a fuller picture of a concept.
6. **Look for flagged terms** — terms marked with a warning indicator have translations that may be unclear or misleading, with notes explaining why.

---

## Project Structure

```
Lexsense/
├── src/                     # Application source code
│   ├── components/          # React UI components
│   ├── data/                # Glossary and graph data logic
│   └── main.tsx             # Application entry point
├── index.html               # HTML entry point
├── metadata.json            # Multilingual glossary dataset
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts           # Vite build configuration
└── README.md
```

---

## Challenges

- **Multilingual Data Consistency** — Ensuring that term entries across three languages remained structurally consistent and semantically aligned required careful data modeling and manual review.
- **Identifying Misleading Translations** — Determining which translations were inaccurate or misleading involved linguistic judgment calls, particularly for technical terms with no established Arabic or French equivalents.
- **Designing Meaningful Relationships** — Not all AI terms have obvious conceptual links. Deciding which relationships to include, and how to represent them visually, required balancing completeness with clarity.
- **Balancing Simplicity and Depth** — The interface needed to surface rich contextual information without overwhelming users. Achieving that balance required multiple design iterations.

---

## Achievements

- Successfully transformed a static, flat glossary into a fully interactive and navigable knowledge graph.
- Delivered consistent multilingual support across English, Arabic (including RTL layout), and French.
- Added a cultural and semantic layer that goes beyond machine translation — making technical AI concepts more accessible to a broader audience.
- Built a clean, intuitive interface with smooth animations that remains informative without becoming complex.

---

## Future Improvements

- [ ] Expand the glossary to cover more AI and machine learning terms.
- [ ] Add a search and filter feature to quickly locate specific terms.
- [ ] Allow users to contribute corrections or suggest better translations.
- [ ] Export graph views or term definitions as PDF or printable format.
- [ ] Add support for additional languages (e.g., Spanish, Chinese).
- [ ] Improve mobile responsiveness and touch-based graph navigation.
- [ ] Add user authentication to support saved sessions and personalized bookmarks.

---

## Contact
**Majd**
- GitHub: [@majdalsahali0705](https://github.com/majdalsahali0705)
  
**Shahad**
- GitHub: [@Shahad142](https://github.com/Shahad142)

---

*Built to make AI knowledge more accessible — across languages and cultures.*
