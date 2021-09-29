/**
 * @overview HTML templates of ccmjs-based web component for PDF viewer
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render } from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Object} instance - ccmjs-based instance for PDF viewer
 * @param {Object.<string,Function>} events - contains all event handlers
 * @param {number} page_nr - page number
 * @param {number} pages - number of pages
 * @returns {TemplateResult} main HTML template
 */
export function main( instance, events, page_nr, pages ) {
  return html`
    <main>
      <div id="page">
        <canvas></canvas>
      </div>
      <div>
        <nav id="controls" ?data-hidden=${ pages <= 1 }>
          <div id="first" title="${ instance.text.first }" @click=${ events.onFirst }>
            <i class="bi bi-skip-start" ?disabled=${ page_nr === 1 }></i>
          </div>
          <div id="prev" title="${ instance.text.prev }" @click=${ events.onPrev }>
            <i class="bi bi-caret-left" ?disabled=${ page_nr === 1 }></i>
          </div>
          <div id="jump">
            <input type="text" size="${ pages.toString().length }" title="${ instance.text.jump }" placeholder="${ page_nr } / ${ pages }" @change=${ events.onJump }>
          </div>
          <div id="next" title="${ instance.text.next }" @click=${ events.onNext }>
            <i class="bi bi-caret-right" ?disabled=${ page_nr === pages }></i>
          </div>
          <div id="last" title="${ instance.text.last }" @click=${ events.onLast }>
            <i class="bi bi-skip-end" ?disabled=${ page_nr === pages }></i>
          </div>
        </nav>
        <nav id="extra">
          <a href="${ instance.pdf }" download target="_blank" title="${ instance.text.download }" ?data-hidden=${ !instance.downloadable }>
            <i class="bi bi-cloud-download"></i>
          </a>
        </nav>
      </div>
    </main>
  `;
}