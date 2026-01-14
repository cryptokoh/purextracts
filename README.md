# Pure Extracts TX - Website Redesign

A professional, science-backed botanical wellness website with three distinct visual themes. Built with pure HTML, CSS, and JavaScript - no frameworks required.

## Themes

### 1. Clinical White
Clean, medical-grade aesthetic with subtle botanical accents. Features teal primary colors, crisp whites, and professional typography.

### 2. Earth Apothecary
Warm terracotta and sage tones with organic textures. Evokes traditional apothecary shops with cream backgrounds and earthy accents.

### 3. Modern Herbalist
Dark mode with vibrant green accents. Contemporary, scientific feel with glowing effects and high-contrast design.

## Features

- **Theme Switcher**: Real-time theme switching with localStorage persistence
- **Responsive Design**: Mobile-first approach, works on all devices
- **Smooth Animations**: Scroll-triggered reveals, hover effects, and micro-interactions
- **Accessibility**: Keyboard navigation, semantic HTML, proper ARIA attributes
- **Performance**: No external dependencies, minimal CSS/JS, fast loading

## Content Sections

- Hero with company mission and statistics
- Trust badges (Quality, Science-backed, Sustainable, Free Shipping)
- About section with company story
- Research articles (11+ ingredient guides)
- Products preview (Coming Soon)
- Professional services (Greenhouse, Extraction, Repair, Bulk)
- Contact form
- Footer with navigation

## Quick Start

```bash
# Clone the repo
git clone https://github.com/cryptokoh/purextracts.git

# Open in browser
cd purextracts
python -m http.server 8000
# or just open index.html directly
```

## File Structure

```
purextracts/
├── index.html    # Main HTML structure
├── styles.css    # All 3 themes + responsive styles
├── script.js     # Theme switcher & interactions
└── README.md     # This file
```

## Customization

### Adding a New Theme

1. Add theme variables in `styles.css` under a new `[data-theme="yourtheme"]` block
2. Add a preview button in the HTML theme switcher
3. Add the preview gradient class in CSS

### Modifying Colors

All colors are CSS custom properties. Edit the theme variables to change:
- `--color-primary`: Main brand color
- `--color-bg`: Background color
- `--color-text`: Primary text color
- `--color-surface`: Card/container background

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Credits

Original content from [pureextractstx.com](https://pureextractstx.com)
Redesigned with love for botanical wellness.

## License

MIT License - Feel free to use and modify for your projects.
