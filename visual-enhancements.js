/* ============================================
   Pure Extracts TX - Visual Enhancements
   Auto-injects hero banners, video sections,
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

    // Video recommendations by topic
    var videoSuggestions = {
        'kratom': [
            { title: 'Understanding Kratom Alkaloids', desc: 'Chemistry & pharmacology overview', category: 'Science' },
            { title: 'Kratom Cultivation Basics', desc: 'Growing Mitragyna speciosa', category: 'Growing' }
        ],
        'kava': [
            { title: 'Traditional Kava Preparation', desc: 'Pacific Island methods explained', category: 'Culture' },
            { title: 'Kavalactone Chemistry', desc: 'Active compounds deep dive', category: 'Science' }
        ],
        'ginger': [
            { title: 'Ginger Rhizome Propagation', desc: 'Step-by-step planting guide', category: 'Growing' },
            { title: 'Processing Fresh Ginger', desc: 'Drying, curing & extraction', category: 'Processing' }
        ],
        'cannabis': [
            { title: 'Hemp vs Cannabis: Key Differences', desc: 'Legal and botanical distinctions', category: 'Education' },
            { title: 'CBD Extraction Methods', desc: 'CO2, ethanol & oil extraction', category: 'Processing' }
        ],
        'mushroom': [
            { title: "Lion's Mane Cultivation", desc: 'Indoor growing techniques', category: 'Growing' },
            { title: 'Medicinal Mushroom Compounds', desc: 'Hericenones & erinacines', category: 'Science' }
        ],
        'default': [
            { title: 'Botanical Extraction 101', desc: 'Methods & best practices', category: 'Education' },
            { title: 'Sustainable Cultivation', desc: 'Organic growing principles', category: 'Growing' }
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

    // Detect video topic from title
    function detectVideoTopic() {
        var title = (document.title || '').toLowerCase();
        var topics = Object.keys(videoSuggestions);
        for (var i = 0; i < topics.length; i++) {
            if (topics[i] !== 'default' && title.indexOf(topics[i]) !== -1) {
                return topics[i];
            }
        }
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

    // Inject video recommendations
    function injectVideoSection() {
        var content = document.querySelector('.article-content');
        if (!content) return;

        var topic = detectVideoTopic();
        var videos = videoSuggestions[topic] || videoSuggestions['default'];

        var section = document.createElement('div');
        section.className = 'video-recommendations';

        var playIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><polygon points="9.545,15.568 15.818,12 9.545,8.432" fill="#fff"/></svg>';

        var html = '<h3>' + playIcon + ' Watch & Learn</h3>';
        html += '<p class="video-subtitle">Recommended educational videos related to this topic</p>';
        html += '<div class="video-grid">';

        for (var i = 0; i < videos.length; i++) {
            var v = videos[i];
            html += '<div class="video-card">';
            html += '<div class="video-card-thumb">';
            html += '<svg class="play-icon" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="rgba(220,38,38,0.85)"/><polygon points="19,14 19,34 36,24" fill="white"/></svg>';
            html += '</div>';
            html += '<div class="video-card-info">';
            html += '<h4>' + v.title + '</h4>';
            html += '<p>' + v.desc + ' &middot; ' + v.category + '</p>';
            html += '</div></div>';
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
        injectVideoSection();
        injectDividers();
    }
})();
