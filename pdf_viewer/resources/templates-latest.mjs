/**
 * @overview HTML templates of <i>ccmjs</i>-based web component for PDF viewer.
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @version latest (v3)
 */

import { html, render } from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';
export { render };

/**
 * HTML templates of <i>ccmjs</i>-based web component for PDF viewer.
 * @module HTMLTemplates
 */

/**
 * Returns the main HTML template.
 * @function
 * @param {object} app - App instance
 * @param {number} page_nr - Page number
 * @param {number} pages - Number of pages
 * @returns {TemplateResult} Main HTML template
 */
export function main( app, page_nr, pages ) {
  return html`
    <header></header>
    <main>
      <div id="page">
        <canvas></canvas>
        <div id="text-layer"></div>
        <div id="annotation-layer"></div>
      </div>
    </main>
    <footer>
      ${ controls( app, page_nr, pages ) }
      <nav id="extra">
        <a href="${ app.pdf }" download target="_blank" title="${ app.text.download || '' }" data-lang="download-title" ?data-hidden=${ !app.downloadable } @click=${ app.events.onDownload }>
          <i class="bi bi-cloud-download"></i>
        </a>
      </nav>
    </footer>
  `;
}

/**
 * Returns the HTML template for slide controls.
 * @function
 * @param {Object} app - App instance
 * @param {number} page_nr - Page number
 * @param {number} pages - Number of pages
 * @returns {TemplateResult} Main HTML template
 */
export function controls( app, page_nr, pages ) {
  return html`
    <nav id="controls" ?data-hidden=${ pages <= 1 }>
      <div id="first" title="${ app.text.first }" data-lang="first-title" @click=${ app.events.onFirst }>
        <i class="bi bi-skip-start" ?disabled=${ page_nr === 1 }></i>
      </div>
      <div id="prev" title="${ app.text.prev }" data-lang="prev-title" @click=${ app.events.onPrev }>
        <i class="bi bi-caret-left" ?disabled=${ page_nr === 1 }></i>
      </div>
      <div id="jump">
        <input type="text" size="${ pages.toString().length }" title="${ app.text.jump }" placeholder="${ page_nr } / ${ pages }" data-lang="jump-title" @change=${ app.events.onJump }>
      </div>
      <div id="next" title="${ app.text.next }" data-lang="next-title" @click=${ app.events.onNext }>
        <i class="bi bi-caret-right" ?disabled=${ page_nr === pages }></i>
      </div>
      <div id="last" title="${ app.text.last }" data-lang="last-title" @click=${ app.events.onLast }>
        <i class="bi bi-skip-end" ?disabled=${ page_nr === pages }></i>
      </div>
    </nav>
  `;
}