/* ============================================
   Pure Extracts TX - Visual Enhancements
   Auto-injects hero banners, related content links,
   and decorative elements into articles
   ============================================ */

(function() {
    'use strict';

    // Category detection from article content
    var categoryMap = {
        'cultivation': ['cultivation', 'growing', 'harvest', 'propagation', 'soil', 'planting'],
        'ethnobotanical': ['ethnobotanical', 'traditional', 'ceremonial', 'ancient', 'sacred', 'ritual'],
        'science': ['alkaloid', 'compound', 'chemistry', 'research', 'pharmacology', 'analysis'],
        'guides': ['guide', 'preparation', 'dosing', 'extraction', 'method'],
        'hemp': ['hemp', 'cannabis', 'cbd', 'thc'],
        'grass': ['grass', 'bluestem', 'switchgrass', 'grama', 'clover', 'duckweed', 'comfrey'],
        'fruit': ['banana', 'plum', 'peach', 'pineapple', 'dragon fruit', 'pomegranate', 'persimmon', 'sugarcane'],
        'vegetable': ['beet', 'carrot', 'kale', 'onion', 'potato', 'quinoa', 'artichoke']
    };

    // SVG illustrations by category
    var illustrations = {
        cultivation: '<svg viewBox="0 0 160 160"><path d="M80 140c0 0-60-30-60-80C20 30 80 10 80 10s60 20 60 50c0 50-60 80-60 80z" fill="currentColor" opacity="0.3"/><path d="M80 130c0 0-40-25-40-60c0-25 40-40 40-40s40 15 40 40c0 35-40 60-40 60z" fill="currentColor" opacity="0.5"/><path d="M80 120c0 0-20-15-20-40c0-15 20-25 20-25s20 10 20 25c0 25-20 40-20 40z" fill="currentColor" opacity="0.7"/><line x1="80" y1="60" x2="80" y2="150" stroke="currentColor" stroke-width="3" opacity="0.4"/></svg>',
        ethnobotanical: '<svg viewBox="0 0 160 160"><circle cx="80" cy="80" r="60" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3"/><circle cx="80" cy="80" r="40" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"/><circle cx="80" cy="80" r="20" fill="currentColor" opacity="0.3"/><path d="M80 20v120M20 80h120M38 38l84 84M122 38l-84 84" stroke="currentColor" stroke-width="1.5" opacity="0.2"/></svg>',
        science: '<svg viewBox="0 0 160 160"><path d="M60 20h40v40l25 50c5 10-2 20-12 20H47c-10 0-17-10-12-20l25-50V20z" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="2"/><rect x="55" y="12" width="50" height="12" rx="4" fill="currentColor" opacity="0.3"/><circle cx="75" cy="100" r="8" fill="currentColor" opacity="0.4"/><circle cx="95" cy="110" r="5" fill="currentColor" opacity="0.3"/><circle cx="80" cy="115" r="6" fill="currentColor" opacity="0.35"/></svg>',
        guides: '<svg viewBox="0 0 160 160"><rect x="30" y="20" width="100" height="120" rx="8" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="2"/><line x1="50" y1="50" x2="120" y2="50" stroke="currentColor" stroke-width="2" opacity="0.3"/><line x1="50" y1="70" x2="110" y2="70" stroke="currentColor" stroke-width="2" opacity="0.3"/><line x1="50" y1="90" x2="115" y2="90" stroke="currentColor" stroke-width="2" opacity="0.3"/><line x1="50" y1="110" x2="100" y2="110" stroke="currentColor" stroke-width="2" opacity="0.3"/><path d="M40 20l-5 8v112l5 8" fill="currentColor" opacity="0.1"/></svg>',
        hemp: '<svg viewBox="0 0 160 160"><path d="M80 20c-15 20-10 40 0 50c-20-5-35 5-40 25c10-15 25-15 40-5c-15 10-20 30-15 50c5-20 15-35 15-35s10 15 15 35c5-20 0-40-15-50c15-10 30-10 40 5c-5-20-20-30-40-25c10-10 15-30 0-50z" fill="currentColor" opacity="0.3"/></svg>',
        grass: '<svg viewBox="0 0 160 160"><path d="M40 140c0-40 10-80 15-100" stroke="currentColor" stroke-width="3" fill="none" opacity="0.3"/><path d="M60 140c0-35 5-70 10-90" stroke="currentColor" stroke-width="3" fill="none" opacity="0.4"/><path d="M80 140c0-30 0-60 0-95" stroke="currentColor" stroke-width="3" fill="none" opacity="0.5"/><path d="M100 140c0-35-5-70-10-90" stroke="currentColor" stroke-width="3" fill="none" opacity="0.4"/><path d="M120 140c0-40-10-80-15-100" stroke="currentColor" stroke-width="3" fill="none" opacity="0.3"/><path d="M55 60c10 5 20 0 25-10" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/><path d="M85 50c-5 10 0 20 15 25" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/></svg>',
        fruit: '<svg viewBox="0 0 160 160"><circle cx="80" cy="85" r="45" fill="currentColor" opacity="0.2"/><circle cx="80" cy="85" r="35" fill="currentColor" opacity="0.15"/><path d="M80 40c-5-15 5-25 15-30c-5 10 0 20 5 25" fill="currentColor" opacity="0.4"/><path d="M75 42c-10-10-5-25 0-30c0 10 5 18 10 22" fill="currentColor" opacity="0.3"/></svg>',
        vegetable: '<svg viewBox="0 0 160 160"><ellipse cx="80" cy="90" rx="35" ry="50" fill="currentColor" opacity="0.2"/><ellipse cx="80" cy="90" rx="25" ry="40" fill="currentColor" opacity="0.15"/><path d="M65 45c5-15 25-15 30 0" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/><line x1="80" y1="50" x2="80" y2="130" stroke="currentColor" stroke-width="1.5" opacity="0.2"/></svg>'
    };

    // Related classroom/research content by topic
    var relatedContent = {
        'kratom': [
            { title: 'Effects on the Human Body', desc: 'How alkaloids interact with neurotransmitters and organ systems', href: '../classroom/effects.html' },
            { title: 'Growing & Harvesting Plants', desc: 'Cultivation techniques for trees and woody botanicals', href: '../classroom/growing.html' }
        ],
        'kava': [
            { title: 'Growing & Harvesting Plants', desc: 'Shrub cultivation, root development, and harvest timing', href: '../classroom/growing.html' },
            { title: 'Extracting Plants & Making Products', desc: 'Water-based extractions and carrier methods', href: '../classroom/extraction.html' }
        ],
        'extraction': [
            { title: 'Extracting Plants & Making Products', desc: 'Solventless, ethanol, CO2, chromatography, and distillation', href: '../classroom/extraction.html' },
            { title: 'Building Infrastructure & Equipment', desc: 'Lab setup and equipment for extraction processes', href: '../classroom/infrastructure.html' }
        ],
        'cultivation': [
            { title: 'Growing & Harvesting Plants', desc: 'From seed to harvest across every plant type', href: '../classroom/growing.html' },
            { title: 'Building Infrastructure & Equipment', desc: 'Greenhouses, irrigation, indoor grow rooms', href: '../classroom/infrastructure.html' }
        ],
        'mushroom': [
            { title: 'Growing & Harvesting Plants', desc: 'Fungi cultivation, substrate preparation, and fruiting conditions', href: '../classroom/growing.html' },
            { title: 'Extracting Plants & Making Products', desc: 'Processing methods for medicinal mushroom compounds', href: '../classroom/extraction.html' }
        ],
        'default': [
            { title: 'The Botanical Classroom', desc: 'Interactive learning experiences across all topics', href: '../classroom.html' },
            { title: 'Research Library', desc: 'All classroom content in readable article format', href: '../research.html' }
        ]
    };

    // Only run on article pages
    var isArticlePage = window.location.pathname.indexOf('/articles/') !== -1;
    if (!isArticlePage) return;

    // Detect category from page title and content
    function detectCategory() {
        var title = (document.title || '').toLowerCase();
        var tagEl = document.querySelector('.article-category-tag');
        var tag = tagEl ? tagEl.textContent.toLowerCase() : '';

        // Check tag first
        if (tag.indexOf('cultivation') !== -1 || tag.indexOf('guide') !== -1) {
            // Refine based on title content
            for (var cat in categoryMap) {
                if (cat === 'cultivation' || cat === 'guides') continue;
                var keywords = categoryMap[cat];
                for (var i = 0; i < keywords.length; i++) {
                    if (title.indexOf(keywords[i]) !== -1) return cat;
                }
            }
            return 'cultivation';
        }
        if (tag.indexOf('science') !== -1 || tag.indexOf('research') !== -1) return 'science';
        if (tag.indexOf('ethnobotanical') !== -1) return 'ethnobotanical';

        // Fallback: check title keywords
        for (var c in categoryMap) {
            var kws = categoryMap[c];
            for (var j = 0; j < kws.length; j++) {
                if (title.indexOf(kws[j]) !== -1) return c;
            }
        }
        return 'cultivation';
    }

    // Detect content topic from title
    function detectContentTopic() {
        var title = (document.title || '').toLowerCase();
        var topics = Object.keys(relatedContent);
        for (var i = 0; i < topics.length; i++) {
            if (topics[i] !== 'default' && title.indexOf(topics[i]) !== -1) {
                return topics[i];
            }
        }
        // Check category-based fallbacks
        var category = detectCategory();
        if (category === 'science' || category === 'guides') return 'extraction';
        if (category === 'cultivation' || category === 'grass' || category === 'fruit' || category === 'vegetable') return 'cultivation';
        return 'default';
    }

    // Inject hero banner
    function injectHeroBanner() {
        var header = document.querySelector('.article-header');
        if (!header) return;

        var category = detectCategory();
        var banner = document.createElement('div');
        banner.className = 'article-hero-banner';
        banner.setAttribute('data-category', category);

        var illDiv = document.createElement('div');
        illDiv.className = 'hero-illustration';
        illDiv.innerHTML = illustrations[category] || illustrations.cultivation;
        banner.appendChild(illDiv);

        header.insertBefore(banner, header.firstChild);
    }

    // Inject related classroom content links
    function injectRelatedContent() {
        var content = document.querySelector('.article-content');
        if (!content) return;

        var topic = detectContentTopic();
        var links = relatedContent[topic] || relatedContent['default'];

        var section = document.createElement('div');
        section.className = 'related-content-section';

        var bookIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>';
        var arrowIcon = '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';

        var html = '<h3>' + bookIcon + ' Continue Learning</h3>';
        html += '<p class="related-subtitle">Explore these topics in depth in our interactive classroom</p>';
        html += '<div class="related-grid">';

        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            html += '<a href="' + link.href + '" class="related-card">';
            html += '<div class="related-card-body">';
            html += '<h4>' + link.title + '</h4>';
            html += '<p>' + link.desc + '</p>';
            html += '</div>';
            html += '<span class="related-card-arrow">' + arrowIcon + '</span>';
            html += '</a>';
        }

        html += '</div>';
        section.innerHTML = html;
        content.appendChild(section);
    }

    // Inject decorative dividers between h2 sections
    function injectDividers() {
        var content = document.querySelector('.article-content');
        if (!content) return;

        var headings = content.querySelectorAll('h2');
        var leafSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity="0.3"/><path d="M17 8c-4 0-7 3-7 7"/><path d="M17 8c0 4-3 7-7 7"/></svg>';

        // Add dividers after every 3rd h2 (to avoid cluttering)
        for (var i = 2; i < headings.length; i += 3) {
            var divider = document.createElement('div');
            divider.className = 'section-divider';
            divider.innerHTML = leafSvg;
            headings[i].parentNode.insertBefore(divider, headings[i]);
        }
    }

    // Run enhancements after DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        injectHeroBanner();
        injectRelatedContent();
        injectDividers();
    }
})();
