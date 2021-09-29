/**
 * @overview HTML templates of ccmjs-based web component for slidecast with commentary
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render } from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Object} instance - ccmjs-based instance for slidecast with commentary
 * @param {number} [slide_nr = 1] - slide number
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} main HTML template
 */
export function main( instance, slide_nr, events ) {

  /**
   * slide data
   * @type {Object}
   */
  const slide_data = instance.ignore.slides[ slide_nr - 1 ];

  return html`
    <main>
      <div>
        <section id="viewer"></section>
        <section id="control">
          <div title="${ instance.text.description }" ?data-hidden=${ !instance.description }>
            <i class="bi bi-sticky${ instance.open === 'description' ? '-fill' : '' }" ?disabled=${ !slide_data.description } @click=${ events.onDescription }></i>
          </div>
          <audio src="${ slide_data.audio || '' }" controls ?data-invisible=${ !slide_data.audio }></audio>
          <div title="${ instance.text.comments }" ?data-hidden=${ !instance.comment }>
            <i class="bi bi-chat-square-text${ instance.open === 'comments' ? '-fill' : '' }" ?disabled=${ slide_data.commentary === false } @click=${ events.onComments }></i>
          </div>
        </section>
        <section id="description" ?data-hidden=${ !instance.description || !slide_data.description || instance.open !== 'description' }></section>
        <section id="comments" ?data-hidden=${ !instance.comment || slide_data.commentary === false || instance.open !== 'comments' }></section>
      </div>
    </main>
  `;
}

/**
 * returns the HTML template for an image
 * @type {string}
 */
export const image = '<img src="%%">';

/**
 * returns the HTML template for an video
 * @type {string}
 */
export const video = '<video src="%%" controls>';