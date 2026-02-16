/* ============================================
   Content Carousel - Reusable Carousel Engine
   Pure Extracts TX
   ============================================ */
(function () {
    'use strict';

    // Detect subdirectory
    var path = window.location.pathname;
    var prefix = '';
    if (path.indexOf('/articles/') !== -1 || path.indexOf('/products/') !== -1 || path.indexOf('/classroom/') !== -1) {
        prefix = '../';
    }

    var currentPage = path.split('/').pop() || 'index.html';

    // ============================================
    // SVG Icons
    // ============================================
    var ARROW_LEFT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>';
    var ARROW_RIGHT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>';
    var ARROW_SM = '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>';

    // Product icons (reused from product cards)
    var PRODUCT_ICONS = {
        gummies: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="5"/><circle cx="16" cy="16" r="5"/><circle cx="16" cy="8" r="3"/><circle cx="8" cy="16" r="3"/></svg>',
        tinctures: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v6.5L6 14a5 5 0 004.6 7h2.8a5 5 0 004.6-7l-4-5.5V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>',
        extracts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6v4l3 8H6l3-8V3z"/><path d="M6 15a3 3 0 003 3h6a3 3 0 003-3"/><path d="M12 18v3"/></svg>',
        'live-plants': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 20h10"/><path d="M12 20v-8"/><path d="M12 12C12 8 8 5.5 4 6c0 4 2.5 6 8 6z"/><path d="M12 12c0-4 4-6.5 8-6 0 4-2.5 6-8 6z"/></svg>',
        book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>',
        flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v6.5L6 14a5 5 0 004.6 7h2.8a5 5 0 004.6-7l-4-5.5V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>',
        leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 20h10"/><path d="M12 20v-8"/><path d="M12 12C12 8 8 5.5 4 6c0 4 2.5 6 8 6z"/><path d="M12 12c0-4 4-6.5 8-6 0 4-2.5 6-8 6z"/></svg>'
    };

    // Category colors
    var CAT_COLORS = {
        'Products': '#0d9488', 'Kratom': '#16a34a', 'Kava': '#7c3aed',
        'Blue Lotus': '#2563eb', 'Science': '#dc2626', 'Guides': '#059669',
        'Texas Natives': '#b45309', 'Cannabis': '#65a30d', 'Classroom': '#8b5cf6',
        'Pages': '#6b7280'
    };

    // ============================================
    // Content Data
    // ============================================

    // Products data
    var PRODUCTS = [
        { title: 'Botanical Extracts', desc: 'Concentrated extracts using advanced CO2 and solventless methods.', url: 'products/extracts.html', icon: 'extracts', cat: 'Products' },
        { title: 'Tinctures', desc: 'Full-spectrum liquid extracts with rapid absorption.', url: 'products/tinctures.html', icon: 'tinctures', cat: 'Products' },
        { title: 'Gummies', desc: 'Precisely dosed botanical gummies for daily wellness.', url: 'products/gummies.html', icon: 'gummies', cat: 'Products' },
        { title: 'Live Plants', desc: 'Ethically sourced live specimens for cultivation and research.', url: 'products/live-plants.html', icon: 'live-plants', cat: 'Products' }
    ];

    // Education/classroom content
    var CLASSROOM = [
        { title: 'Effects on the Body', desc: 'How botanical compounds interact with human neurotransmitter pathways.', url: 'classroom/effects.html', cat: 'Classroom' },
        { title: 'Growing & Harvesting', desc: 'From seed to harvest - learn every plant type.', url: 'classroom/growing.html', cat: 'Classroom' },
        { title: 'Extraction Methods', desc: 'Solventless, ethanol, CO2, and chromatography techniques.', url: 'classroom/extraction.html', cat: 'Classroom' },
        { title: 'Building Infrastructure', desc: 'Greenhouses, irrigation, aquaponics, and processing facilities.', url: 'classroom/infrastructure.html', cat: 'Classroom' }
    ];

    // Featured articles
    var ARTICLES = [
        { title: 'The Complete Guide to Kratom', desc: 'Everything about Mitragyna speciosa from traditional use to modern science.', url: 'articles/complete-kratom-guide.html', cat: 'Kratom' },
        { title: 'Kavalactones Explained', desc: 'How the six major kavalactones create kava\'s calming effects.', url: 'articles/kavalactones-explained.html', cat: 'Kava' },
        { title: 'Blue Lotus Compounds', desc: 'The alkaloids responsible for blue lotus effects.', url: 'articles/blue-lotus-compounds.html', cat: 'Blue Lotus' },
        { title: 'Extraction Methods Compared', desc: 'CO2 vs ethanol vs water - impact on alkaloid profiles.', url: 'articles/extraction-methods.html', cat: 'Science' },
        { title: 'How Adaptogens Work', desc: 'The science of stress response and adaptogenic botanicals.', url: 'articles/adaptogens-science.html', cat: 'Science' },
        { title: 'Responsible Dosing', desc: 'Start low, go slow - best practices for botanical products.', url: 'articles/responsible-dosing.html', cat: 'Science' },
        { title: 'Understanding Kratom Alkaloids', desc: 'Mitragynine vs 7-Hydroxymitragynine deep dive.', url: 'articles/kratom-alkaloids.html', cat: 'Kratom' },
        { title: 'Traditional Kava Preparation', desc: 'From Pacific Island methods to modern extraction.', url: 'articles/traditional-kava-preparation.html', cat: 'Kava' }
    ];

    // Cultivation guides (the big collection)
    var CULTIVATION = [
        { title: 'Kava Cultivation', desc: 'Piper methysticum, kavalactone chemistry, tropical growing.', url: 'articles/kava-cultivation-guide.html', cat: 'Kava' },
        { title: 'Blue Lotus Cultivation', desc: 'Nymphaea caerulea aquatic growing and alkaloid chemistry.', url: 'articles/egyptian-blue-lotus-cultivation-guide.html', cat: 'Blue Lotus' },
        { title: 'Moringa Cultivation', desc: 'Moringa oleifera growing, propagation, and nutrition.', url: 'articles/moringa-cultivation-guide.html', cat: 'Guides' },
        { title: 'Elderberry Cultivation', desc: 'Sambucus growing, anthocyanin extraction, and processing.', url: 'articles/elderberry-cultivation-guide.html', cat: 'Guides' },
        { title: 'Dragon Fruit Cultivation', desc: 'Hylocereus species, climate needs, and betalain compounds.', url: 'articles/dragon-fruit-cultivation-guide.html', cat: 'Guides' },
        { title: 'Ginger Cultivation', desc: 'Zingiber officinale, rhizome propagation, gingerol extraction.', url: 'articles/ginger-cultivation-guide.html', cat: 'Guides' },
        { title: "Lion's Mane Mushroom", desc: 'Hericium erinaceus cultivation and neuroprotective compounds.', url: 'articles/lions-mane-cultivation-guide.html', cat: 'Guides' },
        { title: 'Passionflower Cultivation', desc: 'Passiflora edulis and incarnata growing and processing.', url: 'articles/passionflower-cultivation-guide.html', cat: 'Guides' },
        { title: 'Prickly Pear Cultivation', desc: 'Opuntia species, betalain compounds, and glochid handling.', url: 'articles/prickly-pear-cultivation-guide.html', cat: 'Texas Natives' },
        { title: 'Yaupon Holly Cultivation', desc: 'Ilex vomitoria, caffeine chemistry, and Native American heritage.', url: 'articles/yaupon-holly-cultivation-guide.html', cat: 'Texas Natives' }
    ];

    // Image showcase data (landscape/region images for articles)
    var SHOWCASE_SLIDES = [
        { title: 'Texas Hill Country', desc: 'Where ancient botanical wisdom meets modern extraction science', gradient: 'linear-gradient(135deg, #0f766e 0%, #0d9488 40%, #10b981 100%)' },
        { title: 'Southeast Asian Forests', desc: 'Traditional home of Mitragyna speciosa (kratom) for centuries', gradient: 'linear-gradient(135deg, #166534 0%, #15803d 40%, #22c55e 100%)' },
        { title: 'Pacific Island Kava Ceremonies', desc: 'Piper methysticum cultivated for thousands of years across Oceania', gradient: 'linear-gradient(135deg, #4338ca 0%, #6366f1 40%, #818cf8 100%)' },
        { title: 'The Nile Delta', desc: 'Sacred blue lotus (Nymphaea caerulea) flourished in ancient Egyptian culture', gradient: 'linear-gradient(135deg, #1e40af 0%, #2563eb 40%, #60a5fa 100%)' },
        { title: 'Andean Highlands', desc: 'Traditional cultivation of quinoa, San Pedro cactus, and sacred plants', gradient: 'linear-gradient(135deg, #92400e 0%, #b45309 40%, #f59e0b 100%)' }
    ];

    // ============================================
    // Initialize on DOM ready
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Determine which page we're on and inject appropriate carousels
        if (isPage('index.html') || currentPage === '') {
            buildHomepageCarousels();
        } else if (path.indexOf('/products/') !== -1) {
            buildProductPageCarousel();
        } else if (path.indexOf('/articles/') !== -1) {
            buildArticleCarousel();
        } else if (path.indexOf('/classroom/') !== -1 || isPage('classroom.html')) {
            buildClassroomCarousel();
        } else if (isPage('blog.html') || isPage('research.html') || isPage('classes.html')) {
            buildEducationCarousel();
        }
    }

    // ============================================
    // Homepage Carousels (Amazon-style sections)
    // ============================================
    function buildHomepageCarousels() {
        var footer = document.querySelector('.footer');
        var finalCta = document.querySelector('.final-cta');
        var insertBefore = finalCta || footer;
        if (!insertBefore) return;

        // 1. Image showcase carousel
        var showcase = buildShowcase(SHOWCASE_SLIDES, 'From the World to Texas', 'Origins of Our Botanicals');
        insertBefore.parentNode.insertBefore(showcase, insertBefore);

        // 2. Featured articles carousel
        var articlesSection = buildScrollCarousel({
            label: 'Latest Research',
            title: 'Featured Articles',
            titleLink: prefix + 'blog.html',
            viewAllLink: prefix + 'blog.html',
            viewAllText: 'View all articles',
            items: ARTICLES,
            cardType: 'article'
        });
        insertBefore.parentNode.insertBefore(articlesSection, insertBefore);

        // 3. Classroom preview carousel
        var classroomSection = buildScrollCarousel({
            label: 'Free Education',
            title: 'The Botanical Classroom',
            titleLink: prefix + 'classroom.html',
            viewAllLink: prefix + 'classroom.html',
            viewAllText: 'Enter the Classroom',
            items: CLASSROOM,
            cardType: 'classroom'
        });
        insertBefore.parentNode.insertBefore(classroomSection, insertBefore);

        // 4. Cultivation guides carousel
        var guidesSection = buildScrollCarousel({
            label: 'Grow Your Knowledge',
            title: 'Cultivation Guides',
            titleLink: prefix + 'blog.html',
            viewAllLink: prefix + 'blog.html',
            viewAllText: 'Browse all guides',
            items: CULTIVATION,
            cardType: 'article'
        });
        insertBefore.parentNode.insertBefore(guidesSection, insertBefore);
    }

    // ============================================
    // Product Page - Similar Products Carousel
    // ============================================
    function buildProductPageCarousel() {
        var ctaSection = document.querySelector('.product-cta-section');
        var footer = document.querySelector('.footer');
        var insertAfter = ctaSection || footer;
        if (!insertAfter) return;

        // Filter out current product
        var otherProducts = PRODUCTS.filter(function (p) {
            return p.url.split('/').pop() !== currentPage;
        });

        // Also include some related articles
        var relatedItems = otherProducts.concat(ARTICLES.slice(0, 4));

        var section = buildScrollCarousel({
            label: 'Explore More',
            title: 'You Might Also Like',
            viewAllLink: prefix + 'index.html#products',
            viewAllText: 'All products',
            items: relatedItems,
            cardType: 'mixed'
        });
        section.classList.add('related-carousel');

        // Insert after CTA section
        if (ctaSection && ctaSection.nextSibling) {
            ctaSection.parentNode.insertBefore(section, ctaSection.nextSibling);
        } else if (footer) {
            footer.parentNode.insertBefore(section, footer);
        }
    }

    // ============================================
    // Article Page - Related Content Carousel
    // ============================================
    function buildArticleCarousel() {
        var footer = document.querySelector('.footer');
        if (!footer) return;

        // Find related articles (same category or mixed)
        var related = ARTICLES.concat(CULTIVATION).filter(function (a) {
            return a.url.split('/').pop() !== currentPage;
        }).slice(0, 8);

        var section = buildScrollCarousel({
            label: 'Keep Reading',
            title: 'Related Articles',
            viewAllLink: prefix + 'blog.html',
            viewAllText: 'All articles',
            items: related,
            cardType: 'article'
        });
        section.classList.add('related-carousel');

        var main = document.querySelector('main') || document.querySelector('.article-content') || document.querySelector('.product-container');
        if (main) {
            main.appendChild(section);
        } else {
            footer.parentNode.insertBefore(section, footer);
        }
    }

    // ============================================
    // Classroom Page - Related Content Carousel
    // ============================================
    function buildClassroomCarousel() {
        var footer = document.querySelector('.footer');
        if (!footer) return;

        // Mix of products and articles
        var items = PRODUCTS.concat(ARTICLES.slice(0, 4));

        var section = buildScrollCarousel({
            label: 'Explore',
            title: 'Continue Your Journey',
            viewAllLink: prefix + 'blog.html',
            viewAllText: 'Browse articles',
            items: items,
            cardType: 'mixed'
        });
        section.classList.add('related-carousel');

        footer.parentNode.insertBefore(section, footer);
    }

    // ============================================
    // Education/Blog Page Carousel
    // ============================================
    function buildEducationCarousel() {
        var footer = document.querySelector('.footer');
        if (!footer) return;

        var items = PRODUCTS.concat(CLASSROOM);

        var section = buildScrollCarousel({
            label: 'Discover',
            title: 'Products & Classroom',
            viewAllLink: prefix + 'index.html#products',
            viewAllText: 'View products',
            items: items,
            cardType: 'mixed'
        });
        section.classList.add('related-carousel');

        footer.parentNode.insertBefore(section, footer);
    }

    // ============================================
    // Build horizontal scroll carousel
    // ============================================
    function buildScrollCarousel(opts) {
        var section = document.createElement('section');
        section.className = 'carousel-section';

        var titleHtml = opts.title;
        if (opts.titleLink) {
            titleHtml = '<a href="' + opts.titleLink + '">' + esc(opts.title) + '</a>';
        }

        // Header
        var header = document.createElement('div');
        header.className = 'carousel-header';
        header.innerHTML =
            '<div class="carousel-header-left">' +
                (opts.label ? '<span class="carousel-section-label">' + esc(opts.label) + '</span>' : '') +
                '<h3 class="carousel-section-title">' + titleHtml + '</h3>' +
            '</div>' +
            '<div class="carousel-nav">' +
                (opts.viewAllLink ? '<a href="' + opts.viewAllLink + '" class="carousel-nav-link">' + esc(opts.viewAllText || 'View all') + '</a>' : '') +
                '<button class="carousel-nav-btn carousel-prev" aria-label="Previous">' + ARROW_LEFT + '</button>' +
                '<button class="carousel-nav-btn carousel-next" aria-label="Next">' + ARROW_RIGHT + '</button>' +
            '</div>';
        section.appendChild(header);

        // Track wrapper
        var trackWrap = document.createElement('div');
        trackWrap.className = 'carousel-track-wrap';

        var track = document.createElement('div');
        track.className = 'carousel-track';

        // Build cards
        for (var i = 0; i < opts.items.length; i++) {
            var item = opts.items[i];
            track.appendChild(buildCard(item, opts.cardType));
        }

        trackWrap.appendChild(track);
        section.appendChild(trackWrap);

        // Wire up controls
        initScrollControls(section, track, trackWrap);

        return section;
    }

    // ============================================
    // Build individual card
    // ============================================
    function buildCard(item, type) {
        var card = document.createElement('a');
        card.href = prefix + item.url;
        card.className = 'carousel-card';

        if (type === 'product' || (type === 'mixed' && item.icon)) {
            card.classList.add('carousel-card--product');
        }

        var catColor = CAT_COLORS[item.cat] || '#6b7280';
        var iconHtml = '';

        if (item.icon && PRODUCT_ICONS[item.icon]) {
            iconHtml = PRODUCT_ICONS[item.icon];
        } else {
            iconHtml = PRODUCT_ICONS.leaf;
        }

        card.innerHTML =
            '<div class="carousel-card-visual">' +
                iconHtml +
                '<span class="carousel-card-badge" style="background:' + catColor + '">' + esc(item.cat) + '</span>' +
            '</div>' +
            '<div class="carousel-card-body">' +
                '<h4 class="carousel-card-title">' + esc(item.title) + '</h4>' +
                '<p class="carousel-card-desc">' + esc(item.desc) + '</p>' +
                '<span class="carousel-card-arrow">Read more ' + ARROW_SM + '</span>' +
            '</div>';

        return card;
    }

    // ============================================
    // Scroll controls (prev/next + fade indicators)
    // ============================================
    function initScrollControls(section, track, trackWrap) {
        var prevBtn = section.querySelector('.carousel-prev');
        var nextBtn = section.querySelector('.carousel-next');

        var scrollAmount = function () {
            var card = track.querySelector('.carousel-card');
            if (!card) return 300;
            return card.offsetWidth + 16; // card width + gap
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                track.scrollBy({ left: -scrollAmount() * 2, behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                track.scrollBy({ left: scrollAmount() * 2, behavior: 'smooth' });
            });
        }

        // Update fade indicators and button states
        function updateState() {
            var sl = track.scrollLeft;
            var maxScroll = track.scrollWidth - track.clientWidth;

            if (prevBtn) prevBtn.disabled = sl <= 2;
            if (nextBtn) nextBtn.disabled = sl >= maxScroll - 2;

            if (sl > 10) {
                trackWrap.classList.add('fade-left');
            } else {
                trackWrap.classList.remove('fade-left');
            }

            if (sl < maxScroll - 10) {
                trackWrap.classList.add('fade-right');
            } else {
                trackWrap.classList.remove('fade-right');
            }
        }

        track.addEventListener('scroll', throttle(updateState, 100), { passive: true });

        // Initial state check (defer so layout is complete)
        setTimeout(updateState, 100);
        // Also check on resize
        window.addEventListener('resize', throttle(updateState, 200));
    }

    // ============================================
    // Build image showcase carousel (Flowbite-style)
    // ============================================
    function buildShowcase(slides, label, title) {
        var section = document.createElement('section');
        section.className = 'carousel-section';

        // Header
        var header = document.createElement('div');
        header.className = 'carousel-header';
        header.innerHTML =
            '<div class="carousel-header-left">' +
                '<span class="carousel-section-label">' + esc(label) + '</span>' +
                '<h3 class="carousel-section-title">' + esc(title) + '</h3>' +
            '</div>';
        section.appendChild(header);

        // Showcase container
        var showcase = document.createElement('div');
        showcase.className = 'carousel-showcase';

        var trackEl = document.createElement('div');
        trackEl.className = 'carousel-showcase-track';

        for (var i = 0; i < slides.length; i++) {
            var slide = slides[i];
            var slideEl = document.createElement('div');
            slideEl.className = 'carousel-showcase-slide carousel-showcase-slide--gradient';
            slideEl.style.background = slide.gradient;
            slideEl.innerHTML =
                '<div class="carousel-showcase-slide-content">' +
                    '<h4 class="carousel-showcase-slide-title">' + esc(slide.title) + '</h4>' +
                    '<p class="carousel-showcase-slide-desc">' + esc(slide.desc) + '</p>' +
                '</div>';
            trackEl.appendChild(slideEl);
        }

        showcase.appendChild(trackEl);

        // Nav arrows
        var prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-showcase-prev';
        prevBtn.setAttribute('aria-label', 'Previous slide');
        prevBtn.innerHTML = ARROW_LEFT;
        showcase.appendChild(prevBtn);

        var nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-showcase-next';
        nextBtn.setAttribute('aria-label', 'Next slide');
        nextBtn.innerHTML = ARROW_RIGHT;
        showcase.appendChild(nextBtn);

        // Dots
        var dotsWrap = document.createElement('div');
        dotsWrap.className = 'carousel-showcase-dots';
        for (var d = 0; d < slides.length; d++) {
            var dot = document.createElement('button');
            dot.className = 'carousel-showcase-dot' + (d === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (d + 1));
            dot.dataset.index = d;
            dotsWrap.appendChild(dot);
        }
        showcase.appendChild(dotsWrap);

        section.appendChild(showcase);

        // Showcase logic
        initShowcase(showcase, slides.length);

        return section;
    }

    function initShowcase(container, totalSlides) {
        var track = container.querySelector('.carousel-showcase-track');
        var dots = container.querySelectorAll('.carousel-showcase-dot');
        var prevBtn = container.querySelector('.carousel-showcase-prev');
        var nextBtn = container.querySelector('.carousel-showcase-next');
        var currentSlide = 0;
        var autoplayTimer;

        function goTo(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            currentSlide = index;
            track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

            for (var i = 0; i < dots.length; i++) {
                dots[i].classList.toggle('active', i === currentSlide);
            }
        }

        prevBtn.addEventListener('click', function () {
            goTo(currentSlide - 1);
            resetAutoplay();
        });

        nextBtn.addEventListener('click', function () {
            goTo(currentSlide + 1);
            resetAutoplay();
        });

        for (var i = 0; i < dots.length; i++) {
            dots[i].addEventListener('click', function () {
                goTo(parseInt(this.dataset.index));
                resetAutoplay();
            });
        }

        // Touch/swipe support
        var startX = 0;
        var isDragging = false;

        container.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        container.addEventListener('touchend', function (e) {
            if (!isDragging) return;
            isDragging = false;
            var diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) goTo(currentSlide + 1);
                else goTo(currentSlide - 1);
                resetAutoplay();
            }
        }, { passive: true });

        // Autoplay
        function startAutoplay() {
            autoplayTimer = setInterval(function () {
                goTo(currentSlide + 1);
            }, 5000);
        }

        function resetAutoplay() {
            clearInterval(autoplayTimer);
            startAutoplay();
        }

        startAutoplay();

        // Pause on hover
        container.addEventListener('mouseenter', function () {
            clearInterval(autoplayTimer);
        });

        container.addEventListener('mouseleave', function () {
            startAutoplay();
        });
    }

    // ============================================
    // Utilities
    // ============================================
    function isPage(name) {
        return currentPage === name;
    }

    function esc(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function throttle(fn, limit) {
        var waiting = false;
        return function () {
            if (!waiting) {
                fn.apply(this, arguments);
                waiting = true;
                setTimeout(function () { waiting = false; }, limit);
            }
        };
    }

})();
