# Reusable Tech Setup for Bootstrap Marketing Sites

## Purpose

This document defines the preferred technical setup for visual, component-based marketing websites built with a lean front-end stack.

It is intended to be reused as a starting point for future projects with similar goals.

## Core Stack

- `HTML` for page templates and content structure
- `Bootstrap 5.3` as the primary CSS framework
- `Bootstrap JavaScript` as the default interaction layer
- `Sass` for Bootstrap variable overrides before compile
- `Minimal and intentional custom CSS` only when Bootstrap utilities or components cannot achieve the desired result

## Styling Rules

### Bootstrap-first approach

Use Bootstrap classes, utilities, grid, spacing, typography, and native components as the default solution.

Do not introduce custom styling when the same result can be achieved cleanly with Bootstrap.

### Sass theming

Project theming should be handled by overriding Bootstrap Sass variables before compilation.

Use Sass variable overrides for:

- brand colors
- typography defaults
- spacing values where needed
- component defaults
- border radius
- button styling
- form styling

Avoid relying on large post-compiled CSS overrides when the design can be handled through Bootstrap’s Sass configuration.

### Custom CSS policy

Custom CSS should be kept minimal and purposeful.

Allowed use cases include:

- branded hero treatments
- image overlays
- layout cases Bootstrap cannot express well
- minor visual refinements tied to the project’s identity

Custom CSS should not become a parallel design system.

## Component Reuse

### Partial-based structure

Reusable sections should be stored as HTML partials.

Typical reusable partials:

- header / navigation
- footer
- CTA bands
- vendor logo strips
- repeated card groups
- testimonial sections
- contact blocks

### Client-side template loading

Use a small JavaScript helper to load partials into any element with a `data-template` attribute.

Example:

```html
<div data-template="partials/header.html"></div>
```

The loader should:

1. find all elements with `data-template`
2. fetch the referenced partial file
3. replace the element with the fetched HTML

This keeps the project lightweight and avoids the need for a full templating engine.

### Local server requirement

Because partials are loaded with `fetch()`, the site should be run through a local server during development.

Do not rely on opening pages directly with `file://`.

## JavaScript Rules

### Preferred interaction stack

Use Bootstrap JavaScript components first whenever they fit the need.

Preferred Bootstrap components include:

- collapse
- dropdown
- modal
- tabs
- accordion
- carousel
- offcanvas

### Approved exceptions

The following libraries are acceptable when Bootstrap is not the best fit:

- `Swiper.js` for advanced carousels and sliders
- `Glightbox` for image galleries and lightbox behavior

Use these sparingly and only where they materially improve the experience.

Avoid unnecessary JavaScript dependencies.

## Image Handling

### Source

Stock imagery may be sourced from `magnific.com`.

### Asset workflow

Images should be downloaded, approved, optimized, and stored inside the project.

Do not hotlink stock imagery in production.

Recommended image workflow:

1. select stock imagery
2. download licensed assets
3. optimize file size
4. export appropriate dimensions
5. store using clear, consistent filenames
6. use responsive image patterns where helpful

### Visual direction support

Because these projects are visual-first, image quality and relevance are part of the implementation standard, not an afterthought.

## Architecture Principles

- Keep the stack simple
- Prefer convention over customization
- Build reusable sections early
- Keep page templates readable
- Let Bootstrap do most of the work
- Add custom CSS only when truly needed
- Keep JavaScript dependency count low
- Treat images as production assets

## Suggested Project Structure

```text
/
  index.html
  about.html
  contact.html
  partials/
    header.html
    footer.html
    cta-band.html
  assets/
    css/
      main.css
    js/
      template-loader.js
    images/
  scss/
    _variables.scss
    main.scss
```

## Implementation Notes

- Compile Bootstrap from Sass with project variable overrides
- Keep custom CSS centralized and small
- Use partials for repeated page sections
- Use a local server for development
- Prefer Bootstrap JS before adding other libraries
- Use Swiper.js and Glightbox only when Bootstrap does not provide a strong enough experience

## Default Build Standard

For similar future projects, the default standard should be:

1. Bootstrap-first UI
2. Sass-based theming
3. Partial-driven HTML reuse
4. Minimal custom CSS
5. Limited JS dependencies
6. Locally managed optimized image assets

This setup is intended to produce marketing websites that are maintainable, fast to build, visually polished, and easy to hand off.
