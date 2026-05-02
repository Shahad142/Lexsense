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

- **Interactive Knowledge Graph** — Visualize AI terms and the relationships between them in an explorable graph interface.
- **Multilingual Support** — Full support for English, Arabic, and French, with language-aware display and layout.
- **Contextual Explanations** — Each term includes definitions, usage examples, and notes on semantic nuance.
- **Translation Quality Flags** — Highlights terms where existing translations are considered unclear, misleading, or culturally imprecise.
- **Term Relationships** — Explore how concepts connect to one another (e.g., *Neural Network → Deep Learning → Model*).
- **Clean, Minimal UI** — Designed for usability without sacrificing depth of information.

---

## How It Works

1. **Data Preparation** — A multilingual AI glossary dataset was cleaned, structured, and enriched with explanations, examples, and relationship mappings.
2. **Term Selection** — Key terms were curated based on relevance, frequency, and translation ambiguity.
3. **Relationship Mapping** — Semantic and conceptual links between terms were defined to form a meaningful graph structure.
4. **Graph Rendering** — The structured data is rendered as an interactive graph in the browser, allowing users to click, explore, and navigate between terms.
5. **Language Switching** — Users can toggle between supported languages; the graph and all annotations update accordingly.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | [Add frontend framework/library here — e.g., React, Vue, Svelte] |
| Graph Visualization | [Add graph library here — e.g., D3.js, Cytoscape.js, vis.js] |
| Data Format | [Add format here — e.g., JSON, CSV, YAML] |
| Styling | [Add CSS framework or approach here — e.g., Tailwind CSS, plain CSS] |
| Build Tool | [Add build tool here — e.g., Vite, Webpack, Parcel] |
| Deployment | [Add deployment platform here — e.g., GitHub Pages, Vercel, Netlify] |

> **Note:** Replace the placeholders above with the actual technologies used in your project.

---

## Installation

### Prerequisites

- [Add prerequisite here — e.g., Node.js v18+ and npm]
- [Add any other requirement here]

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/[your-username]/lexsense.git

# 2. Navigate into the project directory
cd lexsense

# 3. Install dependencies
[insert install command here — e.g., npm install]

# 4. Start the development server
[insert start command here — e.g., npm run dev]
```

The application should now be running at `http://localhost:[port]`.

---

## Usage

1. **Open the app** in your browser after starting the development server.
2. **Select a language** (English, Arabic, or French) using the language toggle.
3. **Browse the knowledge graph** — nodes represent AI terms, and edges represent relationships between them.
4. **Click a node** to open a detail panel showing the term's definition, contextual explanation, and any translation quality notes.
5. **Explore connections** — follow edges to related terms and build a fuller picture of a concept.
6. **Look for flagged terms** — terms marked with a warning indicator have translations that may be unclear or misleading, with notes explaining why.

---

## Project Structure

```
lexsense/
├── public/                  # Static assets
├── src/
│   ├── data/                # Glossary dataset (terms, translations, relationships)
│   ├── components/          # UI components (graph, term panel, language toggle, etc.)
│   ├── graph/               # Graph logic and relationship mapping
│   ├── locales/             # Language files (en, ar, fr)
│   ├── styles/              # Global and component styles
│   └── main.[js/ts]         # Application entry point
├── .gitignore
├── package.json
├── README.md
└── [config file]            # e.g., vite.config.js, webpack.config.js
```

> **Note:** Adjust the structure above to match your actual project layout.

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
- Built a clean, intuitive interface that remains informative without becoming complex.

---

## Future Improvements

- [ ] Expand the glossary to include more AI and machine learning terms.
- [ ] Add a search/filter feature to quickly locate specific terms.
- [ ] Allow users to contribute corrections or suggest better translations.
- [ ] Export graph views or term definitions as PDF or printable format.
- [ ] Add support for additional languages (e.g., Spanish, Chinese).
- [ ] Integrate an AI-powered explanation layer for dynamic, on-demand definitions.
- [ ] Improve mobile responsiveness and touch-based graph navigation.

---

## Contributing

Contributions are welcome. If you'd like to improve the glossary, fix a translation issue, or enhance the interface:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add: brief description of change"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request.

Please open an issue first if you plan to make significant changes, so we can discuss the approach before you invest time building it.

---



*Built to make AI knowledge more accessible — across languages and cultures.*
