/* ============================================
   Tree View Navigation - Slide-out Directory Browser
   Pure Extracts TX
   ============================================ */
(function () {
    'use strict';

    // Detect subdirectory prefix
    var path = window.location.pathname;
    var prefix = '';
    if (path.indexOf('/articles/') !== -1 || path.indexOf('/products/') !== -1 || path.indexOf('/classroom/') !== -1) {
        prefix = '../';
    }

    // Current page for active state
    var currentPage = path.split('/').pop() || 'index.html';

    // ============================================
    // Site directory tree structure
    // ============================================
    var TREE = [
        {
            label: 'Products',
            icon: 'beaker',
            children: [
                { label: 'Botanical Extracts', url: 'products/extracts.html' },
                { label: 'Tinctures', url: 'products/tinctures.html' },
                { label: 'Gummies', url: 'products/gummies.html' },
                { label: 'Live Plants', url: 'products/live-plants.html' }
            ]
        },
        {
            label: 'The Classroom',
            icon: 'book',
            children: [
                { label: 'Effects on the Body', url: 'classroom/effects.html' },
                { label: 'Growing & Harvesting', url: 'classroom/growing.html' },
                { label: 'Extraction Methods', url: 'classroom/extraction.html' },
                { label: 'Building Infrastructure', url: 'classroom/infrastructure.html' }
            ]
        },
        {
            label: 'Kratom',
            icon: 'leaf',
            cat: 'Kratom',
            children: [
                { label: 'Complete Kratom Guide', url: 'articles/complete-kratom-guide.html' },
                { label: 'Kratom Alkaloids', url: 'articles/kratom-alkaloids.html' },
                { label: 'Kratom Vein Colors', url: 'articles/kratom-vein-colors.html' }
            ]
        },
        {
            label: 'Kava',
            icon: 'leaf',
            cat: 'Kava',
            children: [
                { label: 'Kava Cultivation Guide', url: 'articles/kava-cultivation-guide.html' },
                { label: 'Kavalactones Explained', url: 'articles/kavalactones-explained.html' },
                { label: 'Traditional Kava Preparation', url: 'articles/traditional-kava-preparation.html' }
            ]
        },
        {
            label: 'Blue Lotus',
            icon: 'flower',
            cat: 'Blue Lotus',
            children: [
                { label: 'Blue Lotus Compounds', url: 'articles/blue-lotus-compounds.html' },
                { label: 'Blue Lotus in Ancient Egypt', url: 'articles/blue-lotus-ancient-egypt.html' },
                { label: 'Blue Lotus Cultivation', url: 'articles/egyptian-blue-lotus-cultivation-guide.html' }
            ]
        },
        {
            label: 'Cannabis',
            icon: 'leaf',
            cat: 'Cannabis',
            children: [
                { label: 'High-CBD Hemp Guide', url: 'articles/high-cbd-hemp-cultivation-guide.html' },
                { label: 'High-THC Cannabis Research', url: 'articles/high-thc-cannabis-research-guide.html' },
                { label: 'Industrial Hemp Guide', url: 'articles/industrial-hemp-cultivation-guide.html' }
            ]
        },
        {
            label: 'Texas Natives',
            icon: 'sun',
            cat: 'Texas Natives',
            children: [
                { label: 'Agarita', url: 'articles/agarita-cultivation-guide.html' },
                { label: 'Davis Mountains Yucca', url: 'articles/davis-mountain-yucca-cultivation-guide.html' },
                { label: 'Prickly Pear', url: 'articles/prickly-pear-cultivation-guide.html' },
                { label: 'Texas Persimmon', url: 'articles/texas-persimmon-cultivation-guide.html' },
                { label: 'Yaupon Holly', url: 'articles/yaupon-holly-cultivation-guide.html' }
            ]
        },
        {
            label: 'Cultivation Guides',
            icon: 'sprout',
            expanded: false,
            children: [
                { label: 'Absinthe Wormwood', url: 'articles/absinthe-wormwood-cultivation-guide.html' },
                { label: 'Bacopa Monnieri', url: 'articles/bacopa-monnieri-cultivation-guide.html' },
                { label: 'Blue Java Banana', url: 'articles/blue-java-banana-cultivation-guide.html' },
                { label: 'Dandelion', url: 'articles/dandelion-cultivation-guide.html' },
                { label: 'Deep Purple Carrot', url: 'articles/deep-purple-carrot-cultivation-guide.html' },
                { label: 'Detroit Red Beet', url: 'articles/detroit-red-beet-cultivation-guide.html' },
                { label: 'Dragon Fruit', url: 'articles/dragon-fruit-cultivation-guide.html' },
                { label: 'Duckweed', url: 'articles/duckweed-cultivation-guide.html' },
                { label: 'Elderberry', url: 'articles/elderberry-cultivation-guide.html' },
                { label: 'Ginger', url: 'articles/ginger-cultivation-guide.html' },
                { label: 'Hawaiian Baby Woodrose', url: 'articles/hawaiian-baby-woodrose-guide.html' },
                { label: 'Heavenly Blue Morning Glory', url: 'articles/heavenly-blue-morning-glory-guide.html' },
                { label: 'Heirloom Sugarcane', url: 'articles/heirloom-sugarcane-cultivation-guide.html' },
                { label: 'Heirloom Quinoa', url: 'articles/heirloom-quinoa-cultivation-guide.html' },
                { label: 'Jerusalem Artichoke', url: 'articles/jerusalem-artichoke-cultivation-guide.html' },
                { label: 'Kanna', url: 'articles/kanna-cultivation-guide.html' },
                { label: "Lion's Mane Mushroom", url: 'articles/lions-mane-cultivation-guide.html' },
                { label: 'Little Bluestem', url: 'articles/little-bluestem-cultivation-guide.html' },
                { label: 'Moringa', url: 'articles/moringa-cultivation-guide.html' },
                { label: 'Mullein', url: 'articles/mullein-cultivation-guide.html' },
                { label: 'Nemaguard Peach Rootstock', url: 'articles/nemaguard-peach-rootstock-guide.html' },
                { label: 'Passionflower', url: 'articles/passionflower-cultivation-guide.html' },
                { label: 'Pomegranate', url: 'articles/pomegranate-cultivation-guide.html' },
                { label: 'Purple Sweet Potato', url: 'articles/purple-sweet-potato-cultivation-guide.html' },
                { label: 'Red Spanish Pineapple', url: 'articles/red-spanish-pineapple-cultivation-guide.html' },
                { label: 'Redbor Kale', url: 'articles/redbor-kale-cultivation-guide.html' },
                { label: 'Roselle Hibiscus', url: 'articles/roselle-hibiscus-cultivation-guide.html' },
                { label: 'Russian Comfrey', url: 'articles/russian-comfrey-cultivation-guide.html' },
                { label: 'San Pedro Cactus', url: 'articles/san-pedro-cultivation-guide.html' },
                { label: 'San Saba Pecan', url: 'articles/san-saba-pecan-cultivation-guide.html' },
                { label: 'Santa Rosa Plum', url: 'articles/santa-rosa-plum-cultivation-guide.html' },
                { label: 'Sideoats Grama', url: 'articles/sideoats-grama-cultivation-guide.html' },
                { label: 'Subterranean Clover', url: 'articles/subterranean-clover-cultivation-guide.html' },
                { label: 'Switchgrass', url: 'articles/switchgrass-cultivation-guide.html' },
                { label: 'Thai Mint', url: 'articles/thai-mint-cultivation-guide.html' },
                { label: 'Tropea Onion', url: 'articles/tropea-onion-cultivation-guide.html' }
            ]
        },
        {
            label: 'Science & Safety',
            icon: 'flask',
            cat: 'Science',
            children: [
                { label: 'Extraction Methods Compared', url: 'articles/extraction-methods.html' },
                { label: 'How Adaptogens Work', url: 'articles/adaptogens-science.html' },
                { label: 'How to Read a COA', url: 'articles/how-to-read-coa.html' },
                { label: 'Pomegranate Monograph', url: 'articles/pomegranate-monograph.html' },
                { label: 'Responsible Dosing', url: 'articles/responsible-dosing.html' }
            ]
        },
        {
            label: 'Resources',
            icon: 'grid',
            children: [
                { label: 'Education & Research', url: 'blog.html' },
                { label: 'Research Library', url: 'research.html' },
                { label: 'Botanical Classes', url: 'classes.html' },
                { label: 'Interactive Lab', url: 'lab-2d.html' },
                { label: 'Ancient Garden Lab', url: 'ancient-lab.html' },
                { label: 'Infrastructure Consulting', url: 'consulting.html' },
                { label: 'Project Roadmap', url: 'roadmap.html' },
                { label: 'Contact Us', url: 'contact.html' }
            ]
        }
    ];

    // ============================================
    // SVG icon map
    // ============================================
    var ICONS = {
        beaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6v4l3 8H6l3-8V3z"/><path d="M6 15a3 3 0 003 3h6a3 3 0 003-3"/><path d="M12 18v3"/></svg>',
        book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>',
        leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 20h10"/><path d="M12 20v-8"/><path d="M12 12C12 8 8 5.5 4 6c0 4 2.5 6 8 6z"/><path d="M12 12c0-4 4-6.5 8-6 0 4-2.5 6-8 6z"/></svg>',
        flower: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93"/><path d="M17.5 6.5a4 4 0 012.83 6.83c-1.38 1.38-3.53 1.62-5.16.72"/><path d="M22 12a4 4 0 01-4 4c-1.95 0-3.58-1.4-3.93-3.25"/><path d="M17.5 17.5a4 4 0 01-6.83 2.83c-1.38-1.38-1.62-3.53-.72-5.16"/><path d="M12 22a4 4 0 01-4-4c0-1.95 1.4-3.58 3.25-3.93"/><path d="M6.5 17.5a4 4 0 01-2.83-6.83c1.38-1.38 3.53-1.62 5.16-.72"/><path d="M2 12a4 4 0 014-4c1.95 0 3.58 1.4 3.93 3.25"/><path d="M6.5 6.5A4 4 0 0113.33 3.67c1.38 1.38 1.62 3.53.72 5.16"/></svg>',
        sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
        sprout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22V12"/><path d="M12 12C12 7 7 4.5 2 5c0 5 3 7 10 7z"/><path d="M12 12c0-5 5-7.5 10-7 0 5-3 7-10 7z"/><path d="M12 12c0-4-2-7-5-9"/><path d="M12 12c0-4 2-7 5-9"/></svg>',
        flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v6.5L6 14a5 5 0 004.6 7h2.8a5 5 0 004.6-7l-4-5.5V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>',
        grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
        chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
        search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
        close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        sitemap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="6" height="4" rx="1"/><rect x="9" y="17" width="6" height="4" rx="1"/><rect x="17" y="10" width="6" height="4" rx="1"/><rect x="1" y="10" width="6" height="4" rx="1"/><path d="M6 7v3"/><path d="M12 17v-3H4v-4"/><path d="M12 14h8v-4"/></svg>',
        page: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'
    };

    // ============================================
    // Build DOM
    // ============================================

    // Inject trigger button into nav
    var navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;

    var trigger = document.createElement('button');
    trigger.className = 'tree-nav-trigger';
    trigger.setAttribute('aria-label', 'Browse site directory');
    trigger.setAttribute('title', 'Browse all pages');
    trigger.innerHTML = ICONS.sitemap;

    // Insert as first item after logo
    var navLogo = navContainer.querySelector('.nav-logo');
    if (navLogo && navLogo.nextSibling) {
        navContainer.insertBefore(trigger, navLogo.nextSibling);
    } else {
        navContainer.appendChild(trigger);
    }

    // Build overlay
    var overlay = document.createElement('div');
    overlay.className = 'tree-nav-overlay';
    overlay.id = 'treeNavOverlay';
    document.body.appendChild(overlay);

    // Build panel
    var panel = document.createElement('div');
    panel.className = 'tree-nav-panel';
    panel.id = 'treeNavPanel';
    panel.setAttribute('role', 'navigation');
    panel.setAttribute('aria-label', 'Site directory');

    panel.innerHTML =
        '<div class="tree-nav-header">' +
            '<span class="tree-nav-header-title">' + ICONS.sitemap + ' Site Directory</span>' +
            '<button class="tree-nav-close" aria-label="Close directory">' + ICONS.close + '</button>' +
        '</div>' +
        '<div class="tree-nav-search">' +
            '<div class="tree-nav-search-wrap">' +
                ICONS.search.replace('<svg', '<svg class="tree-nav-search-icon"') +
                '<input type="text" class="tree-nav-search-input" placeholder="Filter pages..." autocomplete="off" aria-label="Filter directory">' +
                '<button class="tree-nav-search-clear" aria-label="Clear search">' + ICONS.close + '</button>' +
            '</div>' +
        '</div>' +
        '<div class="tree-nav-search-info" id="treeNavSearchInfo"></div>' +
        '<div class="tree-nav-content" id="treeNavContent"></div>' +
        '<div class="tree-nav-no-results" id="treeNavNoResults">' +
            ICONS.search +
            '<p>No pages match your search</p>' +
        '</div>' +
        '<div class="tree-nav-footer">' +
            '<span>' + getTotalPages() + ' pages</span>' +
            '<a href="' + prefix + 'index.html">Home ' + ICONS.chevron + '</a>' +
        '</div>';

    document.body.appendChild(panel);

    // ============================================
    // Render tree
    // ============================================
    var content = document.getElementById('treeNavContent');
    renderTree(content, TREE);

    // ============================================
    // Event handlers
    // ============================================
    var searchInput = panel.querySelector('.tree-nav-search-input');
    var searchClear = panel.querySelector('.tree-nav-search-clear');
    var closeBtn = panel.querySelector('.tree-nav-close');
    var searchInfo = document.getElementById('treeNavSearchInfo');
    var noResults = document.getElementById('treeNavNoResults');

    // Open
    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        openPanel();
    });

    // Close
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    // Keyboard
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && panel.classList.contains('active')) {
            closePanel();
        }
    });

    // Search
    var searchDebounce;
    searchInput.addEventListener('input', function () {
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(function () {
            filterTree(searchInput.value.trim());
        }, 150);
    });

    searchClear.addEventListener('click', function () {
        searchInput.value = '';
        filterTree('');
        searchInput.focus();
    });

    // Branch toggle delegation
    content.addEventListener('click', function (e) {
        var toggle = e.target.closest('.tree-nav-branch-toggle');
        if (toggle) {
            var branch = toggle.parentElement;
            branch.classList.toggle('expanded');

            // Animate children height
            var children = branch.querySelector('.tree-nav-children');
            if (branch.classList.contains('expanded')) {
                children.style.maxHeight = children.scrollHeight + 'px';
                setTimeout(function () { children.style.maxHeight = '2000px'; }, 350);
            } else {
                children.style.maxHeight = children.scrollHeight + 'px';
                requestAnimationFrame(function () {
                    children.style.maxHeight = '0';
                });
            }
        }
    });

    // ============================================
    // Functions
    // ============================================
    function openPanel() {
        panel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Focus search after animation
        setTimeout(function () {
            searchInput.focus();
        }, 350);
    }

    function closePanel() {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function renderTree(container, tree) {
        var html = '';
        for (var i = 0; i < tree.length; i++) {
            html += renderBranch(tree[i]);
        }
        container.innerHTML = html;
    }

    function renderBranch(node) {
        var isExpanded = node.expanded !== false && hasActivePage(node);
        var expandedClass = isExpanded ? ' expanded' : '';
        var icon = ICONS[node.icon] || ICONS.page;
        var count = node.children ? node.children.length : 0;

        var html = '<div class="tree-nav-branch' + expandedClass + '" data-label="' + escHtml(node.label) + '">';
        html += '<button class="tree-nav-branch-toggle" aria-expanded="' + isExpanded + '">';
        html += '<span class="tree-nav-branch-chevron">' + ICONS.chevron + '</span>';
        html += '<span class="tree-nav-branch-icon">' + icon + '</span>';
        html += '<span class="tree-nav-branch-label">' + escHtml(node.label) + '</span>';
        html += '<span class="tree-nav-branch-count">' + count + '</span>';
        html += '</button>';
        html += '<div class="tree-nav-children"' + (isExpanded ? ' style="max-height:2000px"' : '') + '>';

        if (node.children) {
            for (var j = 0; j < node.children.length; j++) {
                var child = node.children[j];
                if (child.children) {
                    html += renderBranch(child);
                } else {
                    html += renderLeaf(child);
                }
            }
        }

        html += '</div></div>';
        return html;
    }

    function renderLeaf(node) {
        var url = prefix + node.url;
        var isActive = isCurrentPage(node.url);
        var activeClass = isActive ? ' active' : '';

        var html = '<a href="' + url + '" class="tree-nav-leaf' + activeClass + '" data-label="' + escHtml(node.label) + '" data-url="' + node.url + '">';
        html += '<span class="tree-nav-leaf-text">' + escHtml(node.label) + '</span>';
        html += '</a>';
        return html;
    }

    function hasActivePage(node) {
        if (node.url && isCurrentPage(node.url)) return true;
        if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
                if (hasActivePage(node.children[i])) return true;
            }
        }
        return false;
    }

    function isCurrentPage(url) {
        var pageName = url.split('/').pop();
        return currentPage === pageName;
    }

    function filterTree(query) {
        var leaves = content.querySelectorAll('.tree-nav-leaf');
        var branches = content.querySelectorAll('.tree-nav-branch');

        if (!query || query.length < 2) {
            // Reset
            panel.classList.remove('searching');
            searchClear.classList.remove('visible');
            searchInfo.classList.remove('visible');
            noResults.classList.remove('visible');
            content.style.display = '';

            // Restore labels
            for (var i = 0; i < leaves.length; i++) {
                leaves[i].classList.remove('search-match');
                var textEl = leaves[i].querySelector('.tree-nav-leaf-text');
                textEl.textContent = leaves[i].getAttribute('data-label');
            }
            for (var j = 0; j < branches.length; j++) {
                branches[j].classList.remove('search-match');
                var labelEl = branches[j].querySelector('.tree-nav-branch-label');
                if (labelEl) labelEl.textContent = branches[j].getAttribute('data-label');
            }

            if (query.length > 0) {
                searchClear.classList.add('visible');
            }
            return;
        }

        searchClear.classList.add('visible');
        panel.classList.add('searching');

        var q = query.toLowerCase();
        var matchCount = 0;

        // Reset all
        for (var k = 0; k < leaves.length; k++) {
            leaves[k].classList.remove('search-match');
        }
        for (var l = 0; l < branches.length; l++) {
            branches[l].classList.remove('search-match');
        }

        // Check leaves
        for (var m = 0; m < leaves.length; m++) {
            var label = leaves[m].getAttribute('data-label');
            if (label.toLowerCase().indexOf(q) !== -1) {
                leaves[m].classList.add('search-match');
                matchCount++;

                // Highlight match
                var textSpan = leaves[m].querySelector('.tree-nav-leaf-text');
                textSpan.innerHTML = highlightText(label, query);

                // Show parent branch
                var parentBranch = leaves[m].closest('.tree-nav-branch');
                if (parentBranch) {
                    parentBranch.classList.add('search-match');
                    // Also show grandparent if nested
                    var grandparent = parentBranch.parentElement.closest('.tree-nav-branch');
                    if (grandparent) grandparent.classList.add('search-match');
                }
            } else {
                var ts = leaves[m].querySelector('.tree-nav-leaf-text');
                ts.textContent = label;
            }
        }

        // Check branch labels too
        for (var n = 0; n < branches.length; n++) {
            var branchLabel = branches[n].getAttribute('data-label');
            var branchLabelEl = branches[n].querySelector('.tree-nav-branch-label');
            if (branchLabel.toLowerCase().indexOf(q) !== -1) {
                branches[n].classList.add('search-match');
                if (branchLabelEl) branchLabelEl.innerHTML = highlightText(branchLabel, query);
                // Show all children
                var childLeaves = branches[n].querySelectorAll('.tree-nav-leaf');
                for (var p = 0; p < childLeaves.length; p++) {
                    childLeaves[p].classList.add('search-match');
                    matchCount++;
                }
            } else {
                if (branchLabelEl) branchLabelEl.textContent = branchLabel;
            }
        }

        // Show/hide results
        if (matchCount > 0) {
            content.style.display = '';
            noResults.classList.remove('visible');
            searchInfo.textContent = matchCount + ' result' + (matchCount !== 1 ? 's' : '') + ' for "' + query + '"';
            searchInfo.classList.add('visible');
        } else {
            content.style.display = 'none';
            noResults.classList.add('visible');
            searchInfo.classList.remove('visible');
        }
    }

    function highlightText(text, query) {
        var idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return escHtml(text);
        return escHtml(text.substring(0, idx)) +
            '<span class="tree-nav-highlight">' + escHtml(text.substring(idx, idx + query.length)) + '</span>' +
            escHtml(text.substring(idx + query.length));
    }

    function getTotalPages() {
        var count = 0;
        function walk(nodes) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].children) walk(nodes[i].children);
                else count++;
            }
        }
        walk(TREE);
        return count;
    }

    function escHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

})();
