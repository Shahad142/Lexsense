/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Search, Sun, Moon, X, Info, BookOpen, Filter, Map, Layers, Share2, Check, AlertTriangle } from 'lucide-react';
import cytoscape from 'cytoscape';
import termsData from './data/terms.json';
import './index.css';

interface Term {
  id: number;
  en: string;
  ar: string;
  fr: string;
  short_definition: string;
  explanation: string;
  explanation_ar: string;
  example: string;
  example_ar: string;
  translation_clarity: string;
  cultural_notes: string;
  cultural_notes_ar: string;
  related: number[];
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<'en' | 'ar' | 'fr'>('ar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [showCopied, setShowCopied] = useState(false);
  const [hoverTooltip, setHoverTooltip] = useState({ show: false, x: 0, y: 0, text: '' });
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  const translations = {
    en: {
      search: "Search AI terms (En, Ar, Fr)...",
      knowledgeGraph: "Knowledge Graph",
      semanticRelationships: "Semantic Relationships",
      selectTerm: "Select a term",
      selectNode: "Click on any node in the knowledge graph to view detailed multilingual definitions and cultural context.",
      explanation: "Explanation",
      example: "Example",
      culturalNote: "Cultural Note",
      shortDefinition: "Summary",
      translationClarity: "Consensus",
      relatedTerms: "Related Terms",
      share: "Share",
      lexiconHealth: "Clarity Score",
      highConsensus: "Clear & Adopted",
      needsSimplification: "Needs Simplification",
      misleading: "Misleading",
      popularDomains: "Popular Domains",
      resetLayout: "Reset Layout",
      nodes: "Nodes",
      allTerms: "All Terms",
      copied: "Link copied!"
    },
    ar: {
      search: "البحث في مصطلحات الذكاء الاصطناعي...",
      knowledgeGraph: "رسم بياني للمعرفة",
      semanticRelationships: "العلاقات الدلالية",
      selectTerm: "اختر مصطلحاً",
      selectNode: "انقر فوق أي عقدة في الرسم البياني للمعرفة لعرض تعريفات مفصلة بعدة لغات وسياق ثقافي.",
      explanation: "الشرح",
      example: "مثال",
      culturalNote: "ملاحظة ثقافية",
      shortDefinition: "خلاصة",
      translationClarity: "وضوح الترجمة",
      relatedTerms: "مصطلحات ذات صلة",
      share: "مشاركة",
      lexiconHealth: "مؤشر الوضوح",
      highConsensus: "معتمدة وواضحة",
      needsSimplification: "تحتاج تبسيط",
      misleading: "مضللة",
      popularDomains: "المجالات الشائعة",
      resetLayout: "إعادة ضبط المخطط",
      nodes: "عقد",
      allTerms: "كل المصطلحات",
      copied: "تم نسخ الرابط!"
    },
    fr: {
      search: "Rechercher des termes d'IA...",
      knowledgeGraph: "Graphe de connaissances",
      semanticRelationships: "Relations sémantiques",
      selectTerm: "Sélectionnez un terme",
      selectNode: "Cliquez sur un nœud pour voir les définitions multilingues et le contexte culturel.",
      explanation: "Explication",
      example: "Exemple",
      culturalNote: "Note culturelle",
      shortDefinition: "Résumé",
      translationClarity: "Consensus",
      relatedTerms: "Termes associés",
      share: "Partager",
      lexiconHealth: "Score de clarté",
      highConsensus: "Clair & Adopté",
      needsSimplification: "À simplifier",
      misleading: "Trompeur",
      popularDomains: "Domaines populaires",
      resetLayout: "Réinitialiser",
      nodes: "Nœuds",
      allTerms: "Tous les termes",
      copied: "Lien copié !"
    }
  };

  const t = translations[lang];

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Stable Layout Configuration
  const layout = useMemo(() => ({ 
    name: 'cose', 
    padding: 100, 
    animate: true,
    animationDuration: 800,
    componentSpacing: 120,
    nodeRepulsion: () => 400000,
    idealEdgeLength: () => 120,
    randomize: false,
    fit: true
  }), []);

  // Generate Graph Elements
  const elements = useMemo(() => {
    const termList = termsData.terms as Term[];
    const termIds = new Set(termList.map(t => t.id));

    const nodes = termList.map((term) => ({
      data: { 
        id: String(term.id), 
        label: lang === 'ar' ? term.ar : (lang === 'fr' ? term.fr : term.en), 
        en: term.en,
        ar: term.ar,
        fr: term.fr,
        short_definition: lang === 'ar' ? (term as any).short_definition_ar || term.short_definition : 
                          lang === 'fr' ? (term as any).short_definition_fr || term.short_definition : 
                          term.short_definition,
        tags: (term as any).tags || [],
        clarity: term.translation_clarity
      }
    }));

    const edges = termList.flatMap((t) =>
      t.related
        .filter(rId => termIds.has(rId))
        .map((rId) => ({
          data: { 
            id: `e${t.id}-${rId}`,
            source: String(t.id), 
            target: String(rId) 
          }
        }))
    );
    
    return [...nodes, ...edges];
  }, [termsData, lang]); // Update when data or language changes

  // Cytoscape Stylesheet
  const cyStyle = useMemo(() => {
    const isDark = theme === 'dark';
    return [
      {
        selector: 'node',
        style: {
          'background-color': isDark ? '#334155' : '#e2e8f0',
          'label': 'data(label)',
          'color': isDark ? '#f8fafc' : '#0f172a',
          'font-size': '12px',
          'font-weight': '600',
          'font-family': 'Inter, system-ui, sans-serif',
          'text-valign': 'center' as any,
          'text-halign': 'center' as any,
          'width': 80,
          'height': 35,
          'shape': 'round-rectangle' as any,
          'text-wrap': 'wrap' as any,
          'text-max-width': '70px',
          'transition-property': 'background-color, width, height, opacity, border-width, border-color, color',
          'transition-duration': '0.3s',
          'overlay-opacity': 0,
          'border-width': 2,
          'border-color': isDark ? '#475569' : '#cbd5e1'
        }
      },
      {
        selector: 'node[clarity = "clear"]',
        style: {
          'border-color': '#10b981',
          'border-width': 2
        }
      },
      {
        selector: 'node[clarity = "unclear"]',
        style: {
          'border-color': '#f59e0b',
          'border-width': 3
        }
      },
      {
        selector: 'node[clarity = "misleading"]',
        style: {
          'border-color': '#ef4444',
          'border-width': 4,
          'background-color': isDark ? '#450a0a' : '#fee2e2'
        }
      },
      {
        selector: 'node.selected',
        style: {
          'background-color': '#2563eb',
          'border-color': '#60a5fa',
          'border-width': 4,
          'color': '#ffffff',
          'width': 100,
          'height': 45,
          'z-index': 1000
        }
      },
      {
        selector: 'node.dimmed',
        style: {
          'opacity': 0.1,
          'text-opacity': 0,
          'events': 'no' as any
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 1,
          'line-color': isDark ? '#1e293b' : '#e2e8f0',
          'target-arrow-color': isDark ? '#1e293b' : '#e2e8f0',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          'opacity': 0.6,
          'arrow-scale': 0.8
        }
      },
      {
        selector: 'edge.highlight',
        style: {
          'opacity': 1,
          'width': 2,
          'line-color': '#3b82f6',
          'target-arrow-color': '#3b82f6',
          'z-index': 500
        }
      },
      {
        selector: 'edge.dimmed',
        style: {
          'opacity': 0.05
        }
      }
    ];
  }, [theme]);

  // Combined Cytoscape Lifecycle
  useEffect(() => {
    if (!containerRef.current) return;

    if (!cyRef.current) {
      const cy = cytoscape({
        container: containerRef.current,
        elements: elements,
        style: cyStyle as any,
        layout: layout as any,
        wheelSensitivity: 0.2,
        minZoom: 0.2,
        maxZoom: 3
      });

      // Events
      cy.on('tap', 'node', (evt) => {
        const id = evt.target.id();
        const term = termsData.terms.find(t => String(t.id) === id);
        if (term) setSelectedTerm(term as Term);
        
        cy.animate({
          center: { eles: evt.target },
          zoom: 1.5
        }, { duration: 500 });
      });

      cy.on('tap', (evt) => {
        if (evt.target === cy) setSelectedTerm(null);
      });

      cy.on('mouseover', 'node', (evt) => {
        const node = evt.target;
        const pos = node.renderedPosition();
        setHoverTooltip({
          show: true,
          x: pos.x,
          y: pos.y,
          text: node.data('short_definition') || 'No definition'
        });
        document.body.style.cursor = 'pointer';
      });

      cy.on('mouseout', 'node', () => {
        setHoverTooltip(prev => ({ ...prev, show: false }));
        document.body.style.cursor = 'default';
      });

      cyRef.current = cy;
    } else {
      // Update existing instance
      cyRef.current.style(cyStyle as any);
      cyRef.current.json({ elements });
      cyRef.current.layout(layout as any).run();
    }

    return () => {
      // Cleanup on unmount if needed
      // Actually keeping ref is fine, but we can destroy if we want
      // cyRef.current?.destroy();
      // cyRef.current = null;
    };
  }, [elements, cyStyle, layout]);

  // Search & Styling Effect
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.batch(() => {
      cy.nodes().removeClass('selected dimmed');
      cy.edges().removeClass('highlight dimmed');

      if (selectedTerm) {
        cy.nodes(`#${selectedTerm.id}`).addClass('selected');
      }

      const query = searchQuery.toLowerCase().trim();
      if (query) {
        cy.nodes().forEach(node => {
          const label = (node.data('label') || '').toLowerCase();
          const ar = (node.data('ar') || '').toLowerCase();
          const fr = (node.data('fr') || '').toLowerCase();
          const en = (node.data('en') || '').toLowerCase();
          const tags = (node.data('tags') || []) as string[];
          const definition = (node.data('short_definition') || '').toLowerCase();
          
          const match = label.includes(query) || 
                        ar.includes(query) || 
                        fr.includes(query) || 
                        en.includes(query) ||
                        definition.includes(query) ||
                        tags.some(t => t.toLowerCase().includes(query));

          if (!match) {
            node.addClass('dimmed');
          }
        });

        cy.edges().forEach(edge => {
          const source = edge.source();
          const target = edge.target();
          const sMatch = source.data('label').toLowerCase().includes(query) || 
                         source.data('ar').toLowerCase().includes(query) ||
                         source.data('tags').some((t: string) => t.toLowerCase().includes(query));
          const tMatch = target.data('label').toLowerCase().includes(query) || 
                         target.data('ar').toLowerCase().includes(query) ||
                         target.data('tags').some((t: string) => t.toLowerCase().includes(query));
          
          if (sMatch || tMatch) edge.addClass('highlight');
          else edge.addClass('dimmed');
        });
      }
    });
  }, [searchQuery, selectedTerm]);

  // Handle Resize
 useEffect(() => {
    if (!cyRef.current) return;
    
    let resizeTimer: number;
    const observer = new ResizeObserver(() => {
      if (!cyRef.current) return;
      cancelAnimationFrame(resizeTimer);
      resizeTimer = requestAnimationFrame(() => {
        cyRef.current?.resize();
      });
    });
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(resizeTimer);
    };
  }, []);

  // Handle Share
  const handleShare = () => {
    const text = `LexSense AI Term: ${selectedTerm?.en} - ${selectedTerm?.ar}`;
    if (navigator.share) {
      navigator.share({
        title: 'LexSense AI Dictionary',
        text: text,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        setShowCopied(true);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
    }
    setTimeout(() => setShowCopied(false), 2000);
  };

  // Helper to get term by ID
  const getTermById = (id: number) => (termsData.terms as Term[]).find(t => t.id === id);

  const popularDomains = [
    { label: 'LLM', tag: 'LLM' },
    { label: 'CV', tag: 'CV' },
    { label: 'NLP', tag: 'NLP' },
    { label: 'Ethics', tag: 'Ethics' },
    { label: 'Safety', tag: 'Safety' },
    { label: 'Math', tag: 'Math' }
  ];

  // Calculate Stats
  const stats = useMemo(() => {
    const terms = termsData.terms as Term[];
    const total = terms.length;
    const clear = terms.filter(t => t.translation_clarity === 'clear').length;
    const unclear = terms.filter(t => t.translation_clarity === 'unclear').length;
    const misleading = terms.filter(t => t.translation_clarity === 'misleading').length;

    return {
      clear: Math.round((clear / total) * 100) || 0,
      unclear: Math.round((unclear / total) * 100) || 0,
      misleading: Math.round((misleading / total) * 100) || 0
    };
  }, [termsData]);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <div className="logo">Lex<span>Sense</span></div>
        </div>
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder={t.search} 
            className="search-input"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mr-2">
            {(['en', 'ar', 'fr'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                  lang === l ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button 
            className="theme-toggle" 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content - Bento Grid */}
      <main className="main-content">
        {/* Graph Visualization Tile */}
        <div className="bento-tile graph-tile">
          <div className="tile-header" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <h3 className="tile-label">{t.knowledgeGraph}</h3>
            <p className="tile-title">{t.semanticRelationships}</p>
          </div>
          
          <div className="graph-container" ref={containerRef}>
            {hoverTooltip.show && (
              <div className="graph-tooltip" style={{ left: hoverTooltip.x, top: hoverTooltip.y }}>
                {hoverTooltip.text}
              </div>
            )}
          </div>

          <div className="graph-badges">
            <button 
              className="badge badge-blue hover:bg-blue-100 transition-colors cursor-pointer border-none"
              onClick={() => cyRef.current?.layout(layout).run()}
            >
              {t.resetLayout}
            </button>
            <span className="badge badge-slate">
             {elements.filter(e => !(e.data as any).source).length} {t.nodes}
             </span>
          </div>
        </div>

        {/* Term Detail Card */}
        {selectedTerm ? (
          <div className="bento-tile detail-tile">
            <div className="detail-header">
              <div className="flex gap-2 items-center">
                <div className={`clarity-badge clarity-${selectedTerm.translation_clarity} text-[10px] uppercase tracking-wider`}>
                  {selectedTerm.translation_clarity === 'clear' && '✅ ' + (lang === 'ar' ? 'معتمدة' : (lang === 'fr' ? 'Adopté' : 'Adopted'))}
                  {selectedTerm.translation_clarity === 'unclear' && '⚠️ ' + (lang === 'ar' ? 'قيد النقاش' : (lang === 'fr' ? 'Débat' : 'In Debate'))}
                  {selectedTerm.translation_clarity === 'misleading' && '🚨 ' + (lang === 'ar' ? 'مضللة' : (lang === 'fr' ? 'Trompeur' : 'Misleading'))}
                </div>
                <button 
                  onClick={handleShare}
                  className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors relative"
                  title={t.share}
                >
                  {showCopied ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
                  {showCopied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                      {t.copied}
                    </span>
                  )}
                </button>
              </div>
              <button 
                className="text-slate-500 hover:text-white p-1.5 rounded-full hover:bg-white/10" 
                onClick={() => setSelectedTerm(null)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <h2 className="term-title" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                {lang === 'ar' ? selectedTerm.ar : (lang === 'fr' ? selectedTerm.fr : selectedTerm.en)}
              </h2>
              <div className="translations-stack">
                {lang !== 'en' && <span className="opacity-70">🇬🇧 {selectedTerm.en}</span>}
                {lang !== 'fr' && <span className="opacity-70">🇫🇷 {selectedTerm.fr}</span>}
                {lang !== 'ar' && <span className="trans-ar" dir="rtl">🇸🇦 {selectedTerm.ar}</span>}
              </div>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <section dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <h4 className="section-label">{t.shortDefinition}</h4>
                <p className="text-sm font-medium text-blue-400 mb-2">
                  {lang === 'ar' ? (selectedTerm as any).short_definition_ar || selectedTerm.short_definition : 
                   lang === 'fr' ? (selectedTerm as any).short_definition_fr || selectedTerm.short_definition : 
                   selectedTerm.short_definition}
                </p>
                
                {selectedTerm.translation_clarity !== 'clear' && (
                  <div className={`mt-2 p-3 rounded-xl border ${selectedTerm.translation_clarity === 'misleading' ? 'bg-red-900/20 border-red-500/50 text-red-200' : 'bg-amber-900/20 border-amber-500/50 text-amber-200'} text-xs flex items-start gap-2`}>
                    <AlertTriangle size={16} className="shrink-0" />
                    <p>
                      {lang === 'ar' ? 
                        (selectedTerm.translation_clarity === 'misleading' ? 'تنبيه: الترجمة الحرفية لهذا المصطلح قد تؤدي لفهم خاطئ للسياق التقني.' : 'ملاحظة: هذا المصطلح يواجه تحديات في التعريب أو اختلاف في الاستخدام.') : 
                        (selectedTerm.translation_clarity === 'misleading' ? 'Warning: Literal translation may lead to technical misunderstanding.' : 'Note: This term has consensus challenges or usage variations.')
                      }
                    </p>
                  </div>
                )}

                <h4 className="section-label mt-6">{t.explanation}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {lang === 'ar' ? selectedTerm.explanation_ar : selectedTerm.explanation}
                </p>
              </section>

              {/* Smart Insights Section */}
              {(selectedTerm.cultural_notes || selectedTerm.cultural_notes_ar) && (
                <section dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/50">
                  <h4 className="section-label text-blue-300 mb-3 flex items-center gap-2">
                    <Layers size={14} />
                    {lang === 'ar' ? 'البعد الثقافي والاستخدام' : 'Cultural Context & Usage'}
                  </h4>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {lang === 'ar' ? selectedTerm.cultural_notes_ar : selectedTerm.cultural_notes}
                    </p>
                  </div>
                </section>
              )}

              {selectedTerm.related && selectedTerm.related.length > 0 && (
                <section dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  <h4 className="section-label">{t.relatedTerms}</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTerm.related.map(id => {
                      const related = getTermById(id);
                      if (!related) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => setSelectedTerm(related)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-blue-600 text-[11px] text-slate-300 hover:text-white rounded-lg border border-slate-700 hover:border-blue-500 transition-all cursor-pointer"
                        >
                          {lang === 'ar' ? related.ar : (lang === 'fr' ? related.fr : related.en)}
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          </div>
        ) : (
          <div className="detail-tile-empty" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <Info className="mb-4 opacity-20" size={48} />
            <p className="text-lg font-semibold">{t.selectTerm}</p>
            <p className="text-sm">{t.selectNode}</p>
          </div>
        )}

        {/* Statistics Tile */}
        <div className="bento-tile stats-tile" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
              <BookOpen size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.lexiconHealth}</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-[11px] font-medium text-green-400">{t.highConsensus}</span>
                <span className="text-xl font-bold text-white">{stats.clear}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${stats.clear}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-[11px] font-medium text-amber-400">{(t as any).needsSimplification}</span>
                <span className="text-xl font-bold text-white">{stats.unclear}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${stats.unclear}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-[11px] font-medium text-red-400">{(t as any).misleading}</span>
                <span className="text-xl font-bold text-white">{stats.misleading}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${stats.misleading}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Filter Tile */}
        <div className="bento-tile filter-tile" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
              <Filter size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.popularDomains}</span>
          </div>
          <div className="tag-cloud flex flex-wrap gap-2">
            {popularDomains.map((domain) => (
              <button
                key={domain.tag}
                onClick={() => setSearchQuery(searchQuery === domain.tag ? '' : domain.tag)}
                className={`tag px-3 py-1.5 text-[11px] font-bold rounded-full transition-all border ${
                  searchQuery === domain.tag 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-400'
                }`}
              >
                {domain.label}
              </button>
            ))}
            <button 
              className="tag px-3 py-1.5 text-[11px] font-bold rounded-full border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              onClick={() => setSearchQuery('')}
            >
              {t.allTerms}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
