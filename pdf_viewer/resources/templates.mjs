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
      <canvas></canvas>
      <div>
        <nav id="controls" ?data-hidden=${ pages <= 1 }>
          <div title="${ instance.text.first }" @click=${ events.onFirst }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" ?data-disabled=${ page_nr === 1 }>
              <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4zm7.5.633L5.696 8l5.804 3.367V4.633z"/>
            </svg>
          </div>
          <div title="${ instance.text.prev }" @click=${ events.onPrev }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" ?data-disabled=${ page_nr === 1 }>
              <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
            </svg>
          </div>
          <div>
            <input type="text" size="${ pages.toString().length }" title="${ instance.text.jump }" placeholder="${ page_nr } / ${ pages }" @change=${ events.onJump }>
          </div>
          <div title="${ instance.text.next }" @click=${ events.onNext }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" ?data-disabled=${ page_nr === pages }>
              <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
            </svg>
          </div>
          <div title="${ instance.text.last }" @click=${ events.onLast }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" ?data-disabled=${ page_nr === pages }>
              <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4zM5 4.633 10.804 8 5 11.367V4.633z"/>
            </svg>
          </div>
        </nav>
        <nav id="extra">
          <a href="${ instance.pdf }" download target="_blank" title="${ instance.text.download }" ?data-hidden=${ !instance.downloadable }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
              <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
            </svg>
          </a>
        </nav>
      </div>
    </main>
  `;
}