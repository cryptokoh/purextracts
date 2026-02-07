/* ============================================
   Pure Extracts TX - Global Site Search
   Self-injecting search overlay with client-side index
   ============================================ */

(function() {
    'use strict';

    // Detect if we're in a subdirectory
    var path = window.location.pathname;
    var prefix = '';
    if (path.indexOf('/articles/') !== -1 || path.indexOf('/products/') !== -1 || path.indexOf('/classroom/') !== -1) {
        prefix = '../';
    }

    // Search index
    var PAGES = [
        { title: "Home", url: "index.html", desc: "Premium botanical extracts from Texas Hill Country", cat: "Pages" },
        { title: "Plant Library & Articles", url: "blog.html", desc: "Comprehensive cultivation guides and botanical research", cat: "Pages" },
        { title: "The Classroom", url: "classroom.html", desc: "Free educational resources on botanical science", cat: "Pages" },
        { title: "Paid Classes", url: "classes.html", desc: "Professional botanical education courses", cat: "Pages" },
        { title: "Consulting Services", url: "consulting.html", desc: "Greenhouse design, irrigation, shipping containers, equipment", cat: "Pages" },
        { title: "Contact Us", url: "contact.html", desc: "Get in touch with Pure Extracts TX", cat: "Pages" },
        { title: "Research", url: "research.html", desc: "Scientific research and botanical studies", cat: "Pages" },
        { title: "Interactive Lab", url: "lab.html", desc: "3D botanical compound explorer", cat: "Pages" },
        { title: "Botanical Gummies", url: "products/gummies.html", desc: "Premium kratom, kava, and blue lotus gummies", cat: "Products" },
        { title: "Tinctures", url: "products/tinctures.html", desc: "Concentrated botanical tinctures and liquid extracts", cat: "Products" },
        { title: "Pure Extracts", url: "products/extracts.html", desc: "Lab-tested concentrated botanical extracts", cat: "Products" },
        { title: "Live Plants", url: "products/live-plants.html", desc: "Ethnobotanical live plants and starter kits", cat: "Products" },
        { title: "Complete Kratom Guide", url: "articles/complete-kratom-guide.html", desc: "Comprehensive guide to kratom varieties and usage", cat: "Kratom" },
        { title: "Kratom Alkaloids", url: "articles/kratom-alkaloids.html", desc: "The science behind kratom's active compounds", cat: "Kratom" },
        { title: "Kratom Vein Colors", url: "articles/kratom-vein-colors.html", desc: "Understanding red, green, and white kratom", cat: "Kratom" },
        { title: "Kavalactones Explained", url: "articles/kavalactones-explained.html", desc: "Deep dive into kava's active compounds", cat: "Kava" },
        { title: "Traditional Kava Preparation", url: "articles/traditional-kava-preparation.html", desc: "Authentic methods of kava preparation", cat: "Kava" },
        { title: "Blue Lotus in Ancient Egypt", url: "articles/blue-lotus-ancient-egypt.html", desc: "Historical use of blue lotus", cat: "Blue Lotus" },
        { title: "Blue Lotus Compounds", url: "articles/blue-lotus-compounds.html", desc: "Active compounds in Nymphaea caerulea", cat: "Blue Lotus" },
        { title: "Extraction Methods", url: "articles/extraction-methods.html", desc: "Guide to botanical extraction techniques", cat: "Science" },
        { title: "Adaptogens Science", url: "articles/adaptogens-science.html", desc: "The science of adaptogenic herbs", cat: "Science" },
        { title: "Responsible Dosing", url: "articles/responsible-dosing.html", desc: "Safe dosing guidelines for botanicals", cat: "Science" },
        { title: "How to Read a COA", url: "articles/how-to-read-coa.html", desc: "Understanding certificates of analysis", cat: "Science" },
        { title: "Elderberry Cultivation", url: "articles/elderberry-cultivation-guide.html", desc: "Growing and processing elderberry", cat: "Guides" },
        { title: "Pomegranate Cultivation", url: "articles/pomegranate-cultivation-guide.html", desc: "Advanced pomegranate growing guide", cat: "Guides" },
        { title: "Ginger Cultivation", url: "articles/ginger-cultivation-guide.html", desc: "Growing ginger in various climates", cat: "Guides" },
        { title: "Moringa Cultivation", url: "articles/moringa-cultivation-guide.html", desc: "The miracle tree growing guide", cat: "Guides" },
        { title: "Dandelion Cultivation", url: "articles/dandelion-cultivation-guide.html", desc: "Medicinal dandelion growing", cat: "Guides" },
        { title: "Thai Mint Cultivation", url: "articles/thai-mint-cultivation-guide.html", desc: "Growing Mentha cordifolia", cat: "Guides" },
        { title: "Jerusalem Artichoke", url: "articles/jerusalem-artichoke-cultivation-guide.html", desc: "Sunchoke growing and processing", cat: "Guides" },
        { title: "Purple Sweet Potato", url: "articles/purple-sweet-potato-cultivation-guide.html", desc: "Growing Okinawan purple sweet potatoes", cat: "Guides" },
        { title: "Detroit Red Beet", url: "articles/detroit-red-beet-cultivation-guide.html", desc: "Classic beet cultivation guide", cat: "Guides" },
        { title: "Deep Purple Carrot", url: "articles/deep-purple-carrot-cultivation-guide.html", desc: "Anthocyanin-rich carrot growing", cat: "Guides" },
        { title: "Tropea Onion", url: "articles/tropea-onion-cultivation-guide.html", desc: "Italian red onion cultivation", cat: "Guides" },
        { title: "Redbor Kale", url: "articles/redbor-kale-cultivation-guide.html", desc: "Purple ornamental kale growing", cat: "Guides" },
        { title: "Heirloom Quinoa", url: "articles/heirloom-quinoa-cultivation-guide.html", desc: "Growing quinoa in warm climates", cat: "Guides" },
        { title: "Heirloom Sugarcane", url: "articles/heirloom-sugarcane-cultivation-guide.html", desc: "Giant sugarcane cultivation", cat: "Guides" },
        { title: "Duckweed Cultivation", url: "articles/duckweed-cultivation-guide.html", desc: "Aquatic superfood production", cat: "Guides" },
        { title: "Bacopa Monnieri", url: "articles/bacopa-monnieri-cultivation-guide.html", desc: "Brahmi herb growing guide", cat: "Guides" },
        { title: "Dragon Fruit", url: "articles/dragon-fruit-cultivation-guide.html", desc: "Pitaya cultivation in Texas", cat: "Guides" },
        { title: "Passionflower", url: "articles/passionflower-cultivation-guide.html", desc: "Passiflora growing and uses", cat: "Guides" },
        { title: "Roselle Hibiscus", url: "articles/roselle-hibiscus-cultivation-guide.html", desc: "Hibiscus sabdariffa cultivation", cat: "Guides" },
        { title: "Red Spanish Pineapple", url: "articles/red-spanish-pineapple-cultivation-guide.html", desc: "Heirloom pineapple growing", cat: "Guides" },
        { title: "Santa Rosa Plum", url: "articles/santa-rosa-plum-cultivation-guide.html", desc: "Japanese plum cultivation", cat: "Guides" },
        { title: "San Saba Pecan", url: "articles/san-saba-pecan-cultivation-guide.html", desc: "Heritage pecan tree guide", cat: "Guides" },
        { title: "Blue Java Banana", url: "articles/blue-java-banana-cultivation-guide.html", desc: "Ice cream banana growing", cat: "Guides" },
        { title: "Prickly Pear", url: "articles/prickly-pear-cultivation-guide.html", desc: "Opuntia cactus cultivation", cat: "Texas Natives" },
        { title: "Agarita Bush", url: "articles/agarita-cultivation-guide.html", desc: "Mahonia trifoliolata cultivation", cat: "Texas Natives" },
        { title: "Texas Persimmon", url: "articles/texas-persimmon-cultivation-guide.html", desc: "Diospyros texana guide", cat: "Texas Natives" },
        { title: "Yaupon Holly", url: "articles/yaupon-holly-cultivation-guide.html", desc: "America's native caffeine plant", cat: "Texas Natives" },
        { title: "Davis Mountain Yucca", url: "articles/davis-mountain-yucca-cultivation-guide.html", desc: "Yucca pallida growing guide", cat: "Texas Natives" },
        { title: "Egyptian Blue Lotus", url: "articles/egyptian-blue-lotus-cultivation-guide.html", desc: "Growing sacred Nymphaea caerulea", cat: "Guides" },
        { title: "Kanna Cultivation", url: "articles/kanna-cultivation-guide.html", desc: "Sceletium tortuosum growing", cat: "Guides" },
        { title: "Kava Cultivation", url: "articles/kava-cultivation-guide.html", desc: "Piper methysticum growing guide", cat: "Guides" },
        { title: "San Pedro Cactus", url: "articles/san-pedro-cultivation-guide.html", desc: "Echinopsis pachanoi cultivation", cat: "Guides" },
        { title: "Absinthe Wormwood", url: "articles/absinthe-wormwood-cultivation-guide.html", desc: "Artemisia absinthium guide", cat: "Guides" },
        { title: "Morning Glory", url: "articles/heavenly-blue-morning-glory-guide.html", desc: "Ipomoea tricolor ornamental vine", cat: "Guides" },
        { title: "Hawaiian Baby Woodrose", url: "articles/hawaiian-baby-woodrose-guide.html", desc: "Argyreia nervosa growing guide", cat: "Guides" },
        { title: "Russian Comfrey", url: "articles/russian-comfrey-cultivation-guide.html", desc: "Symphytum x uplandicum uses", cat: "Guides" },
        { title: "Mullein", url: "articles/mullein-cultivation-guide.html", desc: "Verbascum thapsus medicinal herb", cat: "Guides" },
        { title: "Switchgrass", url: "articles/switchgrass-cultivation-guide.html", desc: "Panicum virgatum prairie grass", cat: "Guides" },
        { title: "Little Bluestem", url: "articles/little-bluestem-cultivation-guide.html", desc: "Native ornamental grass guide", cat: "Guides" },
        { title: "Sideoats Grama", url: "articles/sideoats-grama-cultivation-guide.html", desc: "Texas state grass cultivation", cat: "Guides" },
        { title: "Subterranean Clover", url: "articles/subterranean-clover-cultivation-guide.html", desc: "Self-seeding cover crop", cat: "Guides" },
        { title: "Nemaguard Peach Rootstock", url: "articles/nemaguard-peach-rootstock-guide.html", desc: "Nematode-resistant rootstock", cat: "Guides" },
        { title: "Lion's Mane Mushroom", url: "articles/lions-mane-cultivation-guide.html", desc: "Hericium erinaceus cultivation", cat: "Guides" },
        { title: "High-THC Cannabis Research", url: "articles/high-thc-cannabis-research-guide.html", desc: "Cannabis sativa research guide", cat: "Cannabis" },
        { title: "High-CBD Hemp", url: "articles/high-cbd-hemp-cultivation-guide.html", desc: "CBD hemp cultivation guide", cat: "Cannabis" },
        { title: "Industrial Hemp", url: "articles/industrial-hemp-cultivation-guide.html", desc: "Fiber and grain hemp growing", cat: "Cannabis" },
        { title: "Pomegranate Monograph", url: "articles/pomegranate-monograph.html", desc: "Scientific monograph on pomegranate", cat: "Science" }
    ];

    // Category colors
    var CAT_COLORS = {
        'Pages': '#6b7280', 'Products': '#0d9488', 'Kratom': '#16a34a',
        'Kava': '#7c3aed', 'Blue Lotus': '#2563eb', 'Science': '#dc2626',
        'Guides': '#059669', 'Texas Natives': '#b45309', 'Cannabis': '#65a30d'
    };

    // Build search overlay HTML
    var overlayHTML = '<div class="site-search-overlay" id="siteSearchOverlay">' +
        '<div class="site-search-container">' +
        '<div class="site-search-header">' +
        '<div class="site-search-input-wrap">' +
        '<svg class="site-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
        '<input type="text" class="site-search-input" id="siteSearchInput" placeholder="Search articles, guides, products..." autocomplete="off">' +
        '<button class="site-search-close" id="siteSearchClose" aria-label="Close search">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button></div></div>' +
        '<div class="site-search-results" id="siteSearchResults">' +
        '<div class="site-search-empty">Type to search across all pages and articles</div>' +
        '</div></div></div>';

    // Inject overlay
    var overlayContainer = document.createElement('div');
    overlayContainer.innerHTML = overlayHTML;
    document.body.appendChild(overlayContainer.firstChild);

    // Inject search trigger button into nav
    var navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        var trigger = document.createElement('button');
        trigger.className = 'site-search-trigger';
        trigger.setAttribute('aria-label', 'Search site');
        trigger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

        var mobileToggle = navContainer.querySelector('.nav-mobile-toggle');
        if (mobileToggle) {
            navContainer.insertBefore(trigger, mobileToggle);
        } else {
            navContainer.appendChild(trigger);
        }

        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            openSearch();
        });
    }

    var overlay = document.getElementById('siteSearchOverlay');
    var input = document.getElementById('siteSearchInput');
    var results = document.getElementById('siteSearchResults');
    var closeBtn = document.getElementById('siteSearchClose');

    function openSearch() {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        setTimeout(function() { input.focus(); }, 100);
    }

    function closeSearch() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        input.value = '';
        results.innerHTML = '<div class="site-search-empty">Type to search across all pages and articles</div>';
    }

    closeBtn.addEventListener('click', closeSearch);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeSearch();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            closeSearch();
        }
        // Ctrl+K or Cmd+K to open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (overlay.classList.contains('open')) {
                closeSearch();
            } else {
                openSearch();
            }
        }
    });

    // Search logic
    function search(query) {
        if (!query || query.length < 2) {
            results.innerHTML = '<div class="site-search-empty">Type to search across all pages and articles</div>';
            return;
        }

        var q = query.toLowerCase();
        var scored = [];

        for (var i = 0; i < PAGES.length; i++) {
            var page = PAGES[i];
            var score = 0;
            var titleLower = page.title.toLowerCase();
            var descLower = page.desc.toLowerCase();
            var catLower = page.cat.toLowerCase();

            // Exact title match
            if (titleLower === q) score += 100;
            // Title starts with query
            else if (titleLower.indexOf(q) === 0) score += 80;
            // Title contains query
            else if (titleLower.indexOf(q) !== -1) score += 60;
            // Category match
            if (catLower.indexOf(q) !== -1) score += 30;
            // Description match
            if (descLower.indexOf(q) !== -1) score += 20;

            // Word-level matching
            var words = q.split(/\s+/);
            for (var w = 0; w < words.length; w++) {
                if (words[w].length >= 2) {
                    if (titleLower.indexOf(words[w]) !== -1) score += 15;
                    if (descLower.indexOf(words[w]) !== -1) score += 8;
                    if (catLower.indexOf(words[w]) !== -1) score += 10;
                }
            }

            if (score > 0) {
                scored.push({ page: page, score: score });
            }
        }

        scored.sort(function(a, b) { return b.score - a.score; });
        var top = scored.slice(0, 10);

        if (top.length === 0) {
            results.innerHTML = '<div class="site-search-empty">No results found for "' + escapeHtml(query) + '"</div>';
            return;
        }

        var html = '';
        for (var j = 0; j < top.length; j++) {
            var p = top[j].page;
            var url = prefix + p.url;
            var color = CAT_COLORS[p.cat] || '#6b7280';
            var highlightedTitle = highlight(p.title, q);
            var highlightedDesc = highlight(p.desc, q);

            html += '<a href="' + url + '" class="site-search-result">' +
                '<div class="site-search-result-header">' +
                '<span class="site-search-result-title">' + highlightedTitle + '</span>' +
                '<span class="site-search-cat-badge" style="background:' + color + '">' + escapeHtml(p.cat) + '</span>' +
                '</div>' +
                '<p class="site-search-result-desc">' + highlightedDesc + '</p>' +
                '</a>';
        }

        results.innerHTML = html;
    }

    function highlight(text, query) {
        var escaped = escapeHtml(text);
        var q = query.toLowerCase();
        var idx = text.toLowerCase().indexOf(q);
        if (idx === -1) return escaped;
        var before = escapeHtml(text.substring(0, idx));
        var match = escapeHtml(text.substring(idx, idx + query.length));
        var after = escapeHtml(text.substring(idx + query.length));
        return before + '<mark>' + match + '</mark>' + after;
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    var debounceTimer;
    input.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
            search(input.value.trim());
        }, 150);
    });
})();
